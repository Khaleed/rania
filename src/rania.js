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

export { tokenize };
