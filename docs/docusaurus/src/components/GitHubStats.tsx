import Link from "@docusaurus/Link";

import styles from "./GitHubStats.module.css";

interface GitHubStatsProps {
    readonly className?: string;
}

interface LiveBadge {
    readonly alt: string;
    readonly href: string;
    readonly src: string;
}

const liveBadges = [
    {
        alt: "npm license",
        href: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/blob/main/LICENSE",
        src: "https://flat.badgen.net/npm/license/eslint-plugin-tsdoc-require-2?color=purple",
    },
    {
        alt: "npm total downloads",
        href: "https://www.npmjs.com/package/eslint-plugin-tsdoc-require-2",
        src: "https://flat.badgen.net/npm/dt/eslint-plugin-tsdoc-require-2?color=pink",
    },
    {
        alt: "latest GitHub release",
        href: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/releases",
        src: "https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-tsdoc-require-2?color=cyan",
    },
    {
        alt: "GitHub stars",
        href: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/stargazers",
        src: "https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-tsdoc-require-2?color=yellow",
    },
    {
        alt: "GitHub forks",
        href: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/forks",
        src: "https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-tsdoc-require-2?color=green",
    },
    {
        alt: "GitHub open issues",
        href: "https://github.com/Nick2bad4u/eslint-plugin-tsdoc-require-2/issues",
        src: "https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-tsdoc-require-2?color=red",
    },
    {
        alt: "Codecov",
        href: "https://app.codecov.io/gh/Nick2bad4u/eslint-plugin-tsdoc-require-2",
        src: "https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-tsdoc-require-2?color=blue",
    },
] as const satisfies readonly LiveBadge[];

/**
 * Renders live repository, package, and mutation badges.
 *
 * @param props - Optional list class override.
 *
 * @returns Badge strip with links to package/repository metadata.
 */
export default function GitHubStats({ className = "" }: GitHubStatsProps) {
    const badgeListClassName = [styles.liveBadgeList, className]
        .filter(Boolean)
        .join(" ");

    return (
        <ul className={badgeListClassName}>
            {liveBadges.map((badge) => (
                <li className={styles.liveBadgeListItem} key={badge.src}>
                    <Link
                        className={styles.liveBadgeAnchor}
                        href={badge.href}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img
                            alt={badge.alt}
                            className={styles.liveBadgeImage}
                            decoding="async"
                            loading="lazy"
                            src={badge.src}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
