import { getJSDocComment } from "@es-joy/jsdoccomment";
import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { SourceCode } from "eslint";

type Options = [];
type MessageIds = "missingTSDoc";

type EntityKind =
  | "class"
  | "enum"
  | "function"
  | "interface"
  | "object"
  | "type"
  | "variable";

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
  name?: string;
  reportNode: TSESTree.Node;
};

const createRule = ESLintUtils.RuleCreator(
  (ruleName) =>
    `https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/docs/rules/${ruleName}.md`,
);

const isSupportedDeclaration = (
  node: TSESTree.Node,
): node is SupportedDeclaration => {
  switch (node.type) {
    case AST_NODE_TYPES.ClassDeclaration:
    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
    case AST_NODE_TYPES.TSEnumDeclaration:
    case AST_NODE_TYPES.TSInterfaceDeclaration:
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
    case AST_NODE_TYPES.VariableDeclaration:
      return true;
    default:
      return false;
  }
};

const isSupportedDefaultExportExpression = (
  node: TSESTree.Expression,
): node is SupportedDefaultExportExpression => {
  switch (node.type) {
    case AST_NODE_TYPES.ArrowFunctionExpression:
    case AST_NODE_TYPES.ClassExpression:
    case AST_NODE_TYPES.FunctionExpression:
    case AST_NODE_TYPES.ObjectExpression:
      return true;
    default:
      return false;
  }
};

const getExpressionKind = (node: SupportedDefaultExportExpression): EntityKind => {
  switch (node.type) {
    case AST_NODE_TYPES.ClassExpression:
      return "class";
    case AST_NODE_TYPES.ObjectExpression:
      return "object";
    case AST_NODE_TYPES.ArrowFunctionExpression:
    case AST_NODE_TYPES.FunctionExpression:
      return "function";
  }
};

const getJSDocName = (name: string | undefined): string => name ?? "<default export>";

const hasTSDocComment = (sourceCode: SourceCode, node: TSESTree.Node): boolean =>
  getJSDocComment(sourceCode, node, { maxLines: 1, minLines: 0 }) !== null;

const createTargetKey = (target: Target): string => {
  const [start, end] = target.reportNode.range;
  return `${start}:${end}:${target.kind}:${target.name ?? ""}`;
};

const declarationTargets = (declaration: SupportedDeclaration): Target[] => {
  switch (declaration.type) {
    case AST_NODE_TYPES.ClassDeclaration:
      return [
        {
          commentNode: declaration,
          kind: "class",
          name: declaration.id?.name,
          reportNode: declaration,
        },
      ];
    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
      return [
        {
          commentNode: declaration,
          kind: "function",
          name: declaration.id?.name,
          reportNode: declaration,
        },
      ];
    case AST_NODE_TYPES.TSEnumDeclaration:
      return [
        {
          commentNode: declaration,
          kind: "enum",
          name: declaration.id.name,
          reportNode: declaration,
        },
      ];
    case AST_NODE_TYPES.TSInterfaceDeclaration:
      return [
        {
          commentNode: declaration,
          kind: "interface",
          name: declaration.id.name,
          reportNode: declaration,
        },
      ];
    case AST_NODE_TYPES.TSTypeAliasDeclaration:
      return [
        {
          commentNode: declaration,
          kind: "type",
          name: declaration.id.name,
          reportNode: declaration,
        },
      ];
    case AST_NODE_TYPES.VariableDeclaration:
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
};

export default createRule<Options, MessageIds>({
  name: "require",
  defaultOptions: [],
  meta: {
    type: "problem",
    docs: {
      description:
        "Requires TSDoc comments for exported TypeScript declarations and default exports.",
    },
    messages: {
      missingTSDoc: "Missing TSDoc for exported {{entityKind}} {{entityName}}.",
    },
    schema: [],
  },
  create(context) {
    const declarationsByName = new Map<string, Target>();
    const checkedTargets = new Set<string>();
    const sourceCode = context.sourceCode;

    const checkTarget = (target: Target): void => {
      const targetKey = createTargetKey(target);
      if (checkedTargets.has(targetKey)) {
        return;
      }

      checkedTargets.add(targetKey);

      if (hasTSDocComment(sourceCode, target.commentNode)) {
        return;
      }

      context.report({
        node: target.reportNode,
        messageId: "missingTSDoc",
        data: {
          entityKind: target.kind,
          entityName: getJSDocName(target.name),
        },
      });
    };

    const checkDeclaration = (declaration: SupportedDeclaration): void => {
      for (const target of declarationTargets(declaration)) {
        checkTarget(target);
      }
    };

    const trackDeclarationTargets = (declaration: SupportedDeclaration): void => {
      for (const target of declarationTargets(declaration)) {
        if (target.name === undefined) {
          continue;
        }

        declarationsByName.set(target.name, target);
      }
    };

    const checkIdentifierExport = (identifier: TSESTree.Identifier): void => {
      const target = declarationsByName.get(identifier.name);
      if (target !== undefined) {
        checkTarget(target);
      }
    };

    return {
      Program(programNode): void {
        declarationsByName.clear();
        checkedTargets.clear();

        for (const statement of programNode.body) {
          if (isSupportedDeclaration(statement)) {
            trackDeclarationTargets(statement);
            continue;
          }

          if (
            statement.type === AST_NODE_TYPES.ExportNamedDeclaration &&
            statement.declaration !== null &&
            isSupportedDeclaration(statement.declaration)
          ) {
            trackDeclarationTargets(statement.declaration);
          }
        }
      },
      ExportNamedDeclaration(exportNode): void {
        if (exportNode.declaration !== null && isSupportedDeclaration(exportNode.declaration)) {
          checkDeclaration(exportNode.declaration);
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
      ExportDefaultDeclaration(exportNode): void {
        const { declaration } = exportNode;

        if (declaration.type === AST_NODE_TYPES.Identifier) {
          checkIdentifierExport(declaration);
          return;
        }

        if (isSupportedDeclaration(declaration)) {
          checkDeclaration(declaration);
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
    };
  },
});
