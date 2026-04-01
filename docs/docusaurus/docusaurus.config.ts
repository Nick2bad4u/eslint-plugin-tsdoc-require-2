import { themes as prismThemes } from "prism-react-renderer";

import type { Config, PluginModule } from "@docusaurus/types";
import type { Options as DocsPluginOptions } from "@docusaurus/plugin-content-docs";
import type * as Preset from "@docusaurus/preset-classic";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/** Route base path where docs site is deployed (GitHub Pages project path). */
const baseUrl =
    process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-tsdoc-require-2/";
/** Opt-in flag for experimental Docusaurus performance features. */
const enableExperimentalFaster =
    process.env["DOCUSAURUS_ENABLE_EXPERIMENTAL"] === "true";

/** GitHub organization used for edit links and project metadata. */
const organizationName = "Nick2bad4u";
/** Repository name used for edit links and project metadata. */
const projectName = "eslint-plugin-tsdoc-require-2";
/** Public origin for the published documentation site. */
const siteOrigin = "https://nick2bad4u.github.io";
/** Canonical public site URL including the GitHub Pages project path. */
const siteUrl = `${siteOrigin}${baseUrl}`;
/** Global site description used for SEO and social cards. */
const siteDescription =
    "Type-safe ESLint rules for enforcing TSDoc/JSDoc documentation requirements in modern TypeScript codebases.";
/** Social preview image used for Open Graph and Twitter cards. */
const socialCardImagePath = "img/logo.png";
/** Absolute social preview image URL. */
const socialCardImageUrl = new URL(socialCardImagePath, siteUrl).toString();
/** Client module path for runtime DOM enhancement bootstrap script. */
const modernEnhancementsClientModule = fileURLToPath(
    new URL("src/js/modernEnhancements.ts", import.meta.url)
);

/** PWA theme-color meta value for Chromium-based browsers. */
const pwaThemeColor = "#052e16";
/** Windows tile color for pinned-site metadata. */
const pwaTileColor = "#052e16";
/** Safari pinned-tab mask icon color. */
const pwaMaskIconColor = "#22c55e";
/** Footer copyright HTML used by the site theme config. */
const footerCopyright =
    `© ${new Date().getFullYear()} ` +
    '<a href="https://github.com/Nick2bad4u/" target="_blank" rel="noopener noreferrer">Nick2bad4u</a> 💻 Built with ' +
    '<a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">🦖 Docusaurus</a>.';

/** Obfuscated key for the v4 legacy post-build head attribute removal flag. */
const removeHeadAttrFlagKey = [
    "remove",
    "Le",
    "gacyPostBuildHeadAttribute",
].join("");

/** Local require helper rooted at the docs workspace config file location. */
const requireFromDocsWorkspace = createRequire(import.meta.url);

/** Resolve an optional module specifier without throwing when absent. */
const resolveOptionalModule = (moduleSpecifier: string): string | undefined => {
    try {
        return requireFromDocsWorkspace.resolve(moduleSpecifier);
    } catch {
        return undefined;
    }
};

/**
 * Optional ESM entry used to avoid webpack warnings from VS Code language
 * service packages.
 */
const vscodeCssLanguageServiceEsmEntry = resolveOptionalModule(
    "vscode-css-languageservice/lib/esm/cssLanguageService.js"
);
/**
 * Optional ESM entry used to avoid webpack warnings from VS Code language
 * server type packages.
 */
const vscodeLanguageServerTypesEsmEntry = resolveOptionalModule(
    "vscode-languageserver-types/lib/esm/main.js"
);

/**
 * Alias VS Code language-service packages to their ESM entries when they are
 * present.
 *
 * @remarks
 * Some transitive editor-style dependencies resolve the UMD build of
 * `vscode-languageserver-types`, which causes noisy webpack critical-dependency
 * warnings inside Docusaurus. This plugin only activates when those optional
 * packages are actually installed in the current workspace.
 */
