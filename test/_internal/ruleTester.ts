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

type PluginRuleName = keyof typeof pluginRules;

const createRuleTester = (): RuleTester =>
    new RuleTester(defaultRuleTesterConfig);

const getPluginRule = <TRuleName extends PluginRuleName>(
    ruleName: TRuleName
): (typeof pluginRules)[TRuleName] => pluginRules[ruleName];

export { createRuleTester,
getPluginRule };
