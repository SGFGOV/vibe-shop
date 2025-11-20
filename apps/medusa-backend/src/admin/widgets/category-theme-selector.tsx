"use client"

import { useState, useEffect } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  DetailWidgetProps,
  AdminProductCategory,
} from "@medusajs/framework/types"
import {
  Container,
  Heading,
  Select,
  Button,
  Text,
  clx,
} from "@medusajs/ui"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"

type AdminProductCategoryWithTheme = AdminProductCategory & {
  theme?: {
    id: string
    name: string
    settings: Record<string, unknown>
  } | null
}

type Theme = {
  id: string
  name: string
  settings: Record<string, unknown>
  is_active: boolean
}

const CategoryThemeSelectorWidget = ({
  data: category,
}: DetailWidgetProps<AdminProductCategory>) => {
  const queryClient = useQueryClient()

  // Fetch category with theme using our custom route
  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryFn: () => sdk.client.fetch(`/admin/product-categories/${category.id}`),
    queryKey: ["category", category.id, "with-theme"],
  })

  const currentTheme =
    (categoryData?.product_category as AdminProductCategoryWithTheme)?.theme ||
    null

  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(
    currentTheme?.id || null
  )

  // Update selectedThemeId when currentTheme changes
  useEffect(() => {
    if (!isLoadingCategory && currentTheme?.id !== selectedThemeId) {
      setSelectedThemeId(currentTheme?.id || null)
    }
  }, [currentTheme?.id, isLoadingCategory, selectedThemeId])

  // Fetch all themes
  const { data: themesData, isLoading: isLoadingThemes } = useQuery<{
    themes: Theme[]
  }>({
    queryFn: () => sdk.client.fetch("/admin/themes"),
    queryKey: ["themes"],
  })

  const themes = themesData?.themes || []

  // Update theme link mutation
  const updateThemeMutation = useMutation({
    mutationFn: async (themeId: string | null) => {
      if (!themeId) {
        // Remove link by updating theme with null category_id
        // First, we need to find the current link and dismiss it
        const currentCategoryData = await sdk.client.fetch(
          `/admin/product-categories/${category.id}`
        )
        const currentThemeId =
          (currentCategoryData?.product_category as AdminProductCategoryWithTheme)
            ?.theme?.id

        if (currentThemeId) {
          // Update theme to remove category link
          await sdk.client.fetch(`/admin/themes/${currentThemeId}`, {
            method: "POST",
            body: {
              category_id: null,
            },
          })
        }
        return null
      }

      // Update theme to link to this category
      await sdk.client.fetch(`/admin/themes/${themeId}`, {
        method: "POST",
        body: {
          category_id: category.id,
        },
      })

      return themeId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", category.id, "with-theme"],
      })
      queryClient.invalidateQueries({
        queryKey: ["themes"],
      })
    },
  })

  const handleThemeChange = (themeId: string) => {
    setSelectedThemeId(themeId)
    updateThemeMutation.mutate(themeId)
  }

  const handleRemoveTheme = () => {
    setSelectedThemeId(null)
    updateThemeMutation.mutate(null)
  }

  if (isLoadingCategory || isLoadingThemes) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Theme</Heading>
        </div>
        <div className="px-6 py-4">
          <Text size="small">Loading...</Text>
        </div>
      </Container>
    )
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Theme</Heading>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <Text
            size="small"
            weight="plus"
            leading="compact"
            className="mb-2 block"
          >
            Select Theme
          </Text>
          <Select
            value={selectedThemeId || ""}
            onValueChange={handleThemeChange}
          >
            <Select.Trigger>
              <Select.Value placeholder="No theme selected" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="">None</Select.Item>
              {themes.map((theme) => (
                <Select.Item key={theme.id} value={theme.id}>
                  {theme.name}
                  {theme.is_active && " (Active)"}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        {currentTheme && (
          <div
            className={clx(
              "text-ui-fg-subtle grid grid-cols-2 items-center gap-2 pt-2 border-t"
            )}
          >
            <Text size="small" weight="plus" leading="compact">
              Current Theme
            </Text>
            <div className="flex items-center justify-between">
              <Text size="small" leading="compact">
                {currentTheme.name}
              </Text>
              <Button
                size="small"
                variant="transparent"
                onClick={handleRemoveTheme}
                disabled={updateThemeMutation.isPending}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        {updateThemeMutation.isPending && (
          <Text size="small" className="text-ui-fg-subtle">
            Updating...
          </Text>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product_category.details.side.before",
})

export default CategoryThemeSelectorWidget

