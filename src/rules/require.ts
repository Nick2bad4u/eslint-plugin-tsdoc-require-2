import type { JSONSchema, TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    AST_NODE_TYPES,
    AST_TOKEN_TYPES,
    ESLintUtils,
} from "@typescript-eslint/utils";

type EntityKind =
    | "class"
    | "enum"
    | "function"
    | "interface"
    | "object"
    | "type"
    | "variable";
type MessageIds = "missingTSDoc";

type Options = [RuleOption];

type RuleDocs = {
    recommended: boolean;
};

type RuleOption = {
    enforceFor?: readonly EntityKind[];
    includeNonExported?: boolean;
};

type SupportedDeclaration =
    | TSESTree.ClassDeclaration
    | TSESTree.FunctionDeclaration
    | TSESTree.TSDeclareFunction
    | TSESTree.TSEnumDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSTypeAliasDeclaration
    | TSESTree.VariableDeclaration;

type SupportedDefaultExportExpression =
    | TSESTree.ArrowFunctionExpression
    | TSESTree.ClassExpression
    | TSESTree.FunctionExpression
    | TSESTree.ObjectExpression;

type Target = {
    commentNode: TSESTree.Node;
    kind: EntityKind;
    name: string | undefined;
    reportNode: TSESTree.Node;
};

const enforceableEntityKinds = [
    "class",
    "enum",
    "function",
    "interface",
    "object",
    "type",
    "variable",
] as const satisfies readonly EntityKind[];

const defaultEnforceFor: readonly EntityKind[] = [...enforceableEntityKinds];

const defaultRuleOptions: Options = [
    {
        enforceFor: defaultEnforceFor,
        includeNonExported: false,
    },
];

const optionSchema: JSONSchema.JSONSchema4 = {
    additionalProperties: false,
    properties: {
        enforceFor: {
            items: {
                enum: [...enforceableEntityKinds],
                type: "string",
            },
            type: "array",
            uniqueItems: true,
        },
        includeNonExported: {
            default: false,
            description: "Also enforce on non-exported declarations (opt-in).",
            type: "boolean",
        },
    },
    type: "object",
};

const assertUnreachable = (value: never): never => {
    throw new Error(`Unexpected node type: ${String(value)}`);
};

// eslint-disable-next-line total-functions/no-hidden-type-assertions -- RuleCreator generic is required so `meta.docs.recommended` is strongly typed and accepted in the inline metadata literal.
const createRule = ESLintUtils.RuleCreator<RuleDocs>(
    (ruleName) =>
        `https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/${ruleName}.md`
);

const isSupportedDeclaration = (
    node: Readonly<TSESTree.Node>
): node is SupportedDeclaration =>
    node.type === AST_NODE_TYPES.ClassDeclaration ||
    node.type === AST_NODE_TYPES.FunctionDeclaration ||
    node.type === AST_NODE_TYPES.TSDeclareFunction ||
    node.type === AST_NODE_TYPES.TSEnumDeclaration ||
    node.type === AST_NODE_TYPES.TSInterfaceDeclaration ||
    node.type === AST_NODE_TYPES.TSTypeAliasDeclaration ||
    node.type === AST_NODE_TYPES.VariableDeclaration;

const isSupportedDefaultExportExpression = (
    node: Readonly<TSESTree.Node>
): node is SupportedDefaultExportExpression =>
    node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
    node.type === AST_NODE_TYPES.ClassExpression ||
    node.type === AST_NODE_TYPES.FunctionExpression ||
    node.type === AST_NODE_TYPES.ObjectExpression;

const getExpressionKind = (
    node: Readonly<SupportedDefaultExportExpression>
): EntityKind => {
    if (
        node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
        node.type === AST_NODE_TYPES.FunctionExpression
    ) {
        return "function";
    }

    if (node.type === AST_NODE_TYPES.ClassExpression) {
        return "class";
    }

    if (node.type === AST_NODE_TYPES.ObjectExpression) {
        return "object";
    }

    return assertUnreachable(node);
};

