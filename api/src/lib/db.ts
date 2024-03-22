// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'kysely'
import kyselyExtension from 'prisma-extension-kysely'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import type { DB } from '../../db/generated/types'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const prisma = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db: prisma,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

export const db = prisma.$extends(
  kyselyExtension({
    kysely: (driver) =>
      new Kysely<DB>({
        dialect: {
          createDriver: () => driver,
          createAdapter: () => new PostgresAdapter(),
          createIntrospector: (db) => new PostgresIntrospector(db),
          createQueryCompiler: () => new PostgresQueryCompiler(),
        },
      }),
  })
)
