import useBigCollections from 'hooks/useBigCollections'
import Head from 'next/head'
import React, { FC } from 'react'
import CollectionsGridFull from 'components/CollectionsGridFull'

const META_TITLE = process.env.NEXT_PUBLIC_META_TITLE
const META_DESCRIPTION = process.env.NEXT_PUBLIC_META_DESCRIPTION
const TAGLINE = process.env.NEXT_PUBLIC_TAGLINE

const Explore: FC = () => {
  const collections = useBigCollections()

  const title = META_TITLE ? (
    <title>{META_TITLE}</title>
  ) : (
    <title>
      Seaport Market | The ultimate NFT marketplace
    </title>
  )
  const description = META_DESCRIPTION ? (
    <meta name="description" content={META_DESCRIPTION} />
  ) : (
    <meta
      name="description"
      content="Reservoir Market is an open source NFT marketplace powered by Reservoir"
    />
  )
  const tagline = TAGLINE || 'Discover, buy and sell NFTs'

  return (
    <>
      <Head>
        {title}
        {description}
      </Head>
      <header className="col-span-full mb-12 mt-[66px] px-4 md:mt-40 lg:px-0">
        <h1 className="reservoir-h1 text-center dark:text-white">{tagline}</h1>
      </header>
      <CollectionsGridFull collections={collections} />
    </>
  )
}

export default Explore