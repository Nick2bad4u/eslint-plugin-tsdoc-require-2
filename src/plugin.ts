import requireRule from "./rules/require.js";

type Plugin = {
    configs: {
        recommended: RecommendedConfig;
    };
    meta: {
        name: string;
        version: string;
    };
    rules: {
        require: typeof requireRule;
    };
};

type RecommendedConfig = {
    plugins: Record<string, unknown>;
    rules: Record<string, "error">;
};

const rules: Plugin["rules"] = {
    require: requireRule,
};

const recommendedConfig: RecommendedConfig = {
    plugins: {},
    rules: {
        "tsdoc-require/require": "error",
    },
};

const plugin: Plugin = {
    configs: {
        recommended: recommendedConfig,
    },
    meta: {
        name: "eslint-plugin-tsdoc-require",
        version: "0.1.0",
    },
    rules,
};

recommendedConfig.plugins["tsdoc-require"] = plugin;

export { rules };
export default plugin;
