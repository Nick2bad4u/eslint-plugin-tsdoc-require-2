---
slug: /
title: Rules
description: Explore the comprehensive set of rules provided by eslint-plugin-tsdoc-require-2 to enforce TSDoc/JSDoc documentation standards in your TypeScript codebase.
---

# Rules

`eslint-plugin-tsdoc-require-2` provides a robust, highly configurable set of rules to enforce TSDoc/JSDoc comments and specific documentation tags on TypeScript declarations.

The rules are divided into three primary modules, designed to be used together to cover documentation completeness, structural consistency, and tag restrictions.

- [**`require`**](./require.md): Enforces that targeted declarations have TSDoc/JSDoc block comments.
- [**`required-tags`**](./required-tags.md): A composite rule engine that groups over 50 specific tag checks under one unified rule. It runs each enabled tag rule (`require-param`, `require-returns`, etc.) on valid AST blocks.
- [**`restrict-tags`**](./restrict-tags.md): A rule that allows you to deny or allow-list specific TSDoc/JSDoc tags, preventing use of unsupported or non-standard tags across your codebase.

For preset guidance, see [Presets](./presets/index.md).

To configure the plugin quickly, see [Getting Started](./getting-started.md).
