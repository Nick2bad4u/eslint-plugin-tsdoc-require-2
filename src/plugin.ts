import type { ESLint, Linter } from "eslint";

import { requiredTagRules } from "./rules/require-tag-rules.js";
import requireRule from "./rules/require.js";

type RecommendedConfig = Linter.Config & {
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

const recommendedConfig: RecommendedConfig = {
    plugins: {},
    rules: {
        "tsdoc-require-2/require": "error",
    },
};

const plugin: ESLint.Plugin = {
    configs: {
        recommended: recommendedConfig,
    },
    meta: {
        name: "eslint-plugin-tsdoc-require-2",
        version: "0.1.0",
    },
    rules: pluginRules,
};

recommendedConfig.plugins["tsdoc-require-2"] = plugin;

export { rules };
export default plugin;
