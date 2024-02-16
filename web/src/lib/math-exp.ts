import { Parser } from 'expr-eval'

export const parser = new Parser({
  operators: {
    // These default to true, but are included to be explicit
    add: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,

    // Disable array concatenation
    concatenate: false,
    // Disable ternary conditional (if x then y else z)
    conditional: false,
    // Disable and, or, not, <, ==, !=, etc.
    logical: false,
    comparison: false,

    // Disable 'in' and = operators
    in: false,
    assignment: false,
  },
})
