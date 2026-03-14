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

    return preset.rules as Record<string, unknown>;
};

describe("plugin presets", () => {
    it("keeps recommended preset minimal", () => {
        const rules = getPresetRules("recommended");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBeUndefined();
    });

    it("enables require + require-remarks in detailed preset", () => {
        const rules = getPresetRules("detailed");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(
            rules["tsdoc-require-2/require-package-documentation"]
        ).toBeUndefined();
    });

    it("enables package documentation trio in packages preset", () => {
        const rules = getPresetRules("packages");

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(rules["tsdoc-require-2/require-remarks"]).toBe("error");
        expect(rules["tsdoc-require-2/require-package-documentation"]).toBe(
            "error"
        );
    });

    it("enables every plugin rule in all preset", () => {
        const rules = getPresetRules("all");

        for (const { ruleName } of requiredTagDefinitions) {
            expect(rules[`tsdoc-require-2/${ruleName}`]).toBe("error");
        }

        expect(rules["tsdoc-require-2/require"]).toBe("error");
        expect(Object.keys(rules)).toHaveLength(
            requiredTagDefinitions.length + 1
        );
    });
});
