"use client";
import { useRecipesStore } from "@/store/recipes";
import PaginadorRecetas from "./PaginadorRecetas";
import { useEffect } from "react";

const Tablero = () => {
  const recipes = useRecipesStore((state) => state.recipes);
  const fetchRecipes = useRecipesStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="flex justify-center items-center mt-4 relative">
      <div className="w-[90%] h-[70vh] xl:h-[80vh] bg-[#fffaeb] rounded-2xl border-2 border-orange-800 overflow-y-scroll">
        {recipes.length > 0 ? (
          <div className="mt-5">
            <PaginadorRecetas elementos={recipes} />
          </div>
        ) : (
          <div className="flex justify-center mt-40 sm:mt-32 lg:mt-24">
            <div className="loader w-36 sm:w-44 md:w-48 lg:w-52 xl:w-60" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tablero;
