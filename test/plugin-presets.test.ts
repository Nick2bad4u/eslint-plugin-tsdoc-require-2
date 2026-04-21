import { describe, expect, it } from "vitest";

import plugin from "../src/plugin.js";
import { requiredTagDefinitions } from "../src/rules/require-tag-rules.js";

const getPresetRules = (presetName: string): Record<string, unknown> => {
    const preset = plugin.configs?.[presetName];

    if (
        preset === undefined ||
        Array.isArray(preset) ||
        preset.rules === undefined
    ) {
        throw new TypeError(`Missing flat config preset: ${presetName}`);
    }

    return preset.rules;
};

describe("plugin presets", () => {
    it("keeps recommended preset minimal", () => {
        expect.hasAssertions();

        const rules = getPresetRules("recommended");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBeUndefined();
    });

    it("enables require + require-remarks in detailed preset", () => {
        expect.hasAssertions();

        const rules = getPresetRules("detailed");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(
            rules["tsdoc-require-2/require-package-documentation"]
        ).toBeUndefined();
    });

    it("enables package documentation trio in packages preset", () => {
        expect.hasAssertions();

        const rules = getPresetRules("packages");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(rules["tsdoc-require-2/require-package-documentation"]).toBe(
            "error"
        );
    });

    it("enables a conservative typedoc baseline with scoped kind tags", () => {
        expect.hasAssertions();

        const rules = getPresetRules("typedoc");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-class"]).toStrictEqual([
            "error",
            { enforceFor: ["class"] },
        ]);
        expect(rules["tsdoc-require-2/require-enum"]).toStrictEqual([
            "error",
            { enforceFor: ["enum"] },
        ]);
        expect(rules["tsdoc-require-2/require-function"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-interface"]).toStrictEqual([
            "error",
            { enforceFor: ["interface"] },
        ]);
        expect(rules["tsdoc-require-2/require-remarks"]).toBeUndefined();
        expect(rules["tsdoc-require-2/restrict-tags"]).toBeUndefined();
    });

    it("enables typedoc-strict with compatibility-tag restrictions", () => {
        expect.hasAssertions();

        const rules = getPresetRules("typedoc-strict");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-class"]).toStrictEqual([
            "error",
            { enforceFor: ["class"] },
        ]);
        expect(rules["tsdoc-require-2/require-module"]).toStrictEqual([
            "error",
            { enforceFor: ["namespace"] },
        ]);
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(rules["tsdoc-require-2/restrict-tags"]).toStrictEqual([
            "error",
            {
                mode: "deny",
                tags: [
                    "@augments",
                    "@callback",
                    "@extends",
                    "@jsx",
                    "@satisfies",
                    "@type",
                    "@typedef",
                    "@yields",
                ],
            },
        ]);
    });

    it("enables tsdoc preset with scoped function/type-parameter tags", () => {
        expect.hasAssertions();

        const rules = getPresetRules("tsdoc");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(rules["tsdoc-require-2/require-param"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-returns"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-throws"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-type-param"]).toStrictEqual([
            "error",
            {
                enforceFor: [
                    "class",
                    "function",
                    "interface",
                    "type",
                ],
            },
        ]);
        expect(rules["tsdoc-require-2/restrict-tags"]).toStrictEqual([
            "error",
            {
                mode: "deny",
                tags: [
                    "@augments",
                    "@callback",
                    "@extends",
                    "@jsx",
                    "@satisfies",
                    "@type",
                    "@typedef",
                    "@yields",
                ],
            },
        ]);
    });

    it("enables jsdoc preset with function-focused tags", () => {
        expect.hasAssertions();

        const rules = getPresetRules("jsdoc");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-param"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-returns"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/require-throws"]).toStrictEqual([
            "error",
            { enforceFor: ["function"] },
        ]);
        expect(rules["tsdoc-require-2/restrict-tags"]).toBeUndefined();
    });

    it("enables every plugin rule in all preset", () => {
        expect.hasAssertions();

        const rules = getPresetRules("all");

        for (const { ruleName } of requiredTagDefinitions) {
            expect(rules[`tsdoc-require-2/${ruleName}`]).toBe("error");
        }

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/restrict-tags"]).toBe("error");
        expect(Object.keys(rules)).toHaveLength(
            requiredTagDefinitions.length + 2
        );
    });
});
