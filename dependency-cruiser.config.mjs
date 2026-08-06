/** @type {import("dependency-cruiser").IConfiguration} */
const dependencyCruiserConfig = {
    forbidden: [
        {
            comment:
                "Circular module relationships make initialization order and refactoring unsafe.",
            from: {},
            name: "no-circular",
            severity: "error",
            to: {
                circular: true,
            },
        },
        {
            comment: "Every source import must resolve to a concrete module.",
            from: {},
            name: "no-unresolvable",
            severity: "error",
            to: {
                couldNotResolve: true,
            },
        },
    ],
    options: {
        doNotFollow: {
            path: "node_modules",
        },
        includeOnly: "^src",
        tsConfig: {
            fileName: "tsconfig.json",
        },
    },
};

export default dependencyCruiserConfig;
