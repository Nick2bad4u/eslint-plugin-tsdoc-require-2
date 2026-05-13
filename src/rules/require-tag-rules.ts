import type { TSESLint } from "@typescript-eslint/utils";

import type {
    TagRuleDefinition,
    TagRuleMessageIds,
    TagRuleOptions,
} from "../internal/require-tag-factory.js";

import RequireAbstractRule from "./required-tags/require-abstract.js";
import RequireAlphaRule from "./required-tags/require-alpha.js";
import RequireAuthorRule from "./required-tags/require-author.js";
import RequireBetaRule from "./required-tags/require-beta.js";
import RequireCategoryRule from "./required-tags/require-category.js";
import RequireClassRule from "./required-tags/require-class.js";
import RequireDecoratorRule from "./required-tags/require-decorator.js";
import RequireDefaultValueRule from "./required-tags/require-default-value.js";
import RequireDeprecatedRule from "./required-tags/require-deprecated.js";
import RequireDocumentRule from "./required-tags/require-document.js";
import RequireEnumRule from "./required-tags/require-enum.js";
import RequireEventPropertyRule from "./required-tags/require-event-property.js";
import RequireEventRule from "./required-tags/require-event.js";
import RequireExampleRule from "./required-tags/require-example.js";
import RequireExpandRule from "./required-tags/require-expand.js";
import RequireExperimentalRule from "./required-tags/require-experimental.js";
import RequireFunctionRule from "./required-tags/require-function.js";
import RequireGroupRule from "./required-tags/require-group.js";
import RequireHiddenRule from "./required-tags/require-hidden.js";
import RequireHideconstructorRule from "./required-tags/require-hideconstructor.js";
import RequireIgnoreRule from "./required-tags/require-ignore.js";
import RequireImportRule from "./required-tags/require-import.js";
import RequireIncludeRule from "./required-tags/require-include.js";
import RequireInheritDocRule from "./required-tags/require-inherit-doc.js";
import RequireInlineRule from "./required-tags/require-inline.js";
import RequireInterfaceRule from "./required-tags/require-interface.js";
import RequireInternalRule from "./required-tags/require-internal.js";
import RequireLabelRule from "./required-tags/require-label.js";
import RequireLicenseRule from "./required-tags/require-license.js";
import RequireLinkRule from "./required-tags/require-link.js";
import RequireMergeModuleWithRule from "./required-tags/require-merge-module-with.js";
import RequireModuleRule from "./required-tags/require-module.js";
import RequireNamespaceRule from "./required-tags/require-namespace.js";
import RequireOverloadRule from "./required-tags/require-overload.js";
import RequireOverrideRule from "./required-tags/require-override.js";
import RequirePackageDocumentationRule from "./required-tags/require-package-documentation.js";
import RequireParamRule from "./required-tags/require-param.js";
import RequirePrimaryExportRule from "./required-tags/require-primary-export.js";
import RequirePrivateRemarksRule from "./required-tags/require-private-remarks.js";
import RequirePrivateRule from "./required-tags/require-private.js";
import RequirePropertyRule from "./required-tags/require-property.js";
import RequireProtectedRule from "./required-tags/require-protected.js";
import RequirePublicRule from "./required-tags/require-public.js";
import RequireReadonlyRule from "./required-tags/require-readonly.js";
import RequireRemarksRule from "./required-tags/require-remarks.js";
import RequireReturnsRule from "./required-tags/require-returns.js";
import RequireSealedRule from "./required-tags/require-sealed.js";
import RequireSeeRule from "./required-tags/require-see.js";
import RequireSinceRule from "./required-tags/require-since.js";
import RequireSortStrategyRule from "./required-tags/require-sort-strategy.js";
import RequireSummaryRule from "./required-tags/require-summary.js";
import RequireTemplateRule from "./required-tags/require-template.js";
import RequireThrowsRule from "./required-tags/require-throws.js";
import RequireTypeParamRule from "./required-tags/require-type-param.js";
import RequireUseDeclaredTypeRule from "./required-tags/require-use-declared-type.js";
import RequireVirtualRule from "./required-tags/require-virtual.js";

