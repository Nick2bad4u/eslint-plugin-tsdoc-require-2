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

const presetRuleNames = {
    all: ["require", ...requiredTagDefinitions.map(({ ruleName }) => ruleName)],
    detailed: ["require", "require-remarks"],
    packages: [
        "require",
        "require-remarks",
        "require-package-documentation",
    ],
    recommended: ["require"],
} as const;

const createPresetRules = (
    ruleNames: readonly string[]
): NonNullable<FlatConfig["rules"]> => {
    const presetRules: NonNullable<FlatConfig["rules"]> = {};

    for (const ruleName of ruleNames) {
        presetRules[`tsdoc-require-2/${ruleName}`] = "error";
    }

    return presetRules;
};

const createPresetConfig = (ruleNames: readonly string[]): FlatConfig => ({
    plugins: {
        "tsdoc-require-2": plugin,
    },
    rules: createPresetRules(ruleNames),
});

plugin.configs = {
    all: createPresetConfig(presetRuleNames.all),
    detailed: createPresetConfig(presetRuleNames.detailed),
    packages: createPresetConfig(presetRuleNames.packages),
    recommended: createPresetConfig(presetRuleNames.recommended),
};

export { rules };
export default plugin;
