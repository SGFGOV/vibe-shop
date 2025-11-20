import { Text } from "@medusajs/ui"
import { CategoryImage, UploadedFile } from "../../types"
import { CategoryImageItem } from "./category-image-item"

type CategoryImageGalleryProps = {
  existingImages: CategoryImage[]
  uploadedFiles: UploadedFile[]
  currentThumbnailId: string | null
  selectedImageIds?: string[]
  onImageSelect?: (id: string) => void
  onImageDelete?: (id: string) => void
  deletedImageIds?: string[]
}

export const CategoryImageGallery = ({
  existingImages,
  uploadedFiles,
  currentThumbnailId,
  selectedImageIds = [],
  onImageSelect,
  onImageDelete,
  deletedImageIds = [],
}: CategoryImageGalleryProps) => {
  // Filter out deleted images
  const visibleExistingImages = existingImages.filter(
    (image) => image.id && !deletedImageIds?.includes(image.id)
  )

  const hasNoImages =
    visibleExistingImages.length === 0 && uploadedFiles.length === 0

  return (
    <div className="bg-ui-bg-subtle size-full overflow-auto">
      <div className="grid h-fit auto-rows-auto grid-cols-4 gap-6 p-6">
        {/* Existing images */}
        {visibleExistingImages.map((image) => {
          if (!image.id) {
            return null
          }

          const imageId = image.id
          const isThumbnail = currentThumbnailId === imageId
          const isSelected = selectedImageIds.includes(imageId)

          return (
            <CategoryImageItem
              key={imageId}
              id={imageId}
              url={image.url}
              alt={`Category ${image.type}`}
              isThumbnail={isThumbnail}
              isSelected={isSelected}
              onSelect={onImageSelect}
              onDelete={onImageDelete}
            />
          )
        })}

        {/* Newly uploaded files */}
        {uploadedFiles.map((file) => {
          const uploadedId = `uploaded:${file.id}`
          const isThumbnail = currentThumbnailId === uploadedId
          const isSelected = selectedImageIds.includes(uploadedId)

          return (
            <CategoryImageItem
              key={file.id}
              id={uploadedId}
              url={file.url}
              alt="Uploaded"
              isThumbnail={isThumbnail}
              isSelected={isSelected}
              onSelect={onImageSelect}
            />
          )
        })}

        {/* Empty state */}
        {hasNoImages && (
          <div className="col-span-4 flex items-center justify-center p-8">
            <Text className="text-ui-fg-subtle text-center">
              No images yet. Upload images to get started.
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

