import { ESLint } from "eslint";
import tsParser from "@typescript-eslint/parser";

const EXPECT_FLAG = "--expect-eslint-major=";

/**
 * @param {readonly string[]} argumentsList
 *
 * @returns {number | null}
 */
const getExpectedMajorVersion = (argumentsList) => {
    const expectedFlag = argumentsList.find((argument) =>
        argument.startsWith(EXPECT_FLAG)
    );
    if (expectedFlag === undefined) {
        return null;
    }

    const value = expectedFlag.slice(EXPECT_FLAG.length);
    if (!/^\d+$/.test(value)) {
        throw new Error(
            `Invalid expected ESLint major version: ${value}. Use integers, for example --expect-eslint-major=9`
        );
    }

    return Number.parseInt(value, 10);
};

const currentVersion = ESLint.version;
const currentMajorVersion = Number.parseInt(
    currentVersion.split(".")[0] ?? "",
    10
);

if (!Number.isInteger(currentMajorVersion)) {
    throw new TypeError(
        `Unable to parse ESLint version from ${currentVersion}.`
    );
}

const expectedMajorVersion = getExpectedMajorVersion(process.argv.slice(2));
if (
    expectedMajorVersion !== null &&
    expectedMajorVersion !== currentMajorVersion
) {
    throw new Error(
        `Expected ESLint major ${expectedMajorVersion}, but found ${currentMajorVersion} (${currentVersion}).`
    );
}

const { default: plugin } = await import("../dist/plugin.js");

const eslint = new ESLint({
    ignore: false,
    overrideConfig: [
        {
            files: ["**/*.ts"],
            languageOptions: {
                parser: tsParser,
                parserOptions: {
                    ecmaVersion: "latest",
                    sourceType: "module",
                },
            },
            plugins: {
                "tsdoc-require-2": plugin,
            },
            rules: {
                "tsdoc-require-2/require": "error",
            },
        },
    ],
    overrideConfigFile: true,
});

const invalidResult = await eslint.lintText("export class MissingDoc {}", {
    filePath: "compat.invalid.ts",
});
const validResult = await eslint.lintText(
    "/** Documented */ export class HasDoc {}",
    {
        filePath: "compat.valid.ts",
    }
);

const invalidErrorCount = invalidResult[0]?.errorCount ?? 0;
const validErrorCount = validResult[0]?.errorCount ?? 0;

if (invalidErrorCount === 0) {
    throw new Error(
        "Compatibility smoke test failed: invalid source did not report any errors."
    );
}

if (validErrorCount !== 0) {
    throw new Error(
        "Compatibility smoke test failed: valid source produced lint errors."
    );
}

console.log(
    `ESLint compatibility smoke check passed for ESLint ${currentVersion}. Reported ${invalidErrorCount} expected error(s).`
);
