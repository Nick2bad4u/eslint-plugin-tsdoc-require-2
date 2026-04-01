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

type PresetRuleEntry = {
    readonly ruleName: keyof RuleModuleMap;
    readonly value?: NonNullable<FlatConfig["rules"]>[string];
};

/** Map of all exported rule modules. */
const rules: RuleModuleMap = {
    require: requireRule,
    ...requiredTagRules,
};

const pluginRules = rules as unknown as NonNullable<ESLint.Plugin["rules"]>;

/** Plugin object exported to ESLint. */
const plugin: ESLint.Plugin = {
    configs: {},
    meta: {
        name: "eslint-plugin-tsdoc-require-2",
        version: "1.0.2",
    },
    rules: pluginRules,
};

const createPresetRuleEntry = (
    ruleName: keyof RuleModuleMap,
    value: NonNullable<FlatConfig["rules"]>[string] = "error"
): PresetRuleEntry => ({
    ruleName,
    value,
});

const presetRuleEntries = {
    all: [
        createPresetRuleEntry("require"),
        ...requiredTagDefinitions.map(({ ruleName }) =>
            createPresetRuleEntry(ruleName as keyof RuleModuleMap)
        ),
    ],
    detailed: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-remarks"),
    ],
    packages: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-remarks"),
        createPresetRuleEntry("require-package-documentation"),
    ],
    recommended: [createPresetRuleEntry("require")],
    typedoc: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-class", [
            "error",
            { enforceFor: ["class"] },
        ]),
        createPresetRuleEntry("require-enum", [
            "error",
            { enforceFor: ["enum"] },
        ]),
        createPresetRuleEntry("require-function", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-interface", [
            "error",
            { enforceFor: ["interface"] },
        ]),
    ],
} as const;

const createPresetRules = (
    ruleEntries: readonly PresetRuleEntry[]
): NonNullable<FlatConfig["rules"]> => {
    const presetRules: NonNullable<FlatConfig["rules"]> = {};

    for (const { ruleName, value } of ruleEntries) {
        presetRules[`tsdoc-require-2/${ruleName}`] = value ?? "error";
    }

    return presetRules;
};

const createPresetConfig = (
    ruleEntries: readonly PresetRuleEntry[]
): FlatConfig => ({
    plugins: {
        "tsdoc-require-2": plugin,
    },
    rules: createPresetRules(ruleEntries),
});

plugin.configs = {
    all: createPresetConfig(presetRuleEntries.all),
    detailed: createPresetConfig(presetRuleEntries.detailed),
    packages: createPresetConfig(presetRuleEntries.packages),
    recommended: createPresetConfig(presetRuleEntries.recommended),
    typedoc: createPresetConfig(presetRuleEntries.typedoc),
};

export { rules };
export default plugin;
