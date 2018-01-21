/**
 * Copyright (c) 2018-present, Github/Khaleed.
 *
 * This source code is licensed under the Apache licence found in the
 * LICENSE file in the root directory of this source tree.
 */

// map :: Function -> Array -> Function
const map = f => array => array.map(f);
// filter :: Function -> Array -> Function
const filter = f => array => array.filter(f);
// reduce :: Function -> Array -> Function
const reduce = f => array => array.reduce(f);
// trim :: Array -> Array
const trim = xs => (xs.indexOf("") >= 0 ? xs.slice(1, -1) : xs);
// fold :: [Function] -> Function
const fold = (f, g) => (...args) => f(g(...args));
// compose :: [Function] -> Function
const compose = (...fs) => fold(...fs);
// head :: Array -> a
const head = xs => xs[0];
// rest :: Array -> Array
const rest = xs => xs.slice(1, xs.length);
export { map, filter, reduce, trim, compose, head, rest };
