import { getPayload as getPayloadSource } from "payload"
import configPromise from "@payload-config"

const getPayload = async () => await getPayloadSource({ config: configPromise })

export default getPayload
