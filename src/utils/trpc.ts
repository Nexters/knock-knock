// src/utils/trpc.ts
import type { AppRouter } from '../server/router'
import { createReactQueryHooks } from '@trpc/react'

// https://trpc.io/docs/infer-types#inference-helpers
export const trpc = createReactQueryHooks<AppRouter>()
