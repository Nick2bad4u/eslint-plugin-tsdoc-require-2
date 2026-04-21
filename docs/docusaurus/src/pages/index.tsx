import * as React from "react";

import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import GitHubStats from "../components/GitHubStats";
import styles from "./index.module.css";

type HeroStat = {
    readonly description: string;
    readonly headline: string;
    readonly icon: string;
};

type HomeCard = {
    readonly description: string;
    readonly icon: string;
    readonly title: string;
    readonly to: string;
};

const heroStats = [
    {
        description:
            "Core, required-tag, and restriction rules for real-world TS projects.",
        headline: "59 Rules",
        icon: "📏",
    },
    {
        description:
            "Ready-to-apply profiles from lightweight rollout to strict enforcement.",
        headline: "8 Presets",
        icon: "🎛️",
    },
    {
        description:
            "Clear examples and practical guidance for every supported rule.",
        headline: "Complete Docs",
        icon: "📚",
    },
] as const satisfies readonly HeroStat[];

const heroBadges = heroStats;

const homeCards = [
    {
        description:
            "Install the plugin, enable a preset, and start enforcing documentation quality rules.",
        icon: "\ueaf7",
        title: "Start with Overview",
        to: "/docs/getting-started/",
    },
    {
        description:
            "Compare preset intent from baseline recommendations to strict TypeDoc/TSDoc workflows.",
        icon: "\ueb77",
        title: "Compare Presets",
        to: "/docs/rules/presets/",
    },
    {
        description:
            "Browse every rule with concrete incorrect/correct examples and migration guidance.",
        icon: "\uf02d",
        title: "Rule Reference",
        to: "/docs/rules/",
    },
] as const satisfies readonly HomeCard[];

const homepageDescription =
    "Explore eslint-plugin-tsdoc-require-2 documentation, presets, and rule references for enforcing TSDoc and JSDoc quality in modern TypeScript projects.";

/**
 * Home page for the eslint-plugin-tsdoc-require-2 documentation site.
 *
 * @returns The rendered homepage layout with hero section, stats, and cards.
 */
export default function Home(): React.JSX.Element {
    return (
        <Layout
            description={homepageDescription}
            title="Type-safe ESLint rules for TSDoc and JSDoc"
        >
            <main className={styles.mainContent}>
                <section className={styles.heroBanner}>
                    <div className="container">
                        <div className={styles.heroGrid}>
                            <div className={styles.heroContent}>
                                <span className={styles.heroKicker}>
                                    eslint-plugin-tsdoc-require-2
                                </span>
                                <Heading as="h1" className={styles.heroTitle}>
                                    Enforce high-signal TSDoc and JSDoc
                                    standards.
                                </Heading>
                                <p className={styles.heroSubtitle}>
                                    Rules built for modern TypeScript projects,
                                    including
                                    <Link
                                        className={`${styles.heroInlineLink} ${styles.heroInlineLinkTSDoc}`}
                                        to="/docs/rules/require/"
                                    >
                                        require
                                    </Link>
                                    ,
                                    <Link
                                        className={`${styles.heroInlineLink} ${styles.heroInlineLinkRules}`}
                                        to="/docs/rules/required-tags/"
                                    >
                                        required-tags
                                    </Link>
                                    , and
                                    <Link
                                        className={`${styles.heroInlineLink} ${styles.heroInlineLinkRules}`}
                                        to="/docs/rules/restrict-tags/"
                                    >
                                        restrict-tags
                                    </Link>
                                    .
                                </p>

                                <div className={styles.heroActions}>
                                    <Link
                                        className={clsx(
                                            styles.heroActionButton,
                                            styles.heroActionPrimary
                                        )}
                                        to="/docs/getting-started/"
                                    >
                                        Start with Overview
                                    </Link>
                                    <Link
                                        className={clsx(
                                            styles.heroActionButton,
                                            styles.heroActionSecondary
                                        )}
                                        to="/docs/rules/presets/typedoc-strict/"
                                    >
                                        Compare Presets
                                    </Link>
                                </div>

                                <GitHubStats
                                    className={clsx(
                                        styles.heroLiveBadges,
                                        "github-stats"
                                    )}
                                />

                                <ul className={styles.heroBadgeRow}>
                                    {heroBadges.map((stat) => (
                                        <li
                                            className={styles.heroBadge}
                                            key={stat.headline}
                                        >
                                            <Heading
                                                as="h2"
                                                className={
                                                    styles.heroBadgeLabel
                                                }
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={
                                                        styles.heroBadgeIcon
                                                    }
                                                >
                                                    {stat.icon}
                                                </span>
                                                {stat.headline}
                                            </Heading>
                                            <p
                                                className={
                                                    styles.heroBadgeDescription
                                                }
                                            >
                                                {stat.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <aside className={styles.heroPanel}>
                                <img
                                    alt="eslint-plugin-tsdoc-require-2 logo"
                                    className={styles.heroPanelLogo}
                                    src="img/logo_512x512.png"
                                />
                            </aside>
                        </div>
                    </div>
                </section>

                <section className={clsx("container", styles.postHeroSection)}>
                    <Heading as="h2" className={styles.sectionTitle}>
                        Navigate the documentation quickly
                    </Heading>
                    <p className={styles.sectionSubtitle}>
                        Start with setup, then move into presets and rule-level
                        details.
                    </p>

                    <div className={styles.cardGrid}>
                        {homeCards.map((card) => (
                            <Link
                                className={styles.cardLink}
                                key={card.title}
                                to={card.to}
                            >
                                <article className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardIcon}>
                                            {card.icon}
                                        </span>
                                        <Heading
                                            as="h3"
                                            className={styles.cardTitle}
                                        >
                                            {card.title}
                                        </Heading>
                                    </div>
                                    <p className={styles.cardDescription}>
                                        {card.description}
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
