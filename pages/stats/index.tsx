import useBigCollections from 'hooks/useBigCollections'
import Layout from 'components/Layout'
import React, { FC } from 'react'
import CollectionsGridLarge from 'components/CollectionsGridLarge'

const Stats: FC = () => {
  const collections = useLargeCollections()

  return (
    <Layout navbar={{}}>
      <header className="col-span-full mb-12 mt-[66px] md:mt-12 lg:px-0">
                  <h1 className="reservoir-h1 text-center dark:text-white"></h1>
          </header>
          <div className="col-span-full small-screen-no-padding md:px-16">
            <div className="mb-9 flex w-full items-center justify-between">
              <div className="medium-screen-extra-padding reservoir-h1 dark:text-white">
              Explore
              </div>
            </div>
            <CollectionsGridLarge collections={collections} />
          </div>
    </Layout>
  )
}

export default Stats