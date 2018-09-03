/** Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * Environment object maps symbols to their values.
 * This environment can be extended using user-defined variables
 * by using `(define symbol value)`
 */

// environment object that represents the global scope
const env = Object.create(null);

// nil :: Object -> Object
const nil = env => {
    env["nil"] = null;
    return env;
};

// bool :: Object -> Object
const bool = env => {
    env["true"] = true;
    env["false"] = false;
    return env;
};

// print :: Object -> Object
const print = env => {
    env["print"] = val => {
        console.log(val);
        return val;
    };
    return env;
};

// arithmetic :: Object -> Object
const arithmetic = env => {
    const operators = ["+", "-", "*", "/"];
    return operators.reduce((acc, op) => {
        env[op] = new Function("x, y", "return x " + op + " y;");
        return acc;
    }, env);
};

// logic :: Object -> Object
const logic = env => {
    env["and"] = (x, y) => x && y;
    env["or"] = (x, y) => x || y;
    env["not"] = x => !x;
    return env;
};

// comparison :: Object -> Object
const comparison = env => {
    env["="] = (x, y) => (x === y ? true : false);
    env["not="] = (x, y) => (x !== y ? true : false);
    env[">"] = (x, y) => x > y;
    env["<"] = (x, y) => x < y;
    env[">="] = (x, y) => x >= y;
    env["<="] = (x, y) => x <= y;
    return env;
};

// first :: Object -> Object
const first = env => {
    env["first"] = xs => xs[0];
    return env;
};

// last :: Object -> Object
const last = env => {
    env["last"] = xs => xs[xs.length - 1];
    return env;
};

// rest :: Object -> Object
const rest = env => {
    env["rest"] = xs => xs.slice(1, xs.length);
    return env;
};

const standardEnv = env => {
    nil(env);
    bool(env);
    print(env);
    arithmetic(env);
    logic(env);
    comparison(env);
    first(env);
    last(env);
    rest(env);
    return env;
};

export { env, standardEnv };
