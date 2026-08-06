import type { UnknownArray } from "type-fest";

import { ESLintUtils, type TSESLint } from "@typescript-eslint/utils";

/** Rule creator signature extended with ESLint 10 language metadata. */
type RuleCreatorWithLanguages<PluginDocs> = <
    Options extends Readonly<UnknownArray>,
    MessageIds extends string,
>(
    definition: Readonly<RuleDefinition<Options, MessageIds, PluginDocs>>
) => TSESLint.RuleModule<MessageIds, Options, PluginDocs>;

interface RuleDefinition<
    Options extends Readonly<UnknownArray>,
    MessageIds extends string,
    PluginDocs,
> {
    readonly create: (
        context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
        optionsWithDefault: Readonly<Options>
    ) => TSESLint.RuleListener;
    readonly meta: RuleMetaWithLanguages<MessageIds, PluginDocs, Options>;
    readonly name: string;
}

type RuleMetaWithLanguages<
    MessageIds extends string,
    PluginDocs,
    Options extends Readonly<UnknownArray>,
> = TSESLint.RuleMetaData<MessageIds, PluginDocs, Options> & {
    readonly docs: NonNullable<
        TSESLint.RuleMetaData<MessageIds, PluginDocs, Options>["docs"]
    >;
    readonly languages: readonly string[];
};

/**
 * Create a typed rule factory that includes ESLint 10 language metadata.
 *
 * `@typescript-eslint/utils` does not yet expose `meta.languages` in its rule
 * creator types, even though ESLint 10 supports and recommends the field.
 * Keeping the compatibility boundary here avoids casts in every rule module.
 *
 * @param urlCreator - Produces the documentation URL for a rule name.
 *
 * @returns Rule creator accepting ESLint 10 language metadata.
 */
const createRuleCreator = <PluginDocs>(
    urlCreator: (ruleName: string) => string
): RuleCreatorWithLanguages<PluginDocs> => {
    const ruleCreator = ESLintUtils.RuleCreator;
    const upstreamCreateRule = ruleCreator<PluginDocs>(urlCreator);

    return <Options extends Readonly<UnknownArray>, MessageIds extends string>(
        definition: Readonly<RuleDefinition<Options, MessageIds, PluginDocs>>
    ): TSESLint.RuleModule<MessageIds, Options, PluginDocs> =>
        upstreamCreateRule(definition);
};

export type { RuleCreatorWithLanguages };
export { createRuleCreator };
