/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { trim, compose } from "./helpers/index";

/**
 * Rania is a simplified toy lisp with a very small core.
 *
 * The first step of writing a lisp interpreter is to parse by first tokenizing a sequence of
 * characters that represent a program.
 */

// replace :: String -> String
const replace = program => program.replace(/\(/g, " ( ").replace(/\)/g, " ) ");

// split :: String -> [String]
const split = program => program.split(/ +/);

// tokens :: String -> [Token]
const tokens = compose(split, replace);

// tokenize :: String -> [Token]
const tokenize = compose(trim, tokens);

/**
 * Everything in Rania is an expression.
 *
 * An atomic expression represents a Number, String, or a Symbol.
 * Number is implemented as a JS 64-bit float.
 * String is a JS string with both a single and double quotes. '"hello"' "hello"
 * Symbol is a JS string with double quotes and it is evaluated as a variable name.
 *
 * Atom represented as a syntax object with type and value properties:
 *
 * //=> { type: symbol, value: token }
 *
 */

// atom :: String -> type :: Number String value :: Number String
const atom = token => {
    if (!isNaN(parseFloat(token)) && !isNaN(token - 1)) {
        return { type: "number", value: parseFloat(token) };
        // check if token is a string ->  a string starts with two quotes
    } else if (token.startsWith('"')) {
        return { type: "string", value: token.slice(1, -1) }; // remove single quotes // {type: "string", value: "hi"}
    } else {
        return { type: "symbol", value: token };
    }
};

/**
 * Takes tokens and verifies them according to the syntantic rules of Rania
 * and translates them into a syntax tree.
 *
 * For list expressions, the first element determines what it means.
 * If a list starts with a key word, then it is a special form.
 * If not, it is a function call that is applied to the list
 * of argument values.
 *
 * The abstract syntax tree for list expressions will consist
 * of a matrix (2-dimensional arrays) that hold expression objects.
 *
 * Each expression object will have a type property which describes what kind of expression
 * it is and the properties that describe it's contents.
 *
 * For example //=> [{ type: "symbol", value: "+" }, [{ type: "number", value: "2" },
 *                   { type: "number", value: "2" }]]
 **/

// parsedExpression :: [Token] -> SyntaxTree
const parseExpression = tokens => {
    if (tokens.length === 0) {
        throw new SyntaxError(`Unexpected error ${tokens}`);
    }
    const first = tokens.shift(); // evil mutation of tokens
    if (first === ")") {
        throw new SyntaxError(`Unexpected error ${first}`);
    } else if (first === "(") {
        // start recursive build of our list of Objects that represent a syntax tree
        const list = [];
        while (tokens[0] !== ")") {
            list.push(parseExpression(tokens)); // [{ type: "x", value: "y" } ... ]
        }
        // remove processed token
        tokens.shift(); // evil mutation of tokens
        return list;
    } else {
        return atom(first);
    }
};

/**
 * Returns expressions as objects with type property and other properties
 * in arrays as a snytax tree.
 */

// parse :: [String] -> [type :: Number String Symbol value :: String Number]
const parse = compose(parseExpression, tokenize);

export { tokenize, atom, parseExpression, parse };
