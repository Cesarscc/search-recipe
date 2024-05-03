"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "animate.css";
import { useRecipesStore } from "@/store/recipes";
import ModalSave from "./ModalSave";
import ModalUnSaved from "./ModalUnSaved";

const RecipeDetail = ({ isSaved, recipe, closeModal }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  const saveRecipe = useRecipesStore((state) => state.saveRecipe);
  const unSavedRecipe = useRecipesStore((state) => state.unSavedRecipe);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSaveRecipe = (recipe) => {
    saveRecipe(recipe);
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
    closeModal();
  };

  const [isOpenModalQuitar, setIsOpenModalQuitar] = useState(false);

  const handleUnSavedRecipe = (recipe) => {
    unSavedRecipe(recipe);
    setIsOpenModalQuitar(true);
  };

  const handleModalCloseUnSaved = () => {
    closeModal();
    setIsOpenModalQuitar(false);
  };

  return (
    <>
      <div
        className={`cursor-default fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 animate__animated animate__fadeIn animate__faster z-40 ${
          isOpenModalQuitar ? "hidden" : "block"
        }`}
      >
        <div
          ref={modalRef}
          className="bg-[#fdf2c5] w-full mx-5 h-[90%] lg:h-[85%] p-4 rounded-[40px] xl:rounded-[75px]"
        >
          <h1 className="text-[20px] sm:text-[22px] xl:text-[50px] 2xl:text-[70px] font-semibold text-[#7c4212] text-center underline">
            {recipe?.nombre}
          </h1>
          <div className="flex flex-col md:flex-row xl:justify-evenly gap-12 xl:gap-5">
            <div className="w-full xl:w-[40%] h-[33vh] md:h-[35vw] xl:h-[30vw] 2xl:h-full">
              <Image
                className="inset-0 w-full h-full object-cover rounded-[16px]"
                src={`https://source.unsplash.com/collection/2533969/500x300/?${recipe?.nombre}`}
                alt={recipe?.nombre}
                width={528}
                height={433}
              />
              <div className="flex justify-between">
                {!isSaved ? (
                  <button
                    className="w-36 mt-2 border-2 border-yellow-500 rounded-md bg-[#fee28a] text-[#815e3b] font-semibold hover:bg-[#fac215] hover:transition-all hover:delay-100 hover:animate-pulse"
                    onClick={() => handleSaveRecipe(recipe)}
                  >
                    Guardar Receta
                  </button>
                ) : (
                  <button
                    className="w-36 mt-2 border-2 border-[#dc2626] rounded-md bg-[#fee2e2] text-[#b91c1c] font-semibold hover:bg-[#f87171] hover:transition-all hover:delay-100 hover:animate-pulse"
                    onClick={() => handleUnSavedRecipe(recipe)}
                  >
                    Quitar Receta
                  </button>
                )}

                <div className="bg-[#ffd9b3] w-36 rounded-md border-2 border-[#7c4212] mt-2">
                  <h3 className="text-base text-[#815e3b] text-center font-semibold">
                    {recipe?.tipo}
                  </h3>
                </div>
              </div>
            </div>
            <div
              className="w-full xl:w-[60%] text-left border border-[#7c4212] shadow-md space-y-2 xl:space-y-4 rounded-lg overflow-y-scroll md:overflow-hidden max-h-[300px] h-[100vh] md:max-h-max md:h-auto"
              style={{ backgroundColor: "rgba(247, 190, 40, 0.25)" }}
            >
              <div className="overflow-hidden">
                <div>
                  <h2 className="text-base xl:text-2xl font-semibold text-[#441a04]">
                    Descripción:
                  </h2>
                  <p className="text-sm xl:text-base 2xl:text-lg font-medium text-[#f19e0f]">
                    {recipe?.descripcion}
                  </p>
                </div>
                <div>
                  <h2 className="text-base xl:text-2xl font-semibold text-[#441a04]">
                    Ingredientes:
                  </h2>
                  <p className="text-sm xl:text-base 2xl:text-lg font-medium text-[#f19e0f]">
                    {recipe?.ingredientes}
                  </p>
                </div>
                <div>
                  <h2 className="text-base xl:text-2xl font-semibold text-[#441a04]">
                    Preparación:
                  </h2>
                  <p className="text-sm xl:text-base 2xl:text-lg font-medium text-[#f19e0f]">
                    {recipe?.preparacion}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <h2 className="text-base xl:text-2xl font-semibold text-[#441a04]">
                    Calorias:
                  </h2>
                  <p className="text-sm xl:text-lg font-medium text-[#f19e0f] mt-1">
                    {recipe?.nutricional}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isOpenModal && <ModalSave closeModalAlert={handleModalClose} />}
        </div>
      </div>
      {isOpenModalQuitar && (
        <ModalUnSaved closeModalAlert={handleModalCloseUnSaved} />
      )}
    </>
  );
};

export default RecipeDetail;