const getEntityDisplayName = (name: string | undefined): string =>
    name ?? "<default export>";

const hasTSDocComment = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.Node>
): boolean => {
    const comments = sourceCode.getCommentsBefore(node);
    const nearestComment = comments.at(-1);

    if (nearestComment === undefined) {
        return false;
    }

    if (nearestComment.type !== AST_TOKEN_TYPES.Block) {
        return false;
    }

    if (!nearestComment.value.startsWith("*")) {
        return false;
    }

    const nearestCommentLoc = nearestComment.loc;
    const nodeLoc = node.loc;
    if (nearestCommentLoc === null || nodeLoc === null) {
        return false;
    }

    const lineGap = nodeLoc.start.line - nearestCommentLoc.end.line;
    return lineGap >= 0 && lineGap <= 1;
};

const createTargetKey = (target: Readonly<Target>): string => {
    const [start, end] = target.reportNode.range;
    return `${start}:${end}:${target.kind}:${target.name ?? ""}`;
};

const declarationTargets = (
    declaration: Readonly<SupportedDeclaration>
): Target[] => {
    if (declaration.type === AST_NODE_TYPES.ClassDeclaration) {
        return [
            {
                commentNode: declaration,
                kind: "class",
                name: declaration.id?.name,
                reportNode: declaration,
            },
        ];
    }

    if (
        declaration.type === AST_NODE_TYPES.FunctionDeclaration ||
        declaration.type === AST_NODE_TYPES.TSDeclareFunction
    ) {
        return [
            {
                commentNode: declaration,
                kind: "function",
                name: declaration.id?.name,
                reportNode: declaration,
            },
        ];
    }

    if (declaration.type === AST_NODE_TYPES.TSEnumDeclaration) {
        return [
            {
                commentNode: declaration,
                kind: "enum",
                name: declaration.id.name,
                reportNode: declaration,
            },
        ];
    }

    if (declaration.type === AST_NODE_TYPES.TSInterfaceDeclaration) {
        return [
            {
                commentNode: declaration,
                kind: "interface",
                name: declaration.id.name,
                reportNode: declaration,
            },
        ];
    }

    if (declaration.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
        return [
            {
                commentNode: declaration,
                kind: "type",
                name: declaration.id.name,
                reportNode: declaration,
            },
        ];
    }

    if (declaration.type === AST_NODE_TYPES.VariableDeclaration) {
        return declaration.declarations.flatMap((declarator) => {
            if (declarator.id.type !== AST_NODE_TYPES.Identifier) {
                return [];
            }

            return [
                {
                    commentNode: declaration,
                    kind: "variable" as const,
                    name: declarator.id.name,
                    reportNode: declarator,
                },
            ];
        });
    }

    return assertUnreachable(declaration);
};

const declarationTargetsWithCommentNode = (
    declaration: Readonly<SupportedDeclaration>,
    commentNode: Readonly<TSESTree.Node>
): Target[] =>
    declarationTargets(declaration).map((target) => ({
        ...target,
        commentNode,
    }));

const requireRule: TSESLint.RuleModule<MessageIds, Options> = createRule<
    Options,
    MessageIds
