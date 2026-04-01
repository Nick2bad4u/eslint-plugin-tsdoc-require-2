import type { TSESLint } from "@typescript-eslint/utils";

import type {
    TagRuleDefinition,
    TagRuleMessageIds,
    TagRuleOptions,
} from "../internal/require-tag-factory.js";

import requireAbstractRule from "./required-tags/require-abstract.js";
import requireAlphaRule from "./required-tags/require-alpha.js";
import requireAuthorRule from "./required-tags/require-author.js";
import requireBetaRule from "./required-tags/require-beta.js";
import requireCategoryRule from "./required-tags/require-category.js";
import requireClassRule from "./required-tags/require-class.js";
import requireDecoratorRule from "./required-tags/require-decorator.js";
import requireDefaultValueRule from "./required-tags/require-default-value.js";
import requireDeprecatedRule from "./required-tags/require-deprecated.js";
import requireDocumentRule from "./required-tags/require-document.js";
import requireEnumRule from "./required-tags/require-enum.js";
import requireEventPropertyRule from "./required-tags/require-event-property.js";
import requireEventRule from "./required-tags/require-event.js";
import requireExampleRule from "./required-tags/require-example.js";
import requireExpandRule from "./required-tags/require-expand.js";
import requireExperimentalRule from "./required-tags/require-experimental.js";
import requireFunctionRule from "./required-tags/require-function.js";
import requireGroupRule from "./required-tags/require-group.js";
import requireHiddenRule from "./required-tags/require-hidden.js";
import requireHideconstructorRule from "./required-tags/require-hideconstructor.js";
import requireIgnoreRule from "./required-tags/require-ignore.js";
import requireImportRule from "./required-tags/require-import.js";
import requireIncludeRule from "./required-tags/require-include.js";
import requireInheritDocRule from "./required-tags/require-inherit-doc.js";
import requireInlineRule from "./required-tags/require-inline.js";
import requireInterfaceRule from "./required-tags/require-interface.js";
import requireInternalRule from "./required-tags/require-internal.js";
import requireLabelRule from "./required-tags/require-label.js";
import requireLicenseRule from "./required-tags/require-license.js";
import requireLinkRule from "./required-tags/require-link.js";
import requireMergeModuleWithRule from "./required-tags/require-merge-module-with.js";
import requireModuleRule from "./required-tags/require-module.js";
import requireNamespaceRule from "./required-tags/require-namespace.js";
import requireOverloadRule from "./required-tags/require-overload.js";
import requireOverrideRule from "./required-tags/require-override.js";
import requirePackageDocumentationRule from "./required-tags/require-package-documentation.js";
import requireParamRule from "./required-tags/require-param.js";
import requirePrimaryExportRule from "./required-tags/require-primary-export.js";
import requirePrivateRemarksRule from "./required-tags/require-private-remarks.js";
import requirePrivateRule from "./required-tags/require-private.js";
import requirePropertyRule from "./required-tags/require-property.js";
import requireProtectedRule from "./required-tags/require-protected.js";
import requirePublicRule from "./required-tags/require-public.js";
import requireReadonlyRule from "./required-tags/require-readonly.js";
import requireRemarksRule from "./required-tags/require-remarks.js";
import requireReturnsRule from "./required-tags/require-returns.js";
import requireSealedRule from "./required-tags/require-sealed.js";
import requireSeeRule from "./required-tags/require-see.js";
import requireSinceRule from "./required-tags/require-since.js";
import requireSortStrategyRule from "./required-tags/require-sort-strategy.js";
import requireSummaryRule from "./required-tags/require-summary.js";
import requireTemplateRule from "./required-tags/require-template.js";
import requireThrowsRule from "./required-tags/require-throws.js";
import requireTypeParamRule from "./required-tags/require-type-param.js";
import requireUseDeclaredTypeRule from "./required-tags/require-use-declared-type.js";
import requireVirtualRule from "./required-tags/require-virtual.js";

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
        "require-abstract": requireAbstractRule,
        "require-alpha": requireAlphaRule,
        "require-author": requireAuthorRule,
        "require-beta": requireBetaRule,
        "require-category": requireCategoryRule,
        "require-class": requireClassRule,
        "require-decorator": requireDecoratorRule,
        "require-default-value": requireDefaultValueRule,
        "require-deprecated": requireDeprecatedRule,
        "require-document": requireDocumentRule,
        "require-enum": requireEnumRule,
        "require-event": requireEventRule,
        "require-event-property": requireEventPropertyRule,
        "require-example": requireExampleRule,
        "require-expand": requireExpandRule,
        "require-experimental": requireExperimentalRule,
        "require-function": requireFunctionRule,
        "require-group": requireGroupRule,
        "require-hidden": requireHiddenRule,
        "require-hideconstructor": requireHideconstructorRule,
        "require-ignore": requireIgnoreRule,
        "require-import": requireImportRule,
        "require-include": requireIncludeRule,
        "require-inherit-doc": requireInheritDocRule,
        "require-inline": requireInlineRule,
        "require-interface": requireInterfaceRule,
        "require-internal": requireInternalRule,
        "require-label": requireLabelRule,
        "require-license": requireLicenseRule,
        "require-link": requireLinkRule,
        "require-merge-module-with": requireMergeModuleWithRule,
        "require-module": requireModuleRule,
        "require-namespace": requireNamespaceRule,
        "require-overload": requireOverloadRule,
        "require-override": requireOverrideRule,
        "require-package-documentation": requirePackageDocumentationRule,
        "require-param": requireParamRule,
        "require-primary-export": requirePrimaryExportRule,
        "require-private": requirePrivateRule,
        "require-private-remarks": requirePrivateRemarksRule,
        "require-property": requirePropertyRule,
        "require-protected": requireProtectedRule,
        "require-public": requirePublicRule,
        "require-readonly": requireReadonlyRule,
        "require-remarks": requireRemarksRule,
        "require-returns": requireReturnsRule,
        "require-sealed": requireSealedRule,
        "require-see": requireSeeRule,
        "require-since": requireSinceRule,
        "require-sort-strategy": requireSortStrategyRule,
        "require-summary": requireSummaryRule,
        "require-template": requireTemplateRule,
        "require-throws": requireThrowsRule,
        "require-type-param": requireTypeParamRule,
        "require-use-declared-type": requireUseDeclaredTypeRule,
        "require-virtual": requireVirtualRule,
    };

export { requiredTagDefinitions };
export { requiredTagRules };
export type { RequiredTagRuleName };
