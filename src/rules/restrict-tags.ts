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
    | "namespace"
    | "object"
    | "type"
    | "variable";
type ExportMode = "all" | "exported" | "non-exported";
type MessageIds = "disallowedTag" | "tagNotAllowed";

type Options = [RuleOption];
type RestrictMode = "allow" | "deny";

type RuleDocs = {
    recommended: boolean;
};

type RuleOption = {
    enforceFor?: readonly EntityKind[];
    exportMode?: ExportMode;
    includeNonExported?: boolean;
    mode?: RestrictMode;
    tags?: readonly `@${string}`[];
};

type SupportedDeclaration =
    | TSESTree.ClassDeclaration
    | TSESTree.FunctionDeclaration
    | TSESTree.TSDeclareFunction
    | TSESTree.TSEnumDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSModuleDeclaration
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
    "namespace",
    "object",
    "type",
    "variable",
] as const satisfies readonly EntityKind[];

const defaultRestrictedTags = [
    "@augments",
    "@callback",
    "@extends",
    "@jsx",
    "@satisfies",
    "@type",
    "@typedef",
    "@yields",
] as const;

const defaultEnforceFor: readonly EntityKind[] = [...enforceableEntityKinds];

const defaultRuleOptions: Options = [
    {
        enforceFor: defaultEnforceFor,
        exportMode: "exported",
        mode: "deny",
        tags: defaultRestrictedTags,
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
        exportMode: {
            description:
                "Choose whether to check exported declarations, non-exported top-level declarations, or both.",
            enum: [
                "all",
                "exported",
                "non-exported",
            ],
            type: "string",
        },
        includeNonExported: {
            default: false,
            description:
                'Legacy alias for exportMode: "all". Also enforce on non-exported declarations when true.',
            type: "boolean",
        },
        mode: {
            default: "deny",
            description:
                "Tag restriction mode. deny = listed tags are disallowed. allow = only listed tags are permitted.",
            enum: ["allow", "deny"],
            type: "string",
        },
        tags: {
            description: "Tag names used by the selected restriction mode.",
            items: {
                pattern: "^@[A-Za-z][A-Za-z0-9-]*$",
                type: "string",
            },
            type: "array",
            uniqueItems: true,
        },
    },
    type: "object",
};

const resolveExportMode = (
    ruleOption: Readonly<RuleOption> | undefined
): ExportMode => {
    if (ruleOption?.includeNonExported === true) {
        return "all";
    }

    return ruleOption?.exportMode ?? "exported";
};

const shouldCheckExportedDeclarations = (exportMode: ExportMode): boolean =>
    exportMode === "all" || exportMode === "exported";

const shouldCheckNonExportedDeclarations = (exportMode: ExportMode): boolean =>
    exportMode === "all" || exportMode === "non-exported";

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
    node.type === AST_NODE_TYPES.TSModuleDeclaration ||
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

const isTopLevelNode = (node: Readonly<TSESTree.Node>): boolean =>
    node.parent?.type === AST_NODE_TYPES.Program;

const getModuleDeclarationName = (
    declaration: Readonly<TSESTree.TSModuleDeclaration>
): string | undefined => {
    if (declaration.id.type === AST_NODE_TYPES.Identifier) {
        return declaration.id.name;
    }

    if (
        declaration.id.type === AST_NODE_TYPES.Literal &&
        typeof declaration.id.value === "string"
    ) {
        return declaration.id.value;
    }

    return undefined;
};

