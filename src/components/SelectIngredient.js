"use client";
import { useRecipesStore } from "@/store/recipes";

const SelectIngredient = () => {
  const originalRecipes = useRecipesStore((state) => state.originalRecipes);

  const cloneRecipes = structuredClone(originalRecipes);
  const searchIngredient = useRecipesStore((state) => state.searchIngredient);

  const uniqueIngredients = [
    ...new Set(
      [].concat(
        ...[...cloneRecipes.map((recipe) => recipe.ingredientes.split(","))]
      )
    ),
  ].sort();
  uniqueIngredients.unshift("todos");

  const changeSelected = useRecipesStore((state) => state.changeSelected);

  const handleChangeSelect = (e) => {
    searchIngredient(e.target.value);
    changeSelected();
  };

  return (
    <>
      {originalRecipes.length > 0 && (
        <div className="flex flex-row md:flex-col justify-center gap-3 md:gap-0">
          <label className="block md:mb-2 font-poppins text-white font-semibold text-lg text-center">
            Ingrediente:
          </label>
          <select
            required
            onChange={handleChangeSelect}
            className="appearance-none text-center font-poppins bg-[#ffca2c] text-white font-semibold w-1/2 sm:w-full max-w-xs ml-3 sm:ml-0 md:ml-2 lg:ml-0"
          >
            <option value={""} selected disabled>
              Seleccione Ingrediente
            </option>
            {uniqueIngredients.map((uniqueIngredient, ix) => (
              <option key={ix} value={uniqueIngredient}>
                {uniqueIngredient}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default SelectIngredient;
