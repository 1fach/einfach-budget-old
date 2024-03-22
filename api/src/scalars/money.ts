import { GraphQLScalarType, Kind } from 'graphql'

import { createGraphQLError } from 'src/lib/error'

import { processValue } from './utilities.js'

export const MoneyResolver = /*#__PURE__*/ new GraphQLScalarType({
  name: 'Money',

  description: 'Decimal money value with 6 decimal places',

  serialize(value) {
    return processValue(value, 'Money') / 1_000_000
  },

  parseValue(value) {
    return Math.round(processValue(value, 'Money') * 1_000_000)
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.FLOAT && ast.kind !== Kind.INT) {
      throw createGraphQLError(
        `Can only validate floating point numbers as positive floating point numbers but got a: ${ast.kind}`,
        { nodes: ast }
      )
    }

    return Math.round(processValue(ast.value, 'Money') * 1_000_000)
  },
  extensions: {
    codegenScalarType: 'number',
    jsonSchema: {
      title: 'Money',
      type: 'number',
      minimum: 0,
    },
  },
})

export const MoneyDefinition = 'scalar Money'
