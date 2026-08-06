import type { RuleTester } from "@typescript-eslint/rule-tester";

import { createRuleTester } from "./ruleTester.js";

const createTypedRuleTester = (): RuleTester => createRuleTester();

export { createTypedRuleTester };
