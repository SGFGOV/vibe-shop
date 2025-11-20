"use client"

import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  Container,
  Heading,
  Button,
} from "@medusajs/ui"
import {
  DetailWidgetProps,
  AdminProductCategory,
} from "@medusajs/framework/types"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import { CategoryImage } from "../types"
import { CategoryMediaModal } from "../components/category-media/category-media-modal"
import { ThumbnailBadge } from "@medusajs/icons"

type CategoryImagesResponse = {
  images: CategoryImage[]
}

const CategoryMediaWidget = ({
  data: category,
}: DetailWidgetProps<AdminProductCategory>) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: response, isLoading } = useQuery<CategoryImagesResponse>({
    queryKey: ["category-images", category.id],
    queryFn: async () => {
      const result = await sdk.client.fetch<CategoryImagesResponse>(
        `/admin/category-images?category_id=${category.id}`
      )
      return result
    },
  })

  const images = response?.images || []

  return (
    <>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Media</Heading>
          <Button onClick={() => setIsModalOpen(true)} variant="secondary">
            Edit
          </Button>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-4">
            {isLoading && (
              <div className="col-span-full">
                <p className="text-ui-fg-subtle text-sm">Loading...</p>
              </div>
            )}
            {!isLoading && images.length === 0 && (
              <div className="col-span-full">
                <p className="text-ui-fg-subtle text-sm">No images added yet</p>
              </div>
            )}
            {images.map((image: CategoryImage) => (
              <div
                key={image.id}
                className="relative aspect-square overflow-hidden rounded-lg border border-ui-border-base bg-ui-bg-subtle"
              >
                <img
                  src={image.url}
                  alt={`Category ${image.type}`}
                  className="h-full w-full object-cover"
                />
                {image.type === "thumbnail" && (
                  <div className="absolute top-2 left-2">
                    <ThumbnailBadge />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>

      <CategoryMediaModal
        categoryId={category.id}
        existingImages={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export const config = defineWidgetConfig({
  zone: "product_category.details.after",
})

export default CategoryMediaWidget

