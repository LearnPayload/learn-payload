import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'
import { CACHE_TAG } from './queries'

export const afterChangeHook: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`revalidating ${CACHE_TAG}`)

  revalidateTag(CACHE_TAG)

  return doc
}
