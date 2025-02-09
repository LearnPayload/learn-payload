import { getPayload } from 'payload'
import configPromise from '@payload-config'

export interface SeederInterface {
  run(): Promise<void>
}

export class BaseSeeder {
  async getPayload() {
    return await getPayload({ config: configPromise })
  }
}

export class DatabaseSeeder {
  public async call(seeders: SeederInterface[]) {
    await Promise.all(seeders.map((seeder) => seeder.run()))

    console.log('Seeding complete!')
    process.exit(0)
  }
}

export const dbSeeder = new DatabaseSeeder()
