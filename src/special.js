/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import { evaluate } from "./evaluate";

const initObject = Object.create(null);

/**
 * Adds "if" to the special object with exactly three arguments and a given environment.
 * It only accepts True or False as it's first argument.
 */

// addIf :: Special -> Special
// interp. Special as an object that contains special functions
const addIf = obj => {
    obj["if"] = (args, environment) => {
        if (args.length !== 3) {
            throw new SyntaxError(
                `Incorrect number of arguments to if expression`
            );
        }
        if (evaluate(args[0], environment)) {
            return evaluate(args[1], environment);
        } else {
            return evaluate(args[2], environment);
        }
    };
    return obj;
};

// specialForms :: Special -> Special
// interp. Special as object that contains special functions
const specialForms = obj => {
    addIf(obj);
    return obj;
};

const special = specialForms(initObject);

export { special };
