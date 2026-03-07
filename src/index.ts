import requireRule from "./rules/require.js";

const rules = {
  require: requireRule,
} as const;

const plugin = {
  meta: {
    name: "eslint-plugin-tsdoc-require",
    version: "0.1.0",
  },
  rules,
  configs: {} as Record<string, unknown>,
};

plugin.configs.recommended = {
  plugins: {
    "tsdoc-require": plugin,
  },
  rules: {
    "tsdoc-require/require": "error",
  },
};

export { rules };
export default plugin;