const suppressKnownWebpackWarningsPlugin: PluginModule = () => {
    if (
        vscodeCssLanguageServiceEsmEntry === undefined ||
        vscodeLanguageServerTypesEsmEntry === undefined
    ) {
        return null;
    }

    return {
        configureWebpack() {
            return {
                ignoreWarnings: [
                    {
                        message:
                            /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/u,
                        module: /vscode-languageserver-types[\\/]lib[\\/]umd[\\/]main\.js/u,
                    },
                ],
                resolve: {
                    alias: {
                        "vscode-css-languageservice$":
                            vscodeCssLanguageServiceEsmEntry,
                        "vscode-languageserver-types$":
                            vscodeLanguageServerTypesEsmEntry,
                    },
                },
            };
        },
        name: "suppress-known-webpack-warnings",
    };
};

/** Docusaurus future flags, including optional experimental fast path. */
const futureConfig = {
    ...(enableExperimentalFaster
        ? {
              experimental_faster: {
                  mdxCrossCompilerCache: true,
                  rspackBundler: true,
                  rspackPersistentCache: true,
                  ssgWorkerThreads: true,
              },
          }
        : {}),
    v4: {
        [removeHeadAttrFlagKey]: true,
        // NOTE: Enabling cascade layers currently breaks our production CSS output
        // (CssMinimizer parsing errors -> large chunks of CSS dropped), which
        // makes many Infima (--ifm-*) variables undefined across the site.
        // Re-enable only after verifying the build output CSS is valid.
        useCssCascadeLayers: false,
    },
} satisfies Config["future"];

