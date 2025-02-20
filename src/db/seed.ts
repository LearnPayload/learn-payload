import { GeneralSettingsSeeder } from "./seeders/general-settings"
import { NavigationSeeder } from "./seeders/navigation"
import { dbSeeder } from "./seeders/seeder"
import { UserSeeder } from "./seeders/users"

export const handler = async () => {
  await dbSeeder.call([new UserSeeder(), new GeneralSettingsSeeder(), new NavigationSeeder()])
}
