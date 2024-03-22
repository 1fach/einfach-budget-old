import { createGraphQLError } from 'src/lib/error'

enum VALUE_RANGES {
  NEGATIVE,
  NON_NEGATIVE,
  POSITIVE,
  NON_POSITIVE,
  ANY,
}

enum VALUE_TYPES {
  INT,
  FLOAT,
}
// TODO: Consider implementing coercion like this...
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L13
// See: https://github.com/graphql/graphql-js/blob/master/src/type/scalars.js#L60

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _validateInt(value: any) {
  if (!Number.isFinite(value)) {
    throw createGraphQLError(`Value is not a finite number: ${value}`)
  }

  if (!Number.isInteger(value)) {
    throw createGraphQLError(`Value is not an integer: ${value}`)
  }

  if (!Number.isSafeInteger(value)) {
    throw createGraphQLError(`Value is not a safe integer: ${value}`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _validateFloat(value: any) {
  if (!Number.isFinite(value)) {
    throw createGraphQLError(`Value is not a finite number: ${value}`)
  }
}

const VALIDATIONS = {
  NonPositiveInt: {
    range: VALUE_RANGES.NON_POSITIVE,
    type: VALUE_TYPES.INT,
  },
  PositiveInt: {
    range: VALUE_RANGES.POSITIVE,
    type: VALUE_TYPES.INT,
  },
  NonNegativeInt: {
    range: VALUE_RANGES.NON_NEGATIVE,
    type: VALUE_TYPES.INT,
  },
  NegativeInt: {
    range: VALUE_RANGES.NEGATIVE,
    type: VALUE_TYPES.INT,
  },

  NonPositiveFloat: {
    range: VALUE_RANGES.NON_POSITIVE,
    type: VALUE_TYPES.FLOAT,
  },
  PositiveFloat: {
    range: VALUE_RANGES.POSITIVE,
    type: VALUE_TYPES.FLOAT,
  },
  NonNegativeFloat: {
    range: VALUE_RANGES.NON_NEGATIVE,
    type: VALUE_TYPES.FLOAT,
  },
  NegativeFloat: {
    range: VALUE_RANGES.NEGATIVE,
    type: VALUE_TYPES.FLOAT,
  },
  Money: {
    range: VALUE_RANGES.ANY,
    type: VALUE_TYPES.FLOAT,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processValue(value: any, scalarName: keyof typeof VALIDATIONS) {
  const { range, type } = VALIDATIONS[scalarName]

  /* eslint-disable no-restricted-globals */
  /* eslint-disable use-isnan */
  if (
    value === null ||
    typeof value === 'undefined' ||
    isNaN(value) ||
    Number.isNaN(value) ||
    value === Number.NaN
  ) {
    throw createGraphQLError(`Value is not a number: ${value}`)
  }
  /* eslint-enable */

  let parsedValue

  switch (type) {
    case VALUE_TYPES.FLOAT:
      parsedValue = parseFloat(value)
      _validateFloat(parsedValue)
      break

    case VALUE_TYPES.INT:
      parsedValue = parseInt(value, 10)
      _validateInt(parsedValue)
      break

    default:
    // no -op, return undefined
  }

  if (
    (range === VALUE_RANGES.NEGATIVE && !(parsedValue < 0)) ||
    (range === VALUE_RANGES.NON_NEGATIVE && !(parsedValue >= 0)) ||
    (range === VALUE_RANGES.POSITIVE && !(parsedValue > 0)) ||
    (range === VALUE_RANGES.NON_POSITIVE && !(parsedValue <= 0))
  ) {
    throw createGraphQLError(
      `Value is not a ${VALUE_RANGES[range]
        .toLowerCase()
        .replace('_', '-')} number: ${value}`
    )
  }

  return parsedValue
}
