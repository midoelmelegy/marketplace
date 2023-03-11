
import { paths } from '@reservoir0x/reservoir-sdk'
import { optimizeImage } from 'lib/optmizeImage'
import React, { FC } from 'react'

type Props = {
  sample_images: NonNullable<
    paths['/collections/{collection}/attributes/explore/v3']['get']['responses']['200']['schema']['attributes']
  >[0]['sampleImages']
  value: NonNullable<
    paths['/collections/{collection}/attributes/explore/v3']['get']['responses']['200']['schema']['attributes']
  >[0]['value']
}

const ImagesGrid: FC<Props> = ({ sample_images, value }) => {
  return (
    <>
      {!!sample_images && sample_images.length > 0 ? (
        <div className="flex h-full flex-row gap-1">
          {sample_images.length > 1 ? (
            // SMALLER IMAGE, HAS SIDE IMAGES
            <img
              src={optimizeImage(sample_images[0], 70)}
              className="w-[70px] rounded"
              width="70"
              height="70"
            />
          ) : (
            // BIG IMAGE, NO SIDE IMAGES
            <img
              src={optimizeImage(sample_images[0], 70)}
              className="col-span-2 w-full rounded object-contain"
              width="70"
              height="70"
            />
          )}
          {sample_images.length > 1 && (
            <div className="flex h-full flex-row gap-1">
              {sample_images.slice(1).map((image) => (
                <img
                  key={image}
                  src={optimizeImage(image, 70)}
                  width="70"
                  height="70"
                  className="w-[70px] rounded"
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-w-1 aspect-h-1 relative">
          <img src="https://via.placeholder.com/70" width="70" height="70" />
        </div>
      )}
    </>
  )
}

export default ImagesGrid
