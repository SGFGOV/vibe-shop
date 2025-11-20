import { ThumbnailBadge } from "@medusajs/icons"

type CategoryImageItemProps = {
  id: string
  url: string
  alt: string
  isThumbnail: boolean
  isSelected?: boolean
  onSelect?: (id: string) => void
  onDelete?: (id: string) => void
}

export const CategoryImageItem = ({
  id,
  url,
  alt,
  isThumbnail,
  isSelected = false,
  onSelect,
  onDelete,
}: CategoryImageItemProps) => {
  return (
    <div
      className="shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full overflow-hidden rounded-lg outline-none"
    >
      {isThumbnail && (
        <div className="absolute left-2 top-2 z-10">
          <ThumbnailBadge />
        </div>
      )}
      {onSelect && (
        <div className="absolute right-2 top-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(id)}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(id)}
          className="absolute right-2 bottom-2 z-10 rounded bg-red-500 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          Delete
        </button>
      )}
      <img
        src={url}
        alt={alt}
        className="size-full object-cover object-center"
      />
    </div>
  )
}

