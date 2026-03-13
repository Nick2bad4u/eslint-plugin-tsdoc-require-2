import tsParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";

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

const pluginRuleMap: Readonly<
    Record<string, (typeof pluginRules)[keyof typeof pluginRules]>
> = pluginRules;

const getPluginRule = (
    ruleName: string
): (typeof pluginRules)[keyof typeof pluginRules] => {
    const pluginRule = pluginRuleMap[ruleName];
    if (pluginRule === undefined) {
        throw new TypeError(`Unknown plugin rule: ${ruleName}`);
    }

    return pluginRule;
};

export { createRuleTester };
export { getPluginRule };