const getTSDocCommentNode = (
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.Node>
): null | TSESTree.Comment => {
    const comments = sourceCode.getCommentsBefore(node);
    const nearestComment = comments.at(-1);

    if (nearestComment === undefined) {
        return null;
    }

    if (nearestComment.type !== AST_TOKEN_TYPES.Block) {
        return null;
    }

    if (!nearestComment.value.startsWith("*")) {
        return null;
    }

    const nearestCommentLoc = nearestComment.loc;
    const nodeLoc = node.loc;
    if (nearestCommentLoc === null || nodeLoc === null) {
        return null;
    }

    const lineGap = nodeLoc.start.line - nearestCommentLoc.end.line;
    if (lineGap < 0 || lineGap > 1) {
        return null;
    }

    return nearestComment;
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

    if (declaration.type === AST_NODE_TYPES.TSModuleDeclaration) {
        return [
            {
                commentNode: declaration,
                kind: "namespace",
                name: getModuleDeclarationName(declaration),
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

const extractTagNames = (commentText: string): ReadonlySet<`@${string}`> => {
    const tagPattern = /(?:^|\W)@(?<tagName>[A-Za-z][-0-9A-Za-z]*)/gu;
    const extractedTagNames = new Set<`@${string}`>();

    for (const match of commentText.matchAll(tagPattern)) {
        const rawTagName = match.groups?.["tagName"];
        if (rawTagName === undefined) {
            continue;
        }

        extractedTagNames.add(`@${rawTagName}`);
    }

    return extractedTagNames;
};

const getConfiguredTagSet = (
    ruleOption: Readonly<RuleOption> | undefined
): ReadonlySet<`@${string}`> => {
    const configuredTags = ruleOption?.tags ?? defaultRestrictedTags;
    return new Set(configuredTags);
};

/** ESLint rule module implementing tsdoc-require-2/restrict-tags. */
const restrictTagsRule: TSESLint.RuleModule<MessageIds, Options> = createRule<
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
        const exportMode = resolveExportMode(ruleOption);
        const restrictMode = ruleOption?.mode ?? "deny";
        const configuredTagSet = getConfiguredTagSet(ruleOption);
        const allowedTags = [...configuredTagSet];

        const checkTarget = (target: Readonly<Target>): void => {
            if (!enabledKinds.has(target.kind)) {
                return;
            }

            const targetKey = createTargetKey(target);
            if (checkedTargets.has(targetKey)) {
                return;
            }

            checkedTargets.add(targetKey);

            const commentNode = getTSDocCommentNode(
                sourceCode,
                target.commentNode
            );
            if (commentNode === null) {
                return;
            }

            if (configuredTagSet.size === 0) {
                return;
            }

            const foundTags = extractTagNames(commentNode.value);
            for (const tagName of foundTags) {
                const isConfiguredTag = configuredTagSet.has(tagName);

                if (restrictMode === "deny" && isConfiguredTag) {
                    context.report({
                        data: {
                            entityKind: target.kind,
                            entityName: getEntityDisplayName(target.name),
                            tagName,
                        },
                        messageId: "disallowedTag",
                        node: target.reportNode,
                    });
                    continue;
                }

                if (restrictMode === "allow" && !isConfiguredTag) {
                    context.report({
                        data: {
                            allowedTags:
                                allowedTags.length === 0
                                    ? "<none>"
                                    : allowedTags.join(", "),
                            entityKind: target.kind,
                            entityName: getEntityDisplayName(target.name),
                            tagName,
                        },
                        messageId: "tagNotAllowed",
                        node: target.reportNode,
                    });
                }
            }
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
                if (
                    !shouldCheckExportedDeclarations(exportMode) ||
                    !isTopLevelNode(exportNode)
                ) {
                    return;
                }

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
                    !shouldCheckExportedDeclarations(exportMode) ||
                    !isTopLevelNode(exportNode)
                ) {
                    return;
                }

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
                        if (shouldCheckNonExportedDeclarations(exportMode)) {
                            for (const target of declarationTargetsWithCommentNode(
                                statement,
                                statement
                            )) {
                                checkTarget(target);
                            }
                        }

                        if (shouldCheckExportedDeclarations(exportMode)) {
                            trackDeclarationTargets(statement);
                        }
                        continue;
                    }

                    if (
                        shouldCheckExportedDeclarations(exportMode) &&
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
                exportMode: "exported",
                mode: "deny",
                tags: [...defaultRestrictedTags],
            },
        ],
        deprecated: false,
        docs: {
            description:
                "disallow or allow only specific TSDoc/JSDoc tags in TSDoc blocks using configurable declaration scope.",
            frozen: false,
            recommended: false,
            url: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/restrict-tags.md",
        },
        messages: {
            disallowedTag:
                "TSDoc for {{entityKind}} {{entityName}} contains disallowed tag {{tagName}}.",
            tagNotAllowed:
                "TSDoc for {{entityKind}} {{entityName}} contains tag {{tagName}}, which is not in the allowed set: {{allowedTags}}.",
        },
        schema: [optionSchema],
        type: "problem",
    },
    name: "restrict-tags",
});

export default restrictTagsRule;
