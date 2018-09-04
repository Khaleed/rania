/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { rest, map, compose } from "./helpers/index";
import { special } from "./special";

/**
 * symbolEval :: (Object, Object) -> Any
 *
 * Produces a value from symbols given an environment
 */
const symbolEval = (exp, environment) =>
    exp.type === "symbol"
        ? environment[exp.value]
        : new ReferenceError(`Undefined variable ${exp.type}`);

/**
 * literalEval :: (Object, Object) -> Any
 *
 * Produces a value from symbols given an environment
 */
const literalEval = (exp, environment) => {
    console.log(exp);
    return exp.type === "number" || exp.type === "string"
        ? exp.value
        : symbolEval(exp, environment);
};

/**
 * listEval :: [Object] -> Any
 *
 * Computes a value from list expressions
 */
const listEval = (exp, environment) => {
    if (exp.length < 1) {
        return exp;
    }
    if (exp[0].length === undefined && exp[0].type !== "symbol") {
        // return an array containing literal values
        throw TypeError(`${exp[0].value} is not a function`);
    }
    if (exp[0].type === "symbol" && !(exp[0].value in special)) {
        // check if symbol points to a procedure
        const procedure = evaluate(exp[0], environment);
        if (typeof procedure !== "function") {
            throw TypeError(`incorrectly calling ${procedure} as a function`);
        } else {
            const evalArg = x => evaluate(x, environment);
            const evalAllArgs = compose(map(evalArg), rest);
            const args = evalAllArgs(exp);
            return exp[0].value === "rest" ||
                exp[0].value === "first" ||
                exp[0].value === "last"
                ? procedure(args)
                : procedure(...args);
        }
    } else {
        // it is a special form
        const op = special[exp[0].value](rest(exp), environment);
        return op;
    }
};

/**
 * evaluate :: ((Either [Object], Object), Object) -> Any
 *
 * Evaluates expression by returning a value from a syntax tree and a given
 * environment that maps variables to their values.
 */
const evaluate = (exp, environment) =>
    Array.isArray(exp) === true
        ? listEval(exp, environment)
        : literalEval(exp, environment);

export { evaluate };
