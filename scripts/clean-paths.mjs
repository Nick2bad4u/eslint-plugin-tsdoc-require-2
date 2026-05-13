import { rm } from "node:fs/promises";
import process from "node:process";

import { glob } from "tinyglobby";

const globMagicPattern = /[*?[\]{}()!]/u;

/**
 * @param {string} _match
 * @param {string} name
 *
 * @returns {string}
 */
const resolveEnvironmentValue = (_match, name) => process.env[name] ?? "";

/**
 * @param {string} value
 *
 * @returns {string}
 */
const expandEnvironmentVariables = (value) =>
    value.replaceAll(/%([^%]+)%/gu, resolveEnvironmentValue);

/**
 * @param {string} value
 *
 * @returns {boolean}
 */
const hasGlobMagic = (value) => globMagicPattern.test(value);

/**
 * @param {string} target
 *
 * @returns {void}
 *
 * @throws {Error} When the target points to an unsafe root-like path.
 */
const assertSafeRemovalTarget = (target) => {
    const normalizedTarget = target.trim();
    if (
        normalizedTarget === "" ||
        normalizedTarget === "." ||
        normalizedTarget === "/" ||
        normalizedTarget === "\\"
    ) {
        throw new Error(`Refusing to remove unsafe target: "${target}"`);
    }
};

/**
 * @param {string} target
 *
 * @returns {Promise<void>}
 */
const removeTarget = async (target) => {
    assertSafeRemovalTarget(target);
    await rm(target, {
        force: true,
        maxRetries: 3,
        recursive: true,
        retryDelay: 75,
    });
};

/**
 * @param {string} rawTarget
 *
 * @returns {Promise<readonly string[]>}
 */
const resolveTargets = async (rawTarget) => {
    const expandedTarget = expandEnvironmentVariables(rawTarget);
    if (!hasGlobMagic(expandedTarget)) {
        return [expandedTarget];
    }

    return glob(expandedTarget, {
        dot: true,
        expandDirectories: false,
        followSymbolicLinks: false,
        onlyDirectories: false,
        onlyFiles: false,
    });
};

const main = async () => {
    const rawTargets = process.argv.slice(2);
    for (const rawTarget of rawTargets) {
        const resolvedTargets = await resolveTargets(rawTarget);
        if (resolvedTargets.length === 0 && !hasGlobMagic(rawTarget)) {
            await removeTarget(rawTarget);
            continue;
        }

        for (const target of resolvedTargets) {
            await removeTarget(target);
        }
    }
};

await main();
