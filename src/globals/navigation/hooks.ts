import { revalidateTag } from 'next/cache'
import { GlobalAfterChangeHook } from 'payload'
import { CACHE_TAG } from './query'

export const afterChangeHook: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`revalidating ${CACHE_TAG}`)

    revalidateTag(CACHE_TAG)
  }

  return doc
}
