"use client";
import Image from "next/image";
import { useState } from "react";
import RecipeDetail from "./RecipeDetail";

const CardRecipe = ({ data }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div
        className="relative w-full h-full bg-neutral-200 animation__card rounded-xl cursor-pointer"
        onClick={openModal}
      >
        <Image
          className="h-[35vw] w-[100vw] sm:h-auto rounded-xl"
          src={`https://source.unsplash.com/collection/2533969/500x300/?${data.nombre}`}
          alt={data.nombre}
          width={500}
          height={300}
        />
        <div
          className="absolute bottom-0 flex justify-between w-full px-1 rounded-b-xl"
          style={{ backgroundColor: "rgba(254, 175, 0, 0.6)" }}
        >
          <h1 className="text-sm text-white font-medium truncate">
            {data.nombre}
          </h1>
          <p className="text-sm text-white truncate">{data.nutricional}</p>
        </div>
      </div>
      {isOpenModal && (
        <RecipeDetail isSaved={false} recipe={data} closeModal={closeModal} />
      )}
    </>
  );
};

export default CardRecipe;
