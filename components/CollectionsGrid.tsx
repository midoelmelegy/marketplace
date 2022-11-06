import { FC } from 'react'
import Link from 'next/link'
import { optimizeImage } from 'lib/optmizeImage'
import ImagesGrid from './ImagesGrid'
import useCollections from 'hooks/useCollections'
import LoadingCardCollection from './LoadingCardCollection'
import Masonry from 'react-masonry-css'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'

const FOOTER_ENABLED = process.env.NEXT_PUBLIC_FOOTER_ENABLED

type Props = {
  collections: ReturnType<typeof useCollections>
}

const CollectionsGrid: FC<Props> = ({ collections }) => {
  const {
    collections: { data, isValidating },
    ref,
  } = collections
  const [expanded, setExpanded] = useState<boolean>(false);

  const shouldInfiniteLoad = !FOOTER_ENABLED || (FOOTER_ENABLED && expanded && collections.size < 5)

  const mappedCollections = data
    ? data
        .flatMap(({ collections }) => collections)
        // @ts-ignore
        .filter((collection) => !collection?.sampleImages?.includes(null))
    : []
  const didReachEnd = data && data[data.length - 1]?.collections?.length === 0

  if(FOOTER_ENABLED && !expanded && index > 9) {
    return
  }

  return (
    <Masonry
      ref={index === arr.length - 5 && shouldInfiniteLoad ? ref : null}
      className={`${index === arr.length - 1 || (!expanded && index == 9) ? '' : 'border-b'} group h-[88px] border-neutral-300 dark:border-neutral-600 dark:text-white`}
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
                key={`${collection?.name}${idx}`}
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

                    <div className="reservoir-subtitle dark:text-white">
                      {collection?.name}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
      {FOOTER_ENABLED && expanded && collections.isValidating &&
        <CgSpinner className="mx-auto h-6 w-6 animate-spin" />
      }

      {FOOTER_ENABLED && !expanded &&
        <button
          className='mx-auto my-3 btn-primary-outline border border-[#D4D4D4] bg-white text-black dark:border-[#525252] dark:bg-black dark:text-white dark:ring-[#525252] dark:focus:ring-4'
          onClick={() => {
            setExpanded(true)
          }}
        >
          Load More
        </button>
      }
      {!didReachEnd &&
        Array(5)
          .fill(null)
          .map((_, index) => {
            if (index === 0) {
              return (
                <LoadingCardCollection
                  viewRef={ref}
                  key={`loading-card-${index}`}
                />
              )
            }
            return <LoadingCardCollection key={`loading-card-${index}`} />
          })}
    </Masonry>
  )
}

export default CollectionsGrid