/** Full Docusaurus site configuration exported to the build/runtime. */
const config: Config = {
    baseUrl,
    baseUrlIssueBanner: true,
    deploymentBranch: "gh-pages",
    favicon: "img/logo.svg",
    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: futureConfig,
    clientModules: [modernEnhancementsClientModule],
    headTags: [
        {
            attributes: {
                href: siteOrigin,
                rel: "preconnect",
            },
            tagName: "link",
        },
        {
            attributes: {
                href: "https://github.com",
                rel: "preconnect",
            },
            tagName: "link",
        },
        {
            attributes: {
                type: "application/ld+json",
            },
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                description: siteDescription,
                image: socialCardImageUrl,
                name: "eslint-plugin-tsdoc-require-2",
                publisher: {
                    "@type": "Person",
                    name: "Nick2bad4u",
                    url: "https://github.com/Nick2bad4u",
                },
                url: siteUrl,
            }),
            tagName: "script",
        },
    ],
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    markdown: {
        anchors: {
            maintainCase: true,
        },
        emoji: true,
        format: "detect",
        hooks: {
            onBrokenMarkdownImages: "warn",
            onBrokenMarkdownLinks: "warn",
        },
        mermaid: true,
    },
    noIndex: false,
    onBrokenAnchors: "warn",
    onBrokenLinks: "warn",
    onDuplicateRoutes: "warn",
    organizationName,
    plugins: [
        suppressKnownWebpackWarningsPlugin,
        "docusaurus-plugin-image-zoom",
        [
            "@docusaurus/plugin-pwa",
            {
                debug: process.env["DOCUSAURUS_PWA_DEBUG"] === "true",
                offlineModeActivationStrategies: [
                    "appInstalled",
                    "standalone",
                    "queryString",
                ],
                pwaHead: [
                    {
                        href: `${baseUrl}manifest.json`,
                        rel: "manifest",
                        tagName: "link",
                    },
                    {
                        content: pwaThemeColor,
                        name: "theme-color",
                        tagName: "meta",
                    },
                    {
                        content: "yes",
                        name: "apple-mobile-web-app-capable",
                        tagName: "meta",
                    },
                    {
                        content: "default",
                        name: "apple-mobile-web-app-status-bar-style",
                        tagName: "meta",
                    },
                    {
                        href: `${baseUrl}img/icon-192.png`,
                        rel: "apple-touch-icon",
                        tagName: "link",
                    },
                    {
                        color: pwaMaskIconColor,
                        href: `${baseUrl}img/icon-512.svg`,
                        rel: "mask-icon",
                        tagName: "link",
                    },
                    {
                        content: `${baseUrl}img/icon-192.png`,
                        name: "msapplication-TileImage",
                        tagName: "meta",
                    },
                    {
                        content: pwaTileColor,
                        name: "msapplication-TileColor",
                        tagName: "meta",
                    },
                ],
            },
        ],
        [
            "@docusaurus/plugin-content-docs",
            {
                editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/`,
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                showLastUpdateAuthor: true,
                showLastUpdateTime: true,
                sidebarPath: "./sidebars.rules.ts",
            } satisfies DocsPluginOptions,
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: {
                    blogDescription:
                        "Updates, architecture notes, and practical guidance for eslint-plugin-tsdoc-require-2 users.",
                    blogSidebarCount: "ALL",
                    blogSidebarTitle: "All posts",
                    blogTitle: "eslint-plugin-tsdoc-require-2 Blog",
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    onInlineAuthors: "warn",
                    onInlineTags: "warn",
                    onUntruncatedBlogPosts: "warn",
                    path: "blog",
                    postsPerPage: 10,
                    routeBasePath: "blog",
                    showReadingTime: true,
                },
                docs: {
                    breadcrumbs: true,
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    path: "site-docs",
                    includeCurrentVersion: true,
                    onInlineTags: "ignore",
                    routeBasePath: "docs",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    sidebarCollapsed: true,
                    sidebarCollapsible: true,
                    sidebarPath: "./sidebars.ts",
                },
                googleTagManager: {
                    containerId: "GTM-T8J6HPLF",
                },
                gtag: {
                    trackingID: "G-18DR1S6R1T",
                },
                pages: {
                    editUrl: `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`,
                    exclude: [
                        // Declarations (often generated next to CSS modules)
                        // must never become routable pages.
                        "**/*.d.ts",
                        "**/*.d.tsx",
                        "**/__tests__/**",
                        "**/*.test.{js,jsx,ts,tsx}",
                        "**/*.spec.{js,jsx,ts,tsx}",
                    ],
                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
                    mdxPageComponent: "@theme/MDXPage",
                    path: "src/pages",
                    routeBasePath: "/",
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                },
                debug:
                    process.env["DOCUSAURUS_PRESET_CLASSIC_DEBUG"] === "true",
                sitemap: {
                    filename: "sitemap.xml",
                    ignorePatterns: ["/tests/**"],
                    lastmod: "datetime",
                },
                svgr: {
                    svgrConfig: {
                        dimensions: false, // Remove width/height so CSS controls size
                        expandProps: "start", // Spread props at the start: <svg {...props}>
                        icon: true, // Treat SVGs as icons (scales via viewBox)
                        memo: true, // Wrap component with React.memo
                        native: false, // Produce web React components (not React Native)
                        prettier: true, // Run Prettier on output
                        prettierConfig: "../../.prettierrc",
                        replaceAttrValues: {
                            "#000": "currentColor",
                            "#000000": "currentColor",
                        }, // Inherit color
                        svgo: true, // Enable SVGO optimizations
                        svgoConfig: {
                            plugins: [
                                { active: false, name: "removeViewBox" }, // Keep viewBox for scalability
                            ],
                        },
                        svgProps: { focusable: "false", role: "img" }, // Default SVG props
                        titleProp: true, // Allow passing a title prop for accessibility
                        typescript: true, // Generate TypeScript-friendly output (.tsx)
                    },
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    projectName,
    tagline:
        "Type-safe ESLint rules for requiring and validating TSDoc/JSDoc comments.",
    themeConfig: {
        colorMode: {
            defaultMode: "dark",
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        metadata: [
            {
                content:
                    "eslint, eslint-plugin, tsdoc, jsdoc, typescript, flat config, static analysis",
                name: "keywords",
            },
            {
                content: "summary_large_image",
                name: "twitter:card",
            },
            {
                content: "eslint-plugin-tsdoc-require-2",
                property: "og:site_name",
            },
            {
                content: socialCardImageUrl,
                property: "og:image",
            },
            {
                content: socialCardImageUrl,
                name: "twitter:image",
            },
        ],
        footer: {
            copyright: footerCopyright,
            links: [
                {
                    items: [
                        {
                            label: "🏁 Overview",
                            to: "/docs/",
                        },
                        {
                            label: "📖 Getting Started",
                            to: "/docs/getting-started/",
                        },
                        {
                            label: "🛠️ Presets",
                            to: "/docs/rules/presets/",
                        },
                        {
                            label: "📏 Rule Reference",
                            to: "/docs/rules/",
                        },
                    ],
                    title: "📚 Explore",
                },
                {
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}/releases`,
                            label: "\ueb09 Releases",
                        },
                        {
                            href: `https://nick2bad4u.github.io/eslint-plugin-tsdoc-require-2/eslint-inspector/`,
                            label: "\ue7d2 ESLint Inspector",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "\ue616 NPM",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/blob/main/docs/rules/restrict-tags.md`,
                            label: "\uf071 restrict-tags",
                        },
                    ],
                    title: "📁 Project",
                },
                {
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}`,
                            label: "\uea84 GitHub Repository",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/issues`,
                            label: "\uf188 Report Issues",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "\ue616 NPM",
                        },
                    ],
                    title: "⚙️ Support",
                },
            ],
            logo: {
                alt: "eslint-plugin-tsdoc-require-2 logo",
                href: `https://github.com/${organizationName}/${projectName}`,
                src: "img/logo.svg",
                width: 60,
                height: 60,
            },
            style: "dark",
        },
        image: socialCardImagePath,
        navbar: {
            style: "dark",
            hideOnScroll: true,
            items: [
                {
                    activeBaseRegex: "^/docs(?:/)?$",
                    label: "📚 Docs",
                    position: "left",
                    to: "/docs/",
                    type: "dropdown",
                    items: [
                        {
                            label: "• Overview",
                            to: "/docs/",
                        },
                        {
                            label: "• Getting Started",
                            to: "/docs/getting-started/",
                        },
                    ],
                },
                {
                    activeBaseRegex: "^/docs/rules(?:/(?!presets(?:/|$)).*)?$",
                    label: "📜 Rules",
                    position: "left",
                    to: "/docs/rules/",
                    type: "dropdown",
                    items: [
                        {
                            label: "• Rule Reference",
                            to: "/docs/rules/",
                        },
                        {
                            label: "• require",
                            to: "/docs/rules/require/",
                        },
                        {
                            label: "• required-tags",
                            to: "/docs/rules/required-tags/",
                        },
                    ],
                },
                {
                    activeBaseRegex: "^/docs/rules/presets(?:/.*)?$",
                    label: "🛠️ Presets",
                    position: "left",
                    to: "/docs/rules/presets/",
                    type: "dropdown",
                    items: [
                        {
                            label: "• Preset Reference",
                            to: "/docs/rules/presets/",
                        },
                        {
                            label: "🟡 recommended",
                            to: "/docs/rules/presets/recommended/",
                        },
                        {
                            label: "🔵 detailed",
                            to: "/docs/rules/presets/detailed/",
                        },
                        {
                            label: "🟣 packages",
                            to: "/docs/rules/presets/packages/",
                        },
                        {
                            label: "🟢 typedoc",
                            to: "/docs/rules/presets/typedoc/",
                        },
                        {
                            label: "🟢 typedoc-strict",
                            to: "/docs/rules/presets/typedoc-strict/",
                        },
                        {
                            label: "🟦 tsdoc",
                            to: "/docs/rules/presets/tsdoc/",
                        },
                        {
                            label: "🟧 jsdoc",
                            to: "/docs/rules/presets/jsdoc/",
                        },
                        {
                            label: "🟥 all",
                            to: "/docs/rules/presets/all/",
                        },
                    ],
                },
                {
                    href: `https://github.com/${organizationName}/${projectName}`,
                    label: "\ue65b GitHub",
                    position: "right",
                    type: "dropdown",
                    items: [
                        {
                            href: `https://github.com/${organizationName}/${projectName}`,
                            label: "• \ue709 GitHub",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "• \ue616 NPM",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/releases`,
                            className: "navbar-dropdown-divider-before",
                            label: "• \ueb09 Releases",
                        },
                        {
                            href: `https://nick2bad4u.github.io/eslint-plugin-tsdoc-require-2/eslint-inspector/`,
                            label: "• \ue7d2 ESLint Inspector",
                        },
                        {
                            href: `https://github.com/${organizationName}/${projectName}/issues`,
                            className: "navbar-dropdown-divider-before",
                            label: "• \uf188 Issues",
                        },
                        {
                            href: `https://www.npmjs.com/package/${projectName}`,
                            label: "• \ue616 NPM",
                        },
                    ],
                },
                {
                    label: "\udb80\ude19 Dev",
                    position: "right",
                    to: "/docs/developer/",
                    type: "dropdown",
                    items: [
                        {
                            label: "• Development Guide",
                            to: "/docs/developer/",
                        },
                        {
                            label: "• API Reference",
                            to: "/docs/developer/api/",
                        },
                        {
                            label: "• Docusaurus Site Contract",
                            to: "/docs/developer/docusaurus-site-contract/",
                        },
                    ],
                },
            ],
            logo: {
                alt: "eslint-plugin-tsdoc-require-2 logo",
                height: 48,
                href: baseUrl,
                src: "img/logo.svg",
                width: 48,
            },
            title: "eslint-plugin-tsdoc-require-2",
        },
        prism: {
            additionalLanguages: [
                "bash",
                "json",
                "yaml",
                "typescript",
            ],
            darkTheme: prismThemes.dracula,
            defaultLanguage: "typescript",
            theme: prismThemes.github,
        },
        tableOfContents: {
            maxHeadingLevel: 4,
            minHeadingLevel: 2,
        },
        zoom: {
            background: {
                dark: "rgb(50, 50, 50)",
                light: "rgb(255, 255, 255)",
            },
            config: {
                // Options you can specify via https://github.com/francoischalifour/medium-zoom#usage
            },
            selector: ".markdown > img",
        },
    } satisfies Preset.ThemeConfig,
    themes: [
        "@docusaurus/theme-mermaid",
        [
            "@easyops-cn/docusaurus-search-local",
            {
                blogDir: "blog",
                blogRouteBasePath: "blog",
                docsDir: "docs",
                docsRouteBasePath: "docs",
                explicitSearchResultPath: false,
                forceIgnoreNoIndex: true,
                fuzzyMatchingDistance: 1,
                hashed: true,
                hideSearchBarWithNoSearchContext: false,
                highlightSearchTermsOnTargetPage: true,
                indexBlog: true,
                indexDocs: true,
                indexPages: false,
                language: ["en"],
                removeDefaultStemmer: true,
                removeDefaultStopWordFilter: false,
                searchBarPosition: "left",
                searchBarShortcut: true,
                searchBarShortcutHint: true,
                searchBarShortcutKeymap: "ctrl+k",
                searchResultContextMaxLength: 96,
                searchResultLimits: 8,
                useAllContextsWithNoSearchContext: false,
            },
        ],
    ],
    title: "eslint-plugin-tsdoc-require-2",
    trailingSlash: false,
    url: siteOrigin,
};

export default config;
