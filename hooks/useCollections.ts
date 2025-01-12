import { paths } from '@reservoir0x/reservoir-kit-client'
import fetcher from 'lib/fetcher'
import setParams from 'lib/params'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'

const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE

type Collections = paths['/collections/v5']['get']['responses']['200']['schema']

export default function useCollections() {
  const { ref, inView } = useInView()

  const pathname = `${PROXY_API_BASE}/collections/v5`

  const collections = useSWRInfinite<Collections>(
    (index, previousPageData) => getKey(pathname, index, previousPageData),
    fetcher,
    {
      revalidateFirstPage: false,
    }
  )

  // Fetch more data when component is visible

  return { collections, ref }
}

const getKey: (
  pathname: string,
  ...base: Parameters<SWRInfiniteKeyLoader>
) => ReturnType<SWRInfiniteKeyLoader> = (
  pathname: string,
  index: number,
  previousPageData: paths['/collections/v5']['get']['responses']['200']['schema']
) => {
  // Reached the end
  if (previousPageData && previousPageData?.collections?.length === 0)
    return null

  let query: paths['/collections/v5']['get']['parameters']['query'] = {
    limit: 6,
    sortBy: '30DayVolume',
  }

  const href = setParams(pathname, query)

  return href
}