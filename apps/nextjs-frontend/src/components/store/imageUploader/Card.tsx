"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiXCircle } from "react-icons/fi";
import { ItemTypes } from "./ItemTypes";

interface CardProps {
  id: string;
  image: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveImage: (img: string) => void;
}

interface DragItem {
  id: string;
  index: number;
}

const Card = ({ id, image, index, moveCard, handleRemoveImage }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: unknown }>({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: (): DragItem => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  
  return (
    <div ref={ref} data-handler-id={handlerId as string}>
      <div className="position-relative">
        <img
          className="d-inline-flex border rounded border-light w-25 p-2 m-2"
          src={image}
          alt="product"
        />
        {index === 0 && (
          <p className="small position-absolute py-1 w-100 bottom-0 start-0 bg-primary rounded-pill text-white text-center">
            Default Image
          </p>
        )}
        <button
          type="button"
          className="position-absolute top-0 end-0 text-danger border-0 bg-transparent"
          onClick={() => handleRemoveImage(image)}
        >
          <FiXCircle />
        </button>
      </div>
    </div>
  );
};

export default Card;

