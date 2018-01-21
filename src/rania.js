import { trim, compose } from "./helpers/index";

/**
 * Copyright (c) 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rania is a simplified toy lisp with a very small core.
 *
 * The first step of writing a lisp interpreter is to parse by first tokenizing a sequence of
 * characters that represent a program.
 */

// token :: String -> [String]
const token = program =>
    program
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .split(/ +/);

// tokenize :: String -> [String]
const tokenize = compose(trim, token);

/**
 * Everything in Rania is an expression.
 *
 * An atomic expression represents a Number, String, or a Symbol.
 * Number is implemented as a JS 64-bit float.
 * String as a JS string with both a single and double quotes.
 * Symbol as a JS string with double quotes.
 *
 * Atom represented as a syntax object with type and value properties:
 *
 * //=> { type: symbol, value: token }
 *
 */

// atom :: String -> Object
const atom = token => {
    if (!isNaN(parseFloat(token)) && !isNaN(token - 1)) {
        return { type: "number", value: parseFloat(token) };
        // check if token is a string ->  a string starts with two quotes
    } else if (token.indexOf('"') >= 0) {
        return { type: "string", value: token.slice(1, -1) }; // remove single quotes
    } else {
        return { type: "symbol", value: token };
    }
};

export { tokenize, atom };
