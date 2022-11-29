import { FC } from 'react'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import ImagesGrid from './ImagesGrid'
import FormatEth from 'components/FormatEth'
import useCollections from 'hooks/useCollections'
import Masonry from 'react-masonry-css'

type Props = {
  collections: ReturnType<typeof useCollections>
}

const CollectionsGridWide: FC<Props> = ({ collections }) => {
  const {
    collections: { data, isValidating },
    ref,
  } = collections

  const mappedCollections = data
    ? data
        .flatMap(({ collections }) => collections)
        // @ts-ignore
        .filter((collection) => !collection?.sampleImages?.includes(null))
    : []
  
    const didReachEnd = data && data[data.length - 1]?.collections?.length === 0

  return (
    <Masonry
      key="collectionGridMasonry"
      breakpointCols={{
        default: 5,
        1536: 4,
        1280: 3,
        1024: 3,
        768: 2,
        640: 2,
        500: 1,
      }}
      className="masonry-grid col-span-full px-2"
      columnClassName="masonry-grid_column"
    >
      {!data && isValidating
        ? Array(16)
            .fill(null)
            .map((_, index) => (
              <div
                key={`loading-card-${index}`}
                className="h-[310px] w-full animate-pulse bg-white shadow-md dark:bg-neutral-900"
              ></div>
            ))
        : mappedCollections
            ?.filter((collection) => {
              if (collection?.tokenCount) {
                return +collection.tokenCount <= 30000
              }
              return false
            })
            .map((collection, idx) => (
              <Link
                key={`${collection?.name, collection?.floorAsk}${idx}`}
                href={`/collections/${collection?.id}`}
              >
                <a className="group mb-6 block transform-gpu overflow-hidden rounded-[16px] border border-[#D4D4D4] bg-white p-3 transition ease-in hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg hover:ease-out dark:border-0 dark:bg-neutral-800 dark:ring-1 dark:ring-neutral-600">
                  <ImagesGrid
                    sample_images={collection?.sampleImages}
                    value={collection?.name || ''}
                  />
                  <div className="mt-3 flex items-center gap-2">
                    {collection?.image ? (
                      <img
                        src={optimizeImage(collection?.image, 80)}
                        className="h-12 w-12 rounded-lg border border-gray-300 object-cover"
                        alt={`${collection?.name} Image`}
                      />
                    ) : (
                      <div className="h-12 w-12 flex-none rounded-l bg-gradient-to-br from-primary-500 to-primary-900"></div>
                    )}

                    <div className="reservoir-subtitle mb-3 overflow-hidden truncate px-4 pt-4 dark:text-white lg:pt-3">
                      {collection?.name}
                    </div>
                    <div className="flex items-center justify-between px-4 pb-4 lg:pb-3">

                    <div className="text-left">Floor:</div>
                    <div className="reservoir-h6">
                    <FormatEth amount={collection?.floorAsk?.price?.amount?.native} />
                    </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
    </Masonry>
  )
}

export default CollectionsGridWide