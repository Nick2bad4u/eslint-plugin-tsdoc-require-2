import type { ESLint, Linter } from "eslint";

import {
    requiredTagDefinitions,
    requiredTagRules,
} from "./rules/require-tag-rules.js";
import requireRule from "./rules/require.js";

type FlatConfig = Linter.Config & {
    plugins: NonNullable<Linter.Config["plugins"]>;
    rules: NonNullable<Linter.Config["rules"]>;
};

type RuleModuleMap = typeof requiredTagRules & {
    require: typeof requireRule;
};

const rules: RuleModuleMap = {
    require: requireRule,
    ...requiredTagRules,
};

const pluginRules = rules as unknown as NonNullable<ESLint.Plugin["rules"]>;

const plugin: ESLint.Plugin = {
    configs: {},
    meta: {
        name: "eslint-plugin-tsdoc-require-2",
        version: "1.0.2",
    },
    rules: pluginRules,
};

const recommendedConfig: FlatConfig = {
    plugins: {},
    rules: {
        "tsdoc-require-2/require": "error",
    },
};

const allConfigRules: NonNullable<FlatConfig["rules"]> = {
    "tsdoc-require-2/require": "error",
};

recommendedConfig.plugins["tsdoc-require-2"] = plugin;

for (const { ruleName } of requiredTagDefinitions) {
    allConfigRules[`tsdoc-require-2/${ruleName}`] = "error";
}

const allConfig: FlatConfig = {
    plugins: {
        "tsdoc-require-2": plugin,
    },
    rules: allConfigRules,
};

plugin.configs = {
    all: allConfig,
    recommended: recommendedConfig,
};

export { rules };
export default plugin;
