"use client";

import update from "immutability-helper";
import { useCallback } from "react";
import Card from "./Card";

interface ContainerProps {
  setImageUrl: (url: string | string[]) => void;
  imageUrl: string[];
  handleRemoveImage: (img: string) => void;
}

const Container = ({
  setImageUrl,
  imageUrl,
  handleRemoveImage,
}: ContainerProps) => {
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setImageUrl(
        update(imageUrl, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, imageUrl[dragIndex]],
          ],
        })
      );
    },
    [imageUrl, setImageUrl]
  );

  const renderCard = useCallback(
    (card: string, i: number) => {
      return (
        <Card
          key={i + 1}
          index={i}
          id={card}
          moveCard={moveCard}
          image={card}
          handleRemoveImage={handleRemoveImage}
        />
      );
    },
    [moveCard, handleRemoveImage]
  );
  
  return <>{imageUrl.map((card, i) => renderCard(card, i))}</>;
};

export default Container;