/** Union of all required-tag rule names exported by this plugin. */
type RequiredTagRuleName =
    | "require-abstract"
    | "require-alpha"
    | "require-author"
    | "require-beta"
    | "require-category"
    | "require-class"
    | "require-decorator"
    | "require-default-value"
    | "require-deprecated"
    | "require-document"
    | "require-enum"
    | "require-event"
    | "require-event-property"
    | "require-example"
    | "require-expand"
    | "require-experimental"
    | "require-function"
    | "require-group"
    | "require-hidden"
    | "require-hideconstructor"
    | "require-ignore"
    | "require-import"
    | "require-include"
    | "require-inherit-doc"
    | "require-inline"
    | "require-interface"
    | "require-internal"
    | "require-label"
    | "require-license"
    | "require-link"
    | "require-merge-module-with"
    | "require-module"
    | "require-namespace"
    | "require-overload"
    | "require-override"
    | "require-package-documentation"
    | "require-param"
    | "require-primary-export"
    | "require-private"
    | "require-private-remarks"
    | "require-property"
    | "require-protected"
    | "require-public"
    | "require-readonly"
    | "require-remarks"
    | "require-returns"
    | "require-sealed"
    | "require-see"
    | "require-since"
    | "require-sort-strategy"
    | "require-summary"
    | "require-template"
    | "require-throws"
    | "require-type-param"
    | "require-use-declared-type"
    | "require-virtual";

type TagRuleModuleMap = Record<
    string,
    TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>
>;

/** Definitions that map each required-tag rule name to its required TSDoc tag. */
const requiredTagDefinitions: readonly TagRuleDefinition[] = [
    { ruleName: "require-abstract", tagName: "@abstract" },
    { ruleName: "require-alpha", tagName: "@alpha" },
    { ruleName: "require-author", tagName: "@author" },
    { ruleName: "require-beta", tagName: "@beta" },
    { ruleName: "require-category", tagName: "@category" },
    { ruleName: "require-class", tagName: "@class" },
    { ruleName: "require-decorator", tagName: "@decorator" },
    { ruleName: "require-default-value", tagName: "@defaultValue" },
    { ruleName: "require-deprecated", tagName: "@deprecated" },
    { ruleName: "require-document", tagName: "@document" },
    { ruleName: "require-enum", tagName: "@enum" },
    { ruleName: "require-event", tagName: "@event" },
    { ruleName: "require-event-property", tagName: "@eventProperty" },
    { ruleName: "require-example", tagName: "@example" },
    { ruleName: "require-expand", tagName: "@expand" },
    { ruleName: "require-experimental", tagName: "@experimental" },
    { ruleName: "require-function", tagName: "@function" },
    { ruleName: "require-group", tagName: "@group" },
    { ruleName: "require-hidden", tagName: "@hidden" },
    { ruleName: "require-hideconstructor", tagName: "@hideconstructor" },
    { ruleName: "require-ignore", tagName: "@ignore" },
    { ruleName: "require-import", tagName: "@import" },
    { ruleName: "require-include", tagName: "@include" },
    { ruleName: "require-inherit-doc", tagName: "@inheritDoc" },
    { ruleName: "require-inline", tagName: "@inline" },
    { ruleName: "require-interface", tagName: "@interface" },
    { ruleName: "require-internal", tagName: "@internal" },
    { ruleName: "require-label", tagName: "@label" },
    { ruleName: "require-license", tagName: "@license" },
    { ruleName: "require-link", tagName: "@link" },
    { ruleName: "require-merge-module-with", tagName: "@mergeModuleWith" },
    { ruleName: "require-module", tagName: "@module" },
    { ruleName: "require-namespace", tagName: "@namespace" },
    { ruleName: "require-overload", tagName: "@overload" },
    { ruleName: "require-override", tagName: "@override" },
    {
        ruleName: "require-package-documentation",
        tagName: "@packageDocumentation",
    },
    { ruleName: "require-param", tagName: "@param" },
    { ruleName: "require-primary-export", tagName: "@primaryExport" },
    { ruleName: "require-private", tagName: "@private" },
    { ruleName: "require-private-remarks", tagName: "@privateRemarks" },
    { ruleName: "require-property", tagName: "@property" },
    { ruleName: "require-protected", tagName: "@protected" },
    { ruleName: "require-public", tagName: "@public" },
    { ruleName: "require-readonly", tagName: "@readonly" },
    { ruleName: "require-remarks", tagName: "@remarks" },
    { ruleName: "require-returns", tagName: "@returns" },
    { ruleName: "require-sealed", tagName: "@sealed" },
    { ruleName: "require-see", tagName: "@see" },
    { ruleName: "require-since", tagName: "@since" },
    { ruleName: "require-sort-strategy", tagName: "@sortStrategy" },
    { ruleName: "require-summary", tagName: "@summary" },
    { ruleName: "require-template", tagName: "@template" },
    { ruleName: "require-throws", tagName: "@throws" },
    { ruleName: "require-type-param", tagName: "@typeParam" },
    { ruleName: "require-use-declared-type", tagName: "@useDeclaredType" },
    { ruleName: "require-virtual", tagName: "@virtual" },
];

