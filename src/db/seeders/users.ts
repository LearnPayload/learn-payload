import { BaseSeeder, SeederInterface } from "./seeder"

export class UserSeeder extends BaseSeeder implements SeederInterface {
  async run() {
    console.log("Running UserSeeder...")
    const payload = await this.getPayload()
    await Promise.all([
      payload.db.deleteMany({ collection: "users", where: {} }),
      payload.create({
        collection: "users",
        data: {
          name: "Colyn Brown",
          email: "hello@example.com",
          password: "password",
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ])
  }
}
