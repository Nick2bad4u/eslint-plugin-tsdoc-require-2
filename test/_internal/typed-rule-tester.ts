import type { RuleTester } from "@typescript-eslint/rule-tester";

import { readFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { createRuleTester } from "./ruleTester.js";

// eslint-disable-next-line unicorn/prefer-import-meta-properties -- import.meta.dirname is blocked by n/no-unsupported-features for the current Node engines range.
const currentDirectoryPath = path.dirname(fileURLToPath(import.meta.url));
const typedFixtureDirectoryPath: string = path.resolve(
    currentDirectoryPath,
    "..",
    "fixtures",
    "typed"
);

const createTypedRuleTester = (): RuleTester => createRuleTester();

const typedFixturePath = (fixtureName: string): string =>
    path.resolve(typedFixtureDirectoryPath, fixtureName);

const readTypedFixture = (fixtureName: string): string =>
    readFileSync(typedFixturePath(fixtureName), "utf8");

export {
    createTypedRuleTester,
    readTypedFixture,
    typedFixtureDirectoryPath,
    typedFixturePath,
};
