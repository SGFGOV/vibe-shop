"use client"

import { useState } from "react"
import {
  FocusModal,
  Heading,
  Button,
  Text,
  RadioGroup,
} from "@medusajs/ui"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { CategoryImage, UploadedFile } from "../../types"
import { CategoryImageGallery } from "./category-image-gallery"

type CategoryMediaModalProps = {
  categoryId: string
  existingImages: CategoryImage[]
  isOpen: boolean
  onClose: () => void
}

export const CategoryMediaModal = ({
  categoryId,
  existingImages,
  isOpen,
  onClose,
}: CategoryMediaModalProps) => {
  const queryClient = useQueryClient()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([])
  const [thumbnailId, setThumbnailId] = useState<string | null>(
    existingImages.find((img) => img.type === "thumbnail")?.id || null
  )
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      const fileArray = Array.from(files)
      const response = await sdk.admin.upload.create({
        files: fileArray,
      })

      if (response.files) {
        const newFiles: UploadedFile[] = response.files.map((file: { id: string; url: string }) => ({
          id: file.id,
          url: file.url,
        }))
        setUploadedFiles((prev) => [...prev, ...newFiles])
      }
    } catch (error) {
      console.error("Failed to upload files:", error)
    }
  }

  // Handle image selection
  const handleImageSelect = (id: string) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    )
  }

  // Handle image deletion
  const handleImageDelete = (id: string) => {
    if (id.startsWith("uploaded:")) {
      // Remove from uploaded files
      const fileId = id.replace("uploaded:", "")
      setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
      setSelectedImageIds((prev) => prev.filter((imgId) => imgId !== id))
      if (thumbnailId === id) {
        setThumbnailId(null)
      }
    } else {
      // Mark existing image for deletion
      setDeletedImageIds((prev) => [...prev, id])
      setSelectedImageIds((prev) => prev.filter((imgId) => imgId !== id))
      if (thumbnailId === id) {
        setThumbnailId(null)
      }
    }
  }

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      // Delete marked images
      for (const imageId of deletedImageIds) {
        await sdk.client.fetch(`/admin/category-images/${imageId}`, {
          method: "DELETE",
        })
      }

      // Create new images from uploaded files
      for (const file of uploadedFiles) {
        const imageType = thumbnailId === `uploaded:${file.id}` ? "thumbnail" : "image"
        await sdk.client.fetch("/admin/category-images", {
          method: "POST",
          body: {
            url: file.url,
            file_id: file.id,
            type: imageType,
            category_id: categoryId,
          },
        })
      }

      // Update thumbnail if changed
      if (thumbnailId && !thumbnailId.startsWith("uploaded:")) {
        const currentThumbnail = existingImages.find((img) => img.type === "thumbnail")
        if (currentThumbnail?.id !== thumbnailId) {
          // Remove thumbnail from current thumbnail
          if (currentThumbnail) {
            await sdk.client.fetch(`/admin/category-images/${currentThumbnail.id}`, {
              method: "POST",
              body: { type: "image" },
            })
          }
          // Set new thumbnail
          await sdk.client.fetch(`/admin/category-images/${thumbnailId}`, {
            method: "POST",
            body: { type: "thumbnail" },
          })
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-images", categoryId] })
      setUploadedFiles([])
      setSelectedImageIds([])
      setDeletedImageIds([])
      onClose()
    },
    onError: (error: Error) => {
      console.error("Failed to save category images:", error)
    },
  })

  const handleSave = () => {
    saveMutation.mutate()
  }

  const handleClose = () => {
    setUploadedFiles([])
    setSelectedImageIds([])
    setDeletedImageIds([])
    onClose()
  }

  // Get all visible images for thumbnail selection
  const allVisibleImages = [
    ...existingImages.filter((img) => img.id && !deletedImageIds.includes(img.id)),
    ...uploadedFiles.map((file) => ({
      id: `uploaded:${file.id}`,
      url: file.url,
      type: "image" as const,
    })),
  ]

  return (
    <FocusModal open={isOpen} onOpenChange={handleClose}>
      <FocusModal.Content>
        <FocusModal.Header>
          <Heading level="h2">Manage Category Images</Heading>
        </FocusModal.Header>
        <FocusModal.Body>
          <div className="flex flex-col gap-4">
            {/* Upload section */}
            <div>
              <label className="text-sm font-medium mb-2 block">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Thumbnail selection */}
            {allVisibleImages.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Set Thumbnail</label>
                <RadioGroup
                  value={thumbnailId || ""}
                  onValueChange={(value) => setThumbnailId(value || null)}
                >
                  <div className="flex flex-col gap-2">
                    {allVisibleImages.map((image) => (
                      <div key={image.id} className="flex items-center gap-2">
                        <RadioGroup.Item value={image.id || ""} id={image.id} />
                        <label htmlFor={image.id} className="cursor-pointer">
                          <img
                            src={image.url}
                            alt="Thumbnail option"
                            className="h-12 w-12 rounded object-cover"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Image gallery */}
            <CategoryImageGallery
              existingImages={existingImages}
              uploadedFiles={uploadedFiles}
              currentThumbnailId={thumbnailId}
              selectedImageIds={selectedImageIds}
              onImageSelect={handleImageSelect}
              onImageDelete={handleImageDelete}
              deletedImageIds={deletedImageIds}
            />
          </div>
        </FocusModal.Body>
        <FocusModal.Footer>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </FocusModal.Footer>
      </FocusModal.Content>
    </FocusModal>
  )
}

