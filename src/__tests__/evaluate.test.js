/**
 * Copyright (c) 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { evaluate } from "../evaluate";
import { parse } from "../rania";
import { env, standardEnv } from "../environment";

// step 3.0 - evaluate the syntax tree and compute a value for a given environment
describe("evaluate", () => {
    const environment = standardEnv(env);

    describe("atomic expressions", () => {
        it("computes a value for a number", () => {
            const exp = parse("1");
            expect(evaluate(exp, environment)).toEqual(1);
        });
        it("computes a value for a string", () => {
            const exp = parse('"hello"');
            expect(evaluate(exp, environment)).toEqual("hello");
        });
        it("returns a value for a variable in the environment", () => {
            const exp = parse("+");
            const add = evaluate(exp, environment);
            expect(add(2, 2)).toEqual(4);
        });
        it("returns undefined for a variable that is not in the environment", () => {
            const exp = parse("map");
            expect(evaluate(exp, environment)).toBeUndefined();
        });
    });

    describe("list expressions", () => {
        it("returns an empty list", () => {
            const exp = parse("()");
            expect(evaluate(exp, environment)).toEqual([]);
        });
        it("returns a list with a number", () => {
            const exp = parse("(1)");
            expect(evaluate(exp, environment)).toEqual([1]);
        });
        it("returns a list with numbers", () => {
            const exp = parse("(2 4 6)");
            expect(evaluate(exp, environment)).toEqual([2, 4, 6]);
        });
        it("returns a list with a string", () => {
            const exp = parse('("hi")');
            expect(evaluate(exp, environment)).toEqual(["hi"]);
        });
        it("returns a list with several strings", () => {
            const exp = parse('("yo!" "what" "up")');
            expect(evaluate(exp, environment)).toEqual(["yo!", "what", "up"]);
        });
    });
});
