/* eslint-disable vitest/expect-expect, vitest/no-hooks, vitest/require-top-level-describe, vitest/valid-describe-callback -- RuleTester integration bridge intentionally wires Vitest primitives without normal test-file structure. */
import { RuleTester } from "@typescript-eslint/rule-tester";
import {
    afterAll as vitestAfterAll,
    describe as vitestDescribe,
    test as vitestTest,
} from "vitest";

const vitestTestSkip = vitestTest.skip.bind(vitestTest);

RuleTester.afterAll = (callback): void => {
    vitestAfterAll(callback);
};

RuleTester.describe = (text, callback): void => {
    vitestDescribe(text, callback);
};

RuleTester.it = (text, callback): void => {
    vitestTest(text, callback);
};

RuleTester.itOnly = (text, callback): void => {
    vitestTest(text, callback);
};

RuleTester.itSkip = (text, callback): void => {
    vitestTestSkip(text, callback);
};

/* eslint-enable vitest/expect-expect, vitest/no-hooks, vitest/require-top-level-describe, vitest/valid-describe-callback -- Re-enable Vitest structural lint rules after wiring RuleTester hooks. */
