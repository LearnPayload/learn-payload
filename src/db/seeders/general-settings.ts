import { BaseSeeder, SeederInterface } from "./seeder"
import { File } from "payload"

export class GeneralSettingsSeeder extends BaseSeeder implements SeederInterface {
  async run() {
    console.log("Running GeneralSettingsSeeder...")
    const payload = await this.getPayload()
    const [logoBuffer] = await Promise.all([
      fetchFileByURL(
        "https://raw.githubusercontent.com/LearnPayload/learn-payload/refs/heads/main/logo.svg",
      ),
    ])
    const logoProps = {
      alt: "Logo",
      updatedAt: "2025-02-08T16:07:57.210Z",
      createdAt: "2025-02-08T16:07:57.195Z",
      filename: "logo-4.svg",
    }

    const [_, logo] = await Promise.all([
      payload.db.deleteMany({ collection: "media", where: {} }),
      payload.create({
        collection: "media",
        data: logoProps,
        file: logoBuffer,
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ])

    // General Settings
    await Promise.all([
      payload.updateGlobal({
        slug: "generalSettings",
        data: {
          title: "Learn Payload with Colyn!!!!!",
          tagline: "Make sure to like this video and subscribe to the channel!",
          logo: logo.id,
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ])
  }
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: "include",
    method: "GET",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split("/").pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split(".").pop()}`,
    size: data.byteLength,
  }
}
