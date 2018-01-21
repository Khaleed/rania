/**
 * Copyright (c) 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tokenize } from "./../rania";

// step 1.0 - break a program in the form of sequence of chars into tokens
describe("tokenize", () => {
    describe("atomic expressions", () => {
        it("tokenizes string", () => {
            expect(tokenize("hello")).toEqual(["hello"]);
        });
        it("tokenizes strings with space between them", () => {
            expect(tokenize("hello world")).toEqual(["hello", "world"]);
        });
        it("tokenizes number", () => {
            expect(tokenize("1")).toEqual(["1"]);
        });
    });
    describe("list expressions", () => {
        it("tokenizes an empty list", () => {
            expect(tokenize("()")).toEqual(["(", ")"]);
        });
        it("tokenizes lists with atomic experession", () => {
            expect(tokenize("(1)")).toEqual(["(", "1", ")"]); // number -> float
            expect(tokenize("(y)")).toEqual(["(", "y", ")"]); // symbol -> without '""'
            expect(tokenize('("hello")')).toEqual(["(", '"hello"', ")"]); // string -> with ""
        });
        it("tokenizes a list with sub lists", () => {
            expect(tokenize("(define sum(lambda (x y) (+ x y)))")).toEqual([
                "(",
                "define",
                "sum",
                "(",
                "lambda",
                "(",
                "x",
                "y",
                ")",
                "(",
                "+",
                "x",
                "y",
                ")",
                ")",
                ")"
            ]);
        });
    });
});
