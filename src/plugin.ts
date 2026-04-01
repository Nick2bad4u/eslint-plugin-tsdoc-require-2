import type { ESLint, Linter } from "eslint";

import {
    requiredTagDefinitions,
    requiredTagRules,
} from "./rules/require-tag-rules.js";
import requireRule from "./rules/require.js";
import restrictTagsRule from "./rules/restrict-tags.js";

type FlatConfig = Linter.Config & {
    plugins: NonNullable<Linter.Config["plugins"]>;
    rules: NonNullable<Linter.Config["rules"]>;
};

type PresetRuleEntry = {
    readonly ruleName: keyof RuleModuleMap;
    readonly value?: NonNullable<FlatConfig["rules"]>[string];
};

type RuleModuleMap = typeof requiredTagRules & {
    require: typeof requireRule;
    "restrict-tags": typeof restrictTagsRule;
};

/** Map of all exported rule modules. */
const rules: RuleModuleMap = {
    require: requireRule,
    "restrict-tags": restrictTagsRule,
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

const typedocCompatibilityBlockTags = [
    "@augments",
    "@callback",
    "@extends",
    "@jsx",
    "@satisfies",
    "@type",
    "@typedef",
    "@yields",
] as const;

const presetRuleEntries = {
    all: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("restrict-tags"),
        ...requiredTagDefinitions.map(({ ruleName }) =>
            createPresetRuleEntry(ruleName as keyof RuleModuleMap)
        ),
    ],
    detailed: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-remarks"),
    ],
    jsdoc: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-param", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-returns", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-throws", [
            "error",
            { enforceFor: ["function"] },
        ]),
    ],
    packages: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-remarks"),
        createPresetRuleEntry("require-package-documentation"),
    ],
    recommended: [createPresetRuleEntry("require")],
    tsdoc: [
        createPresetRuleEntry("require"),
        createPresetRuleEntry("require-remarks"),
        createPresetRuleEntry("require-param", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-returns", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-throws", [
            "error",
            { enforceFor: ["function"] },
        ]),
        createPresetRuleEntry("require-type-param", [
            "error",
            {
                enforceFor: [
                    "class",
                    "function",
                    "interface",
                    "type",
                ],
            },
        ]),
        createPresetRuleEntry("restrict-tags", [
            "error",
            {
                mode: "deny",
                tags: [...typedocCompatibilityBlockTags],
            },
        ]),
    ],
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
    "typedoc-strict": [
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
        createPresetRuleEntry("require-module", [
            "error",
            { enforceFor: ["namespace"] },
        ]),
        createPresetRuleEntry("require-remarks"),
        createPresetRuleEntry("restrict-tags", [
            "error",
            {
                mode: "deny",
                tags: [...typedocCompatibilityBlockTags],
            },
        ]),
    ],
} as const;

const createPresetRules = (
    ruleEntries: readonly Readonly<PresetRuleEntry>[]
): NonNullable<FlatConfig["rules"]> => {
    const presetRules: NonNullable<FlatConfig["rules"]> = {};

    for (const { ruleName, value } of ruleEntries) {
        presetRules[`tsdoc-require-2/${ruleName}`] = value ?? "error";
    }

    return presetRules;
};

const createPresetConfig = (
    ruleEntries: readonly Readonly<PresetRuleEntry>[]
): FlatConfig => ({
    plugins: {
        "tsdoc-require-2": plugin,
    },
    rules: createPresetRules(ruleEntries),
});

plugin.configs = {
    all: createPresetConfig(presetRuleEntries.all),
    detailed: createPresetConfig(presetRuleEntries.detailed),
    jsdoc: createPresetConfig(presetRuleEntries.jsdoc),
    packages: createPresetConfig(presetRuleEntries.packages),
    recommended: createPresetConfig(presetRuleEntries.recommended),
    tsdoc: createPresetConfig(presetRuleEntries.tsdoc),
    typedoc: createPresetConfig(presetRuleEntries.typedoc),
    "typedoc-strict": createPresetConfig(presetRuleEntries["typedoc-strict"]),
};

export { rules };
export default plugin;
