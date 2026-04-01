type FlatConfigRuleEntry =
    | "error"
    | "off"
    | "warn"
    | readonly ["error" | "off" | "warn", ...unknown[]];

type FlatConfig = {
    readonly rules?: Readonly<Record<string, FlatConfigRuleEntry | undefined>>;
};

type PluginModule = {
    readonly configs: {
        readonly all: FlatConfig;
        readonly detailed: FlatConfig;
        readonly jsdoc: FlatConfig;
        readonly packages: FlatConfig;
        readonly recommended: FlatConfig;
        readonly tsdoc: FlatConfig;
        readonly typedoc: FlatConfig;
        readonly "typedoc-strict": FlatConfig;
    };
};

type PresetDefinition = {
    readonly name: string;
    readonly purpose: string;
    readonly rules: readonly string[];
};

export type { FlatConfig, FlatConfigRuleEntry, PluginModule, PresetDefinition };
