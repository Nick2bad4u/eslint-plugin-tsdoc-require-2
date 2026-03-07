import js from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

const tsFiles = ["**/*.ts"];

export default [
    {
        ignores: [
            "coverage/**",
            "dist/**",
            "node_modules/**",
            "temp/**",
        ],
    },
    js.configs.recommended,
    {
        files: tsFiles,
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tsEslintPlugin,
        },
        rules: {
            ...tsEslintPlugin.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
    {
        files: ["tests/**/*.ts"],
        languageOptions: {
            globals: {
                ...globals.node,
                afterAll: "readonly",
                beforeAll: "readonly",
                describe: "readonly",
                expect: "readonly",
                it: "readonly",
            },
        },
    },
    {
        files: ["**/*.mjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
    },
];