/** Runtime map of required-tag rule modules keyed by rule name. */
const requiredTagRules: Record<RequiredTagRuleName, TagRuleModuleMap[string]> =
    {
        "require-abstract": RequireAbstractRule,
        "require-alpha": RequireAlphaRule,
        "require-author": RequireAuthorRule,
        "require-beta": RequireBetaRule,
        "require-category": RequireCategoryRule,
        "require-class": RequireClassRule,
        "require-decorator": RequireDecoratorRule,
        "require-default-value": RequireDefaultValueRule,
        "require-deprecated": RequireDeprecatedRule,
        "require-document": RequireDocumentRule,
        "require-enum": RequireEnumRule,
        "require-event": RequireEventRule,
        "require-event-property": RequireEventPropertyRule,
        "require-example": RequireExampleRule,
        "require-expand": RequireExpandRule,
        "require-experimental": RequireExperimentalRule,
        "require-function": RequireFunctionRule,
        "require-group": RequireGroupRule,
        "require-hidden": RequireHiddenRule,
        "require-hideconstructor": RequireHideconstructorRule,
        "require-ignore": RequireIgnoreRule,
        "require-import": RequireImportRule,
        "require-include": RequireIncludeRule,
        "require-inherit-doc": RequireInheritDocRule,
        "require-inline": RequireInlineRule,
        "require-interface": RequireInterfaceRule,
        "require-internal": RequireInternalRule,
        "require-label": RequireLabelRule,
        "require-license": RequireLicenseRule,
        "require-link": RequireLinkRule,
        "require-merge-module-with": RequireMergeModuleWithRule,
        "require-module": RequireModuleRule,
        "require-namespace": RequireNamespaceRule,
        "require-overload": RequireOverloadRule,
        "require-override": RequireOverrideRule,
        "require-package-documentation": RequirePackageDocumentationRule,
        "require-param": RequireParamRule,
        "require-primary-export": RequirePrimaryExportRule,
        "require-private": RequirePrivateRule,
        "require-private-remarks": RequirePrivateRemarksRule,
        "require-property": RequirePropertyRule,
        "require-protected": RequireProtectedRule,
        "require-public": RequirePublicRule,
        "require-readonly": RequireReadonlyRule,
        "require-remarks": RequireRemarksRule,
        "require-returns": RequireReturnsRule,
        "require-sealed": RequireSealedRule,
        "require-see": RequireSeeRule,
        "require-since": RequireSinceRule,
        "require-sort-strategy": RequireSortStrategyRule,
        "require-summary": RequireSummaryRule,
        "require-template": RequireTemplateRule,
        "require-throws": RequireThrowsRule,
        "require-type-param": RequireTypeParamRule,
        "require-use-declared-type": RequireUseDeclaredTypeRule,
        "require-virtual": RequireVirtualRule,
    };

export { requiredTagDefinitions };
export { requiredTagRules };
export type { RequiredTagRuleName };
