/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { evaluate } from "../evaluate";
import { parse } from "../parser";
import { env, standardEnv } from "../environment";

// step 3.0 - evaluate the syntax tree and compute a value for a given environment
describe("evaluate", () => {
    const environment = standardEnv(env);

    describe("atomic expressions", () => {
        it("returns a value for a number", () => {
            const exp = parse("1");
            expect(evaluate(exp, environment)).toEqual(1);
        });
        it("returns a value for a string", () => {
            const exp = parse('"hello"');
            expect(evaluate(exp, environment)).toEqual("hello");
        });
        it("returns a value for a boolean", () => {
            const exp = parse("true");
            expect(evaluate(exp, environment)).toEqual(true);
        });

        it("returns a value for a variable in the environment", () => {
            const exp = parse("+");
            const add = evaluate(exp, environment);
            expect(add(2, 2)).toEqual(4);
        });
        it("returns a value for a variable in the environment", () => {
            const exp = parse("nil");
            expect(evaluate(exp, environment)).toEqual(null);
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
            expect(() => {
                evaluate(exp, environment);
            }).toThrow();
        });
    });

    describe("procedure calls", () => {
        it("returns a number for an expression with arithmetic operator", () => {
            const exp = parse("(+ 2 2)");
            expect(evaluate(exp, environment)).toEqual(4);
        });
        it("returns a boolean for an expression with logical operator", () => {
            const exp = parse("(not 2)");
            expect(evaluate(exp, environment)).toEqual(false);
        });
        it("returns numbers in a list except the first", () => {
            const exp = parse("(rest 8 9 10)");
            expect(evaluate(exp, environment)).toEqual([9, 10]);
        });
        it("returns first number in a list", () => {
            const exp = parse("(first 8 9 10)");
            expect(evaluate(exp, environment)).toEqual(8);
        });
        it("returns last number in a list", () => {
            const exp = parse("(last 8 9 10)");
            expect(evaluate(exp, environment)).toEqual(10);
        });
    });

    describe("special", () => {
        describe("if", () => {
            it.only("takes question-expression then either evaluates second or third argument", () => {
                const exp = parse("(if 2 100 0)");
                expect(evaluate(exp, environment)).toEqual(100);
            });
            // it("takes question-expression then either evaluates second or third argument", () => {
            //     const exp = parse("(if (> 4 2) 100 0)");
            //     expect(evaluate(exp, environment)).toEqual(100);
            // });
        });
    });
});
