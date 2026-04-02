import type { JSONSchema, TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    AST_NODE_TYPES,
    AST_TOKEN_TYPES,
    ESLintUtils,
} from "@typescript-eslint/utils";

/** Supported declaration kinds enforced by require/required-tag rules. */
type EntityKind =
    | "class"
    | "enum"
    | "function"
    | "interface"
    | "namespace"
    | "object"
    | "type"
    | "variable";

/** Export targeting modes supported by shared require-tag rules. */
type ExportMode = "all" | "exported" | "non-exported";

/** Extra docs metadata shape used by this plugin's RuleCreator. */
type RuleDocs = {
    recommended: boolean;
};

/** Rule context type alias shared by generated required-tag rules. */
type TagRuleContext = Readonly<
    TSESLint.RuleContext<TagRuleMessageIds, TagRuleOptions>
>;

/** Rule module type alias shared by generated required-tag rules. */
type TagRuleModule = ESLintUtils.RuleModule<
    TagRuleMessageIds,
    TagRuleOptions,
    RuleDocs
>;

/** RuleCreator instance for all required-tag rules in this plugin. */
const createTagRule: ReturnType<typeof ESLintUtils.RuleCreator<RuleDocs>> =
    ESLintUtils.RuleCreator<RuleDocs>(
        (ruleName) =>
            `https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/required-tags.md#${ruleName}`
    );

/** Shared options supported by required-tag rules. */
type RuleOption = {
    enforceFor?: readonly EntityKind[];
    exportMode?: ExportMode;
    includeNonExported?: boolean;
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

/** Metadata describing an individual required-tag rule. */
type TagRuleDefinition = {
    readonly ruleName: string;
    readonly tagName: `@${string}`;
};

/** Message id union used by generated required-tag rules. */
type TagRuleMessageIds = "missingTag";

/** RuleTester-compatible options tuple for required-tag rules. */
type TagRuleOptions = [RuleOption];

type Target = {
    commentNode: TSESTree.Node;
    kind: EntityKind;
    name: string | undefined;
    reportNode: TSESTree.Node;
};

/** Entity kinds that can be checked by this rule family. */
const enforceableEntityKinds: readonly EntityKind[] = [
    "class",
    "enum",
    "function",
    "interface",
    "namespace",
    "object",
    "type",
    "variable",
];

const defaultEnforceFor: readonly EntityKind[] = [...enforceableEntityKinds];

/** Default option tuple for required-tag rules. */
const defaultRuleOptions: TagRuleOptions = [
    {
        enforceFor: defaultEnforceFor,
        exportMode: "exported",
    },
];

/** JSON schema describing shared required-tag rule options. */
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

const isWordCharacter = (character: string | undefined): boolean => {
    if (character === undefined) {
        return false;
    }

    return /\w/u.test(character);
};

const hasRequiredTag = (
    commentText: string,
    tagName: `@${string}`
): boolean => {
    let searchStartIndex = 0;
    while (searchStartIndex < commentText.length) {
        const tagIndex = commentText.indexOf(tagName, searchStartIndex);
        if (tagIndex === -1) {
            return false;
        }

        const beforeCharacter =
            tagIndex > 0 ? commentText[tagIndex - 1] : undefined;
        const afterCharacter = commentText[tagIndex + tagName.length];
        const hasBoundaryBefore = !isWordCharacter(beforeCharacter);
        const hasBoundaryAfter = !isWordCharacter(afterCharacter);

        if (hasBoundaryBefore && hasBoundaryAfter) {
            return true;
        }

        searchStartIndex = tagIndex + tagName.length;
    }

    return false;
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

/**
 * Builds the listener implementation for a specific required-tag rule.
 *
 * @param context - Rule execution context.
 * @param requiredTag - TSDoc tag that must exist on matching declarations.
 *
 * @returns Rule listener object for ESLint traversal.
 */
const createRequireTagRuleListener = (
    context: Readonly<TSESLint.RuleContext<TagRuleMessageIds, TagRuleOptions>>,
    requiredTag: `@${string}`
): TSESLint.RuleListener => {
    const declarationsByName = new Map<string, Target>();
    const checkedTargets = new Set<string>();
    const sourceCode = context.sourceCode;
    const ruleOption = context.options.at(0);
    const enabledKinds = new Set<EntityKind>(
        ruleOption?.enforceFor ?? defaultEnforceFor
    );
    const exportMode = resolveExportMode(ruleOption);

    const checkTarget = (target: Readonly<Target>): void => {
        if (!enabledKinds.has(target.kind)) {
            return;
        }

        const targetKey = createTargetKey(target);
        if (checkedTargets.has(targetKey)) {
            return;
        }

        checkedTargets.add(targetKey);

        const commentNode = getTSDocCommentNode(sourceCode, target.commentNode);
        if (commentNode === null) {
            return;
        }

        if (hasRequiredTag(commentNode.value, requiredTag)) {
            return;
        }

        context.report({
            data: {
                entityKind: target.kind,
                entityName: getEntityDisplayName(target.name),
                tagName: requiredTag,
            },
            messageId: "missingTag",
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
                if (
                    shouldCheckNonExportedDeclarations(exportMode) &&
                    isSupportedDeclaration(statement)
                ) {
                    for (const target of declarationTargetsWithCommentNode(
                        statement,
                        statement
                    )) {
                        checkTarget(target);
                    }
                }

                if (
                    shouldCheckExportedDeclarations(exportMode) &&
                    isSupportedDeclaration(statement)
                ) {
                    trackDeclarationTargets(statement);
                    continue;
                }

                if (
                    shouldCheckExportedDeclarations(exportMode) &&
                    statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
                    statement.declaration !== null &&
                    isSupportedDeclaration(statement.declaration)
                ) {
                    trackDeclarationTargets(statement.declaration);
                }
            }
        },
    };
};

export type {
    EntityKind,
    ExportMode,
    RuleDocs,
    RuleOption,
    TagRuleContext,
    TagRuleDefinition,
    TagRuleMessageIds,
    TagRuleModule,
    TagRuleOptions,
};
export {
    createRequireTagRuleListener,
    createTagRule,
    defaultRuleOptions,
    enforceableEntityKinds,
    optionSchema,
};
