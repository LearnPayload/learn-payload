'use client'

import { seed } from '@/actions/seed'

export const SeedButton = () => {
  return <button onClick={() => seed()}>Seed</button>
}
