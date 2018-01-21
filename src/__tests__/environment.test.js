/** Copyright (c) 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache 2.0 licence found in the
 * README file in the root directory of this source tree.
 */

import { env, standardEnv } from "../environment";

describe("standardEnv", () => {
    it("creates an environment object that maps names to their values", () => {
        expect(
            // standardEnv has 20 properties but more can be added through user-defined variables
            Object.keys(env).length >= 20 && typeof env === "object"
        ).toBeTruthy();
    });
});

describe("nil", () => {
    it("acesses nil value", () => {
        const Environment = standardEnv(env);
        expect(Environment.nil).toEqual(null);
    });
});

describe("bool", () => {
    it("gets true or false value", () => {
        const Environment = standardEnv(env);
        expect(Environment.true).toEqual(true);
        expect(Environment.false).toEqual(false);
    });
});

describe("print", () => {
    it("calls a function that prints to the console", () => {
        const Environment = standardEnv(env);
        expect(Environment.print("a")).toBe("a");
    });
});

describe("arithmetic operators", () => {
    const Environment = standardEnv(env);
    it("calls a function that adds values", () => {
        expect(Environment["+"](2, 2)).toEqual(4);
    });
    it("calls a function that subtracts values", () => {
        expect(Environment["-"](2, 1)).toEqual(1);
    });
    it("calls a function that multiplies values", () => {
        expect(Environment["*"](2, 3)).toEqual(6);
    });
    it("calls a function that divides values", () => {
        expect(Environment["/"](6, 2)).toEqual(3);
    });
});

describe("logical operators", () => {
    const Environment = standardEnv(env);
    it("uses logical AND operator", () => {
        expect(Environment["and"](true, true)).toBeTruthy();
        expect(Environment["and"](true, false)).toBeFalsy();
    });
    it("uses logical OR operator", () => {
        expect(Environment["or"](true, false)).toBeTruthy();
    });
    it("uses logical NOT operator", () => {
        expect(Environment["not"](2)).toBeFalsy();
    });
});

describe("comparison operators", () => {
    const Environment = standardEnv(env);
    it("uses equality operator", () => {
        expect(Environment["="](2, 2)).toBeTruthy();
        expect(Environment["="](3, 2)).toBeFalsy();
    });
    it("uses inequality operator", () => {
        expect(Environment["not="](3, 2)).toBeTruthy();
        expect(Environment["not="](2, 2)).toBeFalsy();
    });
    it("uses greater than operator", () => {
        expect(Environment[">"](4, 2)).toBeTruthy();
        expect(Environment[">"](2, 2)).toBeFalsy();
    });
    it("uses less than operator", () => {
        expect(Environment["<"](2, 3)).toBeTruthy();
        expect(Environment["<"](3, 2)).toBeFalsy();
    });
    it("uses greater than or equal operator", () => {
        expect(Environment[">="](2, 2)).toBeTruthy();
        expect(Environment[">="](1, 2)).toBeFalsy();
    });
    it("uses less than or equal operator", () => {
        expect(Environment["<="](1, 2)).toBeTruthy();
        expect(Environment["<="](2, 1)).toBeFalsy();
    });
});

describe("first", () => {
    it("calls a function that returns first element in a list", () => {
        const Environment = standardEnv(env);
        expect(Environment.first([1, 2, 3])).toEqual(1);
    });
});

describe("last", () => {
    it("calls a function that returns last element in a list", () => {
        const Environment = standardEnv(env);
        expect(Environment.last([1, 2, 3])).toEqual(3);
    });
});

describe("rest", () => {
    it("calls a function that returns all elements except the first in a list", () => {
        const Environment = standardEnv(env);
        expect(Environment.rest([1, 2, 3])).toEqual([2, 3]);
    });
});