>({
    create(context) {
        const declarationsByName = new Map<string, Target>();
        const checkedTargets = new Set<string>();
        const sourceCode = context.sourceCode;
        const ruleOption = context.options.at(0);
        const enabledKinds = new Set<EntityKind>(
            ruleOption?.enforceFor ?? defaultEnforceFor
        );
        const includeNonExported = ruleOption?.includeNonExported ?? false;

        const checkTarget = (target: Readonly<Target>): void => {
            if (!enabledKinds.has(target.kind)) {
                return;
            }

            const targetKey = createTargetKey(target);
            if (checkedTargets.has(targetKey)) {
                return;
            }

            checkedTargets.add(targetKey);

            if (hasTSDocComment(sourceCode, target.commentNode)) {
                return;
            }

            context.report({
                data: {
                    entityKind: target.kind,
                    entityName: getEntityDisplayName(target.name),
                },
                messageId: "missingTSDoc",
                node: target.reportNode,
            });
        };

        const checkDeclarationWithExportComment = (
            declaration: Readonly<SupportedDeclaration>,
            exportNode:
                | Readonly<TSESTree.ExportDefaultDeclaration>
                | Readonly<TSESTree.ExportNamedDeclaration>
        ): void => {
            for (const target of declarationTargetsWithCommentNode(
                declaration,
                exportNode
            )) {
                checkTarget(target);
            }
        };

        const trackDeclarationTargets = (
            declaration: Readonly<SupportedDeclaration>
        ): void => {
            for (const target of declarationTargets(declaration)) {
                if (target.name === undefined) {
                    continue;
                }

                declarationsByName.set(target.name, target);
            }
        };

        const checkIdentifierExport = (
            identifier: Readonly<TSESTree.Identifier>
        ): void => {
            const target = declarationsByName.get(identifier.name);
            if (target !== undefined) {
                checkTarget(target);
            }
        };

        return {
            ExportDefaultDeclaration(
                exportNode: Readonly<TSESTree.ExportDefaultDeclaration>
            ): void {
                const { declaration } = exportNode;

                if (declaration.type === AST_NODE_TYPES.Identifier) {
                    checkIdentifierExport(declaration);
                    return;
                }

                if (isSupportedDeclaration(declaration)) {
                    checkDeclarationWithExportComment(declaration, exportNode);
                    return;
                }

                if (isSupportedDefaultExportExpression(declaration)) {
                    checkTarget({
                        commentNode: exportNode,
                        kind: getExpressionKind(declaration),
                        name: undefined,
                        reportNode: declaration,
                    });
                }
            },
            ExportNamedDeclaration(
                exportNode: Readonly<TSESTree.ExportNamedDeclaration>
            ): void {
                if (
                    exportNode.declaration !== null &&
                    isSupportedDeclaration(exportNode.declaration)
                ) {
                    checkDeclarationWithExportComment(
                        exportNode.declaration,
                        exportNode
                    );
                }

                if (exportNode.source !== null) {
                    return;
                }

                for (const specifier of exportNode.specifiers) {
                    if (specifier.type !== AST_NODE_TYPES.ExportSpecifier) {
                        continue;
                    }

                    checkIdentifierExport(specifier.local);
                }
            },
            Program(programNode: Readonly<TSESTree.Program>): void {
                declarationsByName.clear();
                checkedTargets.clear();

                for (const statement of programNode.body) {
                    if (isSupportedDeclaration(statement)) {
                        if (includeNonExported) {
                            for (const target of declarationTargetsWithCommentNode(
                                statement,
                                statement
                            )) {
                                checkTarget(target);
                            }
                        }

                        trackDeclarationTargets(statement);
                        continue;
                    }

                    if (
                        statement.type ===
                            AST_NODE_TYPES.ExportNamedDeclaration &&
                        statement.declaration !== null &&
                        isSupportedDeclaration(statement.declaration)
                    ) {
                        trackDeclarationTargets(statement.declaration);
                    }
                }
            },
        };
    },
    defaultOptions: defaultRuleOptions,
    meta: {
        defaultOptions: [
            {
                enforceFor: [...enforceableEntityKinds],
                includeNonExported: false,
            },
        ],
        deprecated: false,
        docs: {
            description:
                "require TSDoc comments for exported TypeScript declarations and default exports, with opt-in non-exported support.",
            frozen: false,
            recommended: true,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/require.md",
        },
        messages: {
            missingTSDoc: "Missing TSDoc for {{entityKind}} {{entityName}}.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "require",
});

export default requireRule;
