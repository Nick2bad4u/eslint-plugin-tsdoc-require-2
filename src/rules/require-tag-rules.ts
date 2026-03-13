import type { TSESLint } from "@typescript-eslint/utils";

import type {
    TagRuleDefinition,
    TagRuleMessageIds,
    TagRuleOptions,
} from "../internal/require-tag-factory.js";

import requireAlphaRule from "./required-tags/require-alpha.js";
import requireBetaRule from "./required-tags/require-beta.js";
import requireDecoratorRule from "./required-tags/require-decorator.js";
import requireDefaultValueRule from "./required-tags/require-default-value.js";
import requireDeprecatedRule from "./required-tags/require-deprecated.js";
import requireEventPropertyRule from "./required-tags/require-event-property.js";
import requireExampleRule from "./required-tags/require-example.js";
import requireExperimentalRule from "./required-tags/require-experimental.js";
import requireInheritDocRule from "./required-tags/require-inherit-doc.js";
import requireInternalRule from "./required-tags/require-internal.js";
import requireLabelRule from "./required-tags/require-label.js";
import requireLinkRule from "./required-tags/require-link.js";
import requireOverrideRule from "./required-tags/require-override.js";
import requirePackageDocumentationRule from "./required-tags/require-package-documentation.js";
import requireParamRule from "./required-tags/require-param.js";
import requirePrivateRemarksRule from "./required-tags/require-private-remarks.js";
import requirePublicRule from "./required-tags/require-public.js";
import requireReadonlyRule from "./required-tags/require-readonly.js";
import requireRemarksRule from "./required-tags/require-remarks.js";
import requireReturnsRule from "./required-tags/require-returns.js";
import requireSealedRule from "./required-tags/require-sealed.js";
import requireSeeRule from "./required-tags/require-see.js";
import requireThrowsRule from "./required-tags/require-throws.js";
import requireTypeParamRule from "./required-tags/require-type-param.js";
import requireVirtualRule from "./required-tags/require-virtual.js";

const requiredTagDefinitions: readonly TagRuleDefinition[] = [
    { ruleName: "require-alpha", tagName: "@alpha" },
    { ruleName: "require-beta", tagName: "@beta" },
    { ruleName: "require-decorator", tagName: "@decorator" },
    { ruleName: "require-default-value", tagName: "@defaultValue" },
    { ruleName: "require-deprecated", tagName: "@deprecated" },
    { ruleName: "require-event-property", tagName: "@eventProperty" },
    { ruleName: "require-example", tagName: "@example" },
    { ruleName: "require-experimental", tagName: "@experimental" },
    { ruleName: "require-inherit-doc", tagName: "@inheritDoc" },
    { ruleName: "require-internal", tagName: "@internal" },
    { ruleName: "require-label", tagName: "@label" },
    { ruleName: "require-link", tagName: "@link" },
    { ruleName: "require-override", tagName: "@override" },
    {
        ruleName: "require-package-documentation",
        tagName: "@packageDocumentation",
    },
    { ruleName: "require-param", tagName: "@param" },
    { ruleName: "require-private-remarks", tagName: "@privateRemarks" },
    { ruleName: "require-public", tagName: "@public" },
    { ruleName: "require-readonly", tagName: "@readonly" },
    { ruleName: "require-remarks", tagName: "@remarks" },
    { ruleName: "require-returns", tagName: "@returns" },
    { ruleName: "require-sealed", tagName: "@sealed" },
    { ruleName: "require-see", tagName: "@see" },
    { ruleName: "require-throws", tagName: "@throws" },
    { ruleName: "require-type-param", tagName: "@typeParam" },
    { ruleName: "require-virtual", tagName: "@virtual" },
];

type RequiredTagRules = {
    "require-alpha": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-beta": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-decorator": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-default-value": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-deprecated": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-event-property": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-example": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-experimental": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-inherit-doc": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-internal": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-label": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-link": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-override": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-package-documentation": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-param": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-private-remarks": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-public": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-readonly": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-remarks": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-returns": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-sealed": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-see": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-throws": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
    "require-type-param": TSESLint.RuleModule<
        TagRuleMessageIds,
        TagRuleOptions
    >;
    "require-virtual": TSESLint.RuleModule<TagRuleMessageIds, TagRuleOptions>;
};

const requiredTagRules: RequiredTagRules = {
    "require-alpha": requireAlphaRule,
    "require-beta": requireBetaRule,
    "require-decorator": requireDecoratorRule,
    "require-default-value": requireDefaultValueRule,
    "require-deprecated": requireDeprecatedRule,
    "require-event-property": requireEventPropertyRule,
    "require-example": requireExampleRule,
    "require-experimental": requireExperimentalRule,
    "require-inherit-doc": requireInheritDocRule,
    "require-internal": requireInternalRule,
    "require-label": requireLabelRule,
    "require-link": requireLinkRule,
    "require-override": requireOverrideRule,
    "require-package-documentation": requirePackageDocumentationRule,
    "require-param": requireParamRule,
    "require-private-remarks": requirePrivateRemarksRule,
    "require-public": requirePublicRule,
    "require-readonly": requireReadonlyRule,
    "require-remarks": requireRemarksRule,
    "require-returns": requireReturnsRule,
    "require-sealed": requireSealedRule,
    "require-see": requireSeeRule,
    "require-throws": requireThrowsRule,
    "require-type-param": requireTypeParamRule,
    "require-virtual": requireVirtualRule,
};

type RequiredTagRuleName = keyof typeof requiredTagRules;

export { requiredTagDefinitions };
export { requiredTagRules };
export type { RequiredTagRuleName };
