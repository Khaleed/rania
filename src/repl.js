/**
 * Copyright © 2018-present, github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

import repl from "repl";
import { evaluate } from "./evaluate";
import { parse } from "./parser";
import { env, standardEnv } from "./environment";

const e_val = (cmd, context, filename, callback) => {
    const environment = standardEnv(env);
    const exp = parse(cmd);
    const execute = evaluate(exp, environment);
    callback(null, execute);
};

repl.start({ prompt: "user> ", eval: e_val });
