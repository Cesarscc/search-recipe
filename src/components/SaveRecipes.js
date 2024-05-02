"use client";
import Folder from "@/assets/Folder";
import { useRecipesStore } from "@/store/recipes";
import React, { useEffect, useRef, useState } from "react";
import ModalAlert from "./ModalAlert";
import RecipeDetail from "./RecipeDetail";

const SaveRecipes = () => {
  const recipesSave = useRecipesStore((state) => state.recipesSave);
  const [seeAction, setSeeAction] = useState(false);
  const modalRef = useRef();

  const closeModal = () => {
    setSeeAction(false);
  };

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

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const openModalAlert = () => {
    setIsOpenAlert(true);
  };

  const closeModalAlert = () => {
    setIsOpenAlert(false);
  };

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [indexCard, setIndexCard] = useState(0);

  const handleViewCard = (ix) => {
    setIndexCard(ix);

    setIsOpenCard(true);
  };

  const handleViewCardClose = () => {
    setIsOpenCard(false);
  };

  return (
    <>
      <div
        ref={modalRef}
        className="relative flex justify-center md:justify-normal items-center gap-2 mt-4 cursor-pointer border-white border-2 rounded-2xl px-2"
        style={{ backgroundColor: "rgba(254, 252, 232,0.6)" }}
        onClick={() => {
          if (recipesSave.length > 0) {
            setSeeAction(!seeAction);
          } else {
            openModalAlert();
          }
        }}
      >
        <div className="flex items-center">
          <Folder />
          <p className="border-[#7c4212] border-2 text-amber-800 font-semibold w-8 h-8 rounded-full bg-yellow-50 flex justify-center items-center">
            {recipesSave.length}
          </p>
        </div>
        <h2 className="text-amber-800 font-semibold">Recetas Guardadas</h2>
        {
          <div
            className={`absolute z-20 top-[45px] opacity-100 left-0 bg-slate-50 w-full duration-500 ease-out overflow-hidden rounded ${
              seeAction ? "h-32 overflow-y-scroll" : "h-0"
            }`}
          >
            {recipesSave.map((recipeSave, ix) => (
              <p
                key={ix}
                className="text-amber-800 text-left bg-[#ffa50026] hover:bg-amber-200 font-semibold text-sm font-poppins"
                onClick={() => handleViewCard(ix)}
              >
                {recipeSave.nombre}
              </p>
            ))}
          </div>
        }
      </div>
      {isOpenAlert && <ModalAlert closeModalAlert={closeModalAlert} />}
      {isOpenCard && (
        <RecipeDetail
          isSaved={true}
          recipe={recipesSave[indexCard]}
          closeModal={handleViewCardClose}
        />
      )}
    </>
  );
};

export default SaveRecipes;
