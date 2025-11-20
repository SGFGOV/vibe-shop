"use client"

import { useState } from "react"
import { defineRouteConfig } from "@medusajs/admin-sdk"
import {
  Container,
  Heading,
  Button,
  Table,
  Badge,
  FocusModal,
  Input,
  Textarea,
  usePrompt,
} from "@medusajs/ui"
import { PencilSquare, Plus, Trash } from "@medusajs/icons"
import { useForm } from "react-hook-form"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as zod from "zod"
import { sdk } from "../../../lib/sdk"

// Theme type
type Theme = {
  id: string
  name: string
  settings: Record<string, unknown>
  is_active: boolean
  created_at?: string
  updated_at?: string
}

// Validation schema
const themeSchema = zod.object({
  name: zod.string().min(1, "Theme name is required"),
  settings: zod.record(zod.unknown()),
})

type ThemeFormData = zod.infer<typeof themeSchema>

const ThemeSettingsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null)
  const prompt = usePrompt()
  const queryClient = useQueryClient()

  const form = useForm<ThemeFormData>({
    defaultValues: {
      name: "",
      settings: {},
    },
  })

  // Fetch themes using Tanstack Query
  const { data, isLoading } = useQuery<{ themes: Theme[] }>({
    queryFn: () => sdk.client.fetch("/admin/themes"),
    queryKey: ["themes"],
  })

  const themes = data?.themes || []

  // Create theme mutation
  const createMutation = useMutation({
    mutationFn: async (data: ThemeFormData) => {
      return sdk.client.fetch("/admin/themes", {
        method: "POST",
        body: {
          name: data.name,
          settings: data.settings,
          is_active: false,
        },
      })
    },
    onSuccess: () => {
      setIsCreateModalOpen(false)
      form.reset()
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      // Success notification will be handled by UI
    },
    onError: (error: Error) => {
      console.error("Failed to create theme:", error)
      // Error notification will be handled by UI
    },
  })

  const handleCreate = form.handleSubmit((data) => {
    createMutation.mutate(data)
  })

  // Update theme mutation
  const updateMutation = useMutation({
    mutationFn: async (data: ThemeFormData & { id: string }) => {
      return sdk.client.fetch(`/admin/themes/${data.id}`, {
        method: "POST",
        body: {
          name: data.name,
          settings: data.settings,
        },
      })
    },
    onSuccess: () => {
      setIsEditModalOpen(false)
      setEditingTheme(null)
      form.reset()
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      // Success notification will be handled by UI
    },
    onError: (error: Error) => {
      console.error("Failed to update theme:", error)
      // Error notification will be handled by UI
    },
  })

  const handleUpdate = form.handleSubmit((data) => {
    if (!editingTheme) return
    updateMutation.mutate({ ...data, id: editingTheme.id })
  })

  // Delete theme mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return sdk.client.fetch(`/admin/themes/${id}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      // Success notification will be handled by UI
    },
    onError: (error: Error) => {
      console.error("Failed to delete theme:", error)
      // Error notification will be handled by UI
    },
  })

  const handleDelete = async (theme: Theme) => {
    const confirmed = await prompt({
      title: "Delete Theme",
      description: `Are you sure you want to delete "${theme.name}"? This action cannot be undone.`,
    })

    if (!confirmed) return
    deleteMutation.mutate(theme.id)
  }

  // Set active theme mutation
  const setActiveMutation = useMutation({
    mutationFn: async (id: string) => {
      return sdk.client.fetch(`/admin/themes/${id}`, {
        method: "POST",
        body: {
          is_active: true,
        },
      })
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["themes"] })
      // Success notification will be handled by UI
    },
    onError: (error: Error) => {
      console.error("Failed to set active theme:", error)
      // Error notification will be handled by UI
    },
  })

  const handleSetActive = (theme: Theme) => {
    setActiveMutation.mutate(theme.id)
  }

  // Open edit modal
  const openEditModal = (theme: Theme) => {
    setEditingTheme(theme)
    form.reset({
      name: theme.name,
      settings: theme.settings,
    })
    setIsEditModalOpen(true)
  }

  // Parse settings JSON
  const getSettingsJson = (settings: Record<string, unknown>): string => {
    try {
      return JSON.stringify(settings, null, 2)
    } catch {
      return "{}"
    }
  }

  // Parse JSON to settings
  const parseSettingsJson = (json: string): Record<string, unknown> => {
    try {
      return JSON.parse(json)
    } catch {
      return {}
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Theme Settings</Heading>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus /> Create Theme
        </Button>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8">Loading themes...</div>
        ) : themes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No themes found. Create your first theme to get started.
          </div>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Settings</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {themes.map((theme) => (
                <Table.Row key={theme.id}>
                  <Table.Cell className="font-medium">{theme.name}</Table.Cell>
                  <Table.Cell>
                    {theme.is_active ? (
                      <Badge color="green">Active</Badge>
                    ) : (
                      <Badge color="grey">Inactive</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="max-w-xs truncate">
                    {Object.keys(theme.settings || {}).length} sections
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-end gap-2">
                      {!theme.is_active && (
                        <Button
                          variant="transparent"
                          size="small"
                          onClick={() => handleSetActive(theme)}
                        >
                          Set Active
                        </Button>
                      )}
                      <Button
                        variant="transparent"
                        size="small"
                        onClick={() => openEditModal(theme)}
                      >
                        <PencilSquare />
                      </Button>
                      <Button
                        variant="transparent"
                        size="small"
                        onClick={() => handleDelete(theme)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      {/* Create Modal */}
      <FocusModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Heading level="h2">Create Theme</Heading>
          </FocusModal.Header>
          <form onSubmit={handleCreate}>
            <FocusModal.Body>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Theme Name</label>
                  <Input
                    {...form.register("name")}
                    placeholder="e.g., storeCustomizationSetting"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Settings (JSON)</label>
                  <Textarea
                    {...form.register("settings", {
                      setValueAs: (value) => {
                        if (typeof value === "string") {
                          return parseSettingsJson(value)
                        }
                        return value
                      },
                    })}
                    placeholder='{"common": {"active_theme": "Grocery"}, "home": {...}}'
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Enter theme settings as JSON. This will be used to customize your storefront.
                  </p>
                </div>
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end gap-2">
                <FocusModal.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </FocusModal.Close>
                <Button type="submit">Create Theme</Button>
              </div>
            </FocusModal.Footer>
          </form>
        </FocusModal.Content>
      </FocusModal>

      {/* Edit Modal */}
      <FocusModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <Heading level="h2">Edit Theme</Heading>
          </FocusModal.Header>
          <form onSubmit={handleUpdate}>
            <FocusModal.Body>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Theme Name</label>
                  <Input
                    {...form.register("name")}
                    placeholder="e.g., storeCustomizationSetting"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Settings (JSON)</label>
                  <Textarea
                    {...form.register("settings", {
                      setValueAs: (value) => {
                        if (typeof value === "string") {
                          return parseSettingsJson(value)
                        }
                        return value
                      },
                    })}
                    placeholder='{"common": {"active_theme": "Grocery"}, "home": {...}}'
                    rows={15}
                    className="font-mono text-sm"
                    defaultValue={editingTheme ? getSettingsJson(editingTheme.settings) : ""}
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Enter theme settings as JSON. This will be used to customize your storefront.
                  </p>
                </div>
              </div>
            </FocusModal.Body>
            <FocusModal.Footer>
              <div className="flex items-center justify-end gap-2">
                <FocusModal.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </FocusModal.Close>
                <Button type="submit">Update Theme</Button>
              </div>
            </FocusModal.Footer>
          </form>
        </FocusModal.Content>
      </FocusModal>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Theme",
})

export default ThemeSettingsPage

