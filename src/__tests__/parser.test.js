/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { tokenize, atom, parseExpression, parse } from "./../parser";

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
        it("tokenizes lists with atomic expression", () => {
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

// step 2.1 - translate atomic expression into a syntax object
describe("atom", () => {
    it("returns syntax object for a Number", () => {
        expect(atom("1")).toEqual({ type: "number", value: 1 });
    });
    it("returns syntax object for a String", () => {
        expect(atom('"hello world"')).toEqual({
            type: "string",
            value: "hello world"
        });
    });
    it("returns syntax object for a Symbol", () => {
        expect(atom(">")).toEqual({ type: "symbol", value: ">" });
    });
});

// step 2.2 - translate expressions into an abstract syntax tree
describe("parseExpression", () => {
    it("throws an error when user types incorrect syntax", () => {
        expect(() => {
            parseExpression([]);
        }).toThrow();
    });
    it("throws an error when user types incorrect syntax", () => {
        expect(() => {
            parseExpression([")", "1", ")"]);
        }).toThrow();
    });
    it("returns syntax tree for a list expression", () => {
        expect(parseExpression(["(", "1", ")"])).toEqual([
            {
                type: "number",
                value: 1
            }
        ]);
    });
    it("returns syntax tree for a list expression", () => {
        expect(parseExpression(["(", "+", "2", "2", ")"])).toEqual([
            {
                type: "symbol",
                value: "+"
            },
            {
                type: "number",
                value: 2
            },
            {
                type: "number",
                value: 2
            }
        ]);
    });
    it("returns syntax tree for a list expression", () => {
        expect(
            parseExpression(["(", "+", "(", "+", "1", "2", ")", "3", ")"])
        ).toEqual([
            { type: "symbol", value: "+" },
            [
                { type: "symbol", value: "+" },
                { type: "number", value: 1 },
                { type: "number", value: 2 }
            ],
            { type: "number", value: 3 }
        ]);
    });
    it("returns syntax tree for a list expression", () => {
        expect(
            parseExpression([
                "(",
                "define",
                "(",
                "sum",
                "x",
                "y",
                ")",
                "(",
                "+",
                "x",
                "y",
                ")",
                ")"
            ])
        ).toEqual([
            { type: "symbol", value: "define" },
            [
                { type: "symbol", value: "sum" },
                { type: "symbol", value: "x" },
                { type: "symbol", value: "y" }
            ],
            [
                { type: "symbol", value: "+" },
                { type: "symbol", value: "x" },
                { type: "symbol", value: "y" }
            ]
        ]);
    });
});

// parse is composed from tokenize and parseExpression - see above tests for those functions
describe("parse", () => {
    it("returns syntax tree for a program in the form of a sequence of characters", () => {
        expect(parse("(1)")).toEqual([{ type: "number", value: 1 }]);
    });
    it("returns syntax tree for a program in the form of a sequence of characters", () => {
        expect(parse("(+ (* 2 3) 4)")).toEqual([
            { type: "symbol", value: "+" },
            [
                { type: "symbol", value: "*" },
                { type: "number", value: 2 },
                { type: "number", value: 3 }
            ],
            { type: "number", value: 4 }
        ]);
    });
});
