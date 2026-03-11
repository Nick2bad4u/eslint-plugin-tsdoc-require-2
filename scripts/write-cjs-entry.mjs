import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import typescript from "typescript";

const workspaceRootPath = fileURLToPath(new URL("..", import.meta.url));
const distDirectoryPath = path.join(workspaceRootPath, "dist");

const relativeJSImportPattern = /require\((['"])(\.[^'"]*?)\.js\1\)/gu;

/**
 * @param {readonly typescript.Diagnostic[]} diagnostics
 *
 * @returns {string}
 */
const formatDiagnostics = (diagnostics) => {
    /** @type {typescript.FormatDiagnosticsHost} */
    const host = {
        /** @param {string} fileName */
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => "\n",
    };

    return typescript.formatDiagnosticsWithColorAndContext(
        [...diagnostics],
        host
    );
};

/**
 * @param {string} directoryPath
 *
 * @returns {Promise<string[]>}
 */
const collectJavaScriptFiles = async (directoryPath) => {
    const directoryEntries = await readdir(directoryPath, {
        withFileTypes: true,
    });

    const nestedFilePaths = await Promise.all(
        directoryEntries.map(async (directoryEntry) => {
            const entryPath = path.join(directoryPath, directoryEntry.name);

            if (directoryEntry.isDirectory()) {
                return collectJavaScriptFiles(entryPath);
            }

            if (directoryEntry.isFile() && entryPath.endsWith(".js")) {
                return [entryPath];
            }

            return [];
        })
    );

    return nestedFilePaths.flat();
};

/**
 * @param {string} inputFilePath
 *
 * @returns {Promise<string>}
 */
const transpileToCjs = async (inputFilePath) => {
    const sourceText = await readFile(inputFilePath, "utf8");
    const { diagnostics, outputText } = typescript.transpileModule(sourceText, {
        compilerOptions: {
            allowJs: true,
            module: typescript.ModuleKind.CommonJS,
            newLine: typescript.NewLineKind.LineFeed,
            sourceMap: false,
            target: typescript.ScriptTarget.ES2024,
        },
        fileName: inputFilePath,
        reportDiagnostics: true,
    });

    if (diagnostics !== undefined && diagnostics.length > 0) {
        throw new Error(formatDiagnostics(diagnostics));
    }

    const outputFilePath = inputFilePath.replace(/\.js$/u, ".cjs");
    const rewrittenOutputText = outputText.replace(
        relativeJSImportPattern,
        (_matchedText, quoteCharacter, importPathWithoutExtension) =>
            `require(${quoteCharacter}${importPathWithoutExtension}.cjs${quoteCharacter})`
    );

    const isPluginEntryFile =
        inputFilePath === path.join(distDirectoryPath, "plugin.js");
    const pluginEntryCommonJsFooter = isPluginEntryFile
        ? `

if (typeof exports.default !== "undefined") {
    module.exports = exports.default;
    module.exports.default = exports.default;
}

if (typeof exports.rules !== "undefined") {
    module.exports.rules = exports.rules;
}
`
        : "";

    await writeFile(
        outputFilePath,
        `${rewrittenOutputText}${pluginEntryCommonJsFooter}`,
        "utf8"
    );

    return outputFilePath;
};

/**
 * @returns {Promise<string>}
 */
const writePluginDeclarationBridge = async () => {
    const declarationBridgePath = path.join(distDirectoryPath, "plugin.d.cts");
    const declarationBridgeSource = `import plugin from "./plugin.js";

export = plugin;
`;

    await writeFile(declarationBridgePath, declarationBridgeSource, "utf8");

    return declarationBridgePath;
};

const run = async () => {
    await mkdir(distDirectoryPath, { recursive: true });

    const emittedJavaScriptFiles =
        await collectJavaScriptFiles(distDirectoryPath);
    if (emittedJavaScriptFiles.length === 0) {
        throw new Error("No emitted JavaScript files were found under dist/.");
    }

    const generatedCjsFiles = await Promise.all(
        emittedJavaScriptFiles.map((emittedJavaScriptFilePath) =>
            transpileToCjs(emittedJavaScriptFilePath)
        )
    );

    const declarationBridgePath = await writePluginDeclarationBridge();
    const pluginCjsPath = path.join(distDirectoryPath, "plugin.cjs");

    const generatedFileCount = generatedCjsFiles.length + 1;
    console.log(`Generated ${generatedFileCount} CJS compatibility files.`);
    console.log(`- ${pluginCjsPath}`);
    console.log(`- ${declarationBridgePath}`);
    for (const generatedCjsFilePath of generatedCjsFiles) {
        console.log(`- ${generatedCjsFilePath}`);
    }
};

run().catch((error) => {
    const errorMessage =
        error instanceof Error ? (error.stack ?? error.message) : String(error);
    console.error(`[write-cjs-entry] ${errorMessage}`);
    process.exitCode = 1;
});
