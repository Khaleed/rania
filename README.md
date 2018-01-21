# Rania

A succinct lisp interpreter in JavaScript.

## Methodology

Rania is built using Node `9.3.0` and [Babel](https://babel.io) transpiler. Babel-register is used to compile ES6/ES7 into ES5 and run Node in development mode. 
In production, babel-register is not used but code is compiled before running the `babel` command from the `babel-cli` package.

## Instructions

### Dependencies

To install dependencies

`yarn install` or `npm install`

### Run

To start running Node

`yarn start` or `npm start`

### Build

To build and compile using [Babel](https://babel.io)

`yarn dist` or `npm run dist`

To delete files in build directory

`yarn clean` or `npm run clean`

### Deploy

To deploy latest build

`yarn deploy` or `npm deploy`

### Test

To run tests using [Jest](https://facebook.github.io/jest/)

`yarn test` or `npm test`

## Tasks

- [ ] Implement parse by composing tokenize and expression
- [ ] Make environment object that maps variables to their values
- [ ] Implement evaluator that evaluates program given a syntax tree and environment object
- [ ] Create REPL to run Rania programs

## License 
Rania is released under the <a href="https://opensource.org/licenses/Apache-2.0">The Apache 2.0 License<a/>.


