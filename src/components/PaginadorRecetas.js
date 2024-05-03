"use client";
import React, { useEffect, useState } from "react";
import FlechaIzq from "@/assets/FlechaIzq";
import FlechaDer from "@/assets/FlechaDer";
import CardRecipe from "./CardRecipe";
import { useRecipesStore } from "@/store/recipes";

const PaginadorRecetas = ({ elementos }) => {
  const selectedIngredient = useRecipesStore(
    (state) => state.selectedIngredient
  );

  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    setPaginaActual(1);
  }, [selectedIngredient]);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  let elementosPorPagina = width < 640 ? 3 : width < 1024 ? 4 : 6;

  // Calcular índices de los elementos que se mostrarán en la página actual
  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = paginaActual * elementosPorPagina;
  const elementosPaginaActual = elementos.slice(indiceInicial, indiceFinal);

  // Manejar evento de avanzar página
  const avanzarPagina = () => {
    if (paginaActual < Math.ceil(elementos.length / elementosPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  // Manejar evento de retroceder página
  const retrocederPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <div className="mx-5 xl:mx-10 2xl:mx-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 2xl:gap-10">
        {elementosPaginaActual.map((recipe, index) => (
          <CardRecipe key={index} data={recipe} />
        ))}
      </div>
      <div className="flex">
        <div className="absolute -bottom-12 z-10 xl:bottom-5 left-5 sm:left-10 lg:left-20 xl:left-[13%]">
          <p className="font-rubik font-semibold text-2xl text-[#ffc34d] brightness-50 text-right">
            {paginaActual}
          </p>
        </div>
        <div className="absolute -bottom-12 z-10 xl:bottom-5 right-5 sm:right-10 lg:right-20 xl:right-[13%] flex gap-5 xl:gap-10">
          <button
            onClick={retrocederPagina}
            disabled={paginaActual === 1}
            className="bg-[#ffe16999] w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            <FlechaIzq />
          </button>
          <button
            onClick={avanzarPagina}
            disabled={
              paginaActual === Math.ceil(elementos.length / elementosPorPagina)
            }
            className="bg-[#ffe16999] w-[40px] h-[40px] rounded-full flex justify-center items-center"
          >
            <FlechaDer />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginadorRecetas;
