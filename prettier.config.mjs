import prettierConfig from "prettier-config-nick2bad4u";

/** @type {import("prettier").Config} */
const localConfig = {
    ...prettierConfig,
    overrides: [
        ...(prettierConfig.overrides ?? []),
        {
            files: [
                "*.ps1",
                "*.psm1",
                "*.psd1",
            ],
            options: { endOfLine: "crlf" },
        },
    ],
};

export default localConfig;
