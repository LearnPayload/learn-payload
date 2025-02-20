import { BaseSeeder, SeederInterface } from "./seeder"

export class NavigationSeeder extends BaseSeeder implements SeederInterface {
  async run() {
    console.log("Running NavigationSeeder...")
    const payload = await this.getPayload()
    await Promise.all([
      payload.updateGlobal({
        slug: "navigation",
        data: {
          menus: [
            {
              menuName: "Main",
              slug: "main",
              menuItems: [
                {
                  label: "Home",
                  URL: "/",
                },
                {
                  label: "About",
                  URL: "/about",
                },
                {
                  label: "Contact",
                  URL: "/contact",
                },
              ],
            },
          ],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ])
  }
}
