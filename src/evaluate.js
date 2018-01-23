/**
 * Copyright (c) 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

// symbolEval :: (Object, Object) -> Any
const symbolEval = (exp, environment) => {
    return exp.type === "symbol"
        ? environment[exp.value]
        : new ReferenceError(`Undefined variable ${exp.type}`);
};

// literalEval :: (Object, Object) -> Any
const literalEval = (exp, environment) => {
    return exp.type === "number" || exp.type === "string"
        ? exp.value
        : symbolEval(exp, environment);
};

// listEval :: [Object] -> Any
const listEval = (exp, environment) => {
    return null; // returning null as a stub so tests can run
};

/**
 * Evaluates expression by returning a value from a syntax tree and a given
 * environment that maps variables to their values.
 *
 */

// evaluate :: ((Either [Object], Object), Object) -> Any
const evaluate = (exp, environment) =>
    // [Object] -> Any
    Array.isArray(exp) === true
        ? listEval(exp, environment)
        : literalEval(exp, environment); // Object -> Any

export { evaluate };
