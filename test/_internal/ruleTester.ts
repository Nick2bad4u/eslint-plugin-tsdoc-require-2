import tsParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";

import type { requiredTagRules } from "../../src/rules/require-tag-rules.js";
import type requireRule from "../../src/rules/require.js";
import type restrictTagsRule from "../../src/rules/restrict-tags.js";

import { rules as pluginRules } from "../../src/plugin.js";

const defaultRuleTesterConfig: ConstructorParameters<typeof RuleTester>[0] = {
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
};

const createRuleTester = (): RuleTester =>
    new RuleTester(defaultRuleTesterConfig);

function getPluginRule(ruleName: "require"): typeof requireRule;
function getPluginRule(ruleName: "restrict-tags"): typeof restrictTagsRule;
function getPluginRule<TRuleName extends keyof typeof requiredTagRules>(
    ruleName: TRuleName
): (typeof requiredTagRules)[TRuleName];
function getPluginRule(
    ruleName: keyof typeof pluginRules
):
    | (typeof requiredTagRules)[keyof typeof requiredTagRules]
    | typeof requireRule
    | typeof restrictTagsRule {
    return pluginRules[ruleName];
}

export { createRuleTester };
export { getPluginRule };
