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
export const db = new PrismaClient({
  log: emitLogLevels(['info', 'warn', 'error']),
}).$extends(
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

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error'],
})
