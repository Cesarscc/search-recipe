import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

let API_URL = "";
// Verifica si estamos en el navegador antes de acceder a window
if (typeof window !== "undefined") {
  // Detectar si estamos en producción o local y establecer la URL de la API en consecuencia
  if (window.location.hostname === "cesarscc-recipes-peruvians.netlify.app") {
    API_URL = "https://cesarscc-recipes-peruvians.netlify.app/";
  } else {
    API_URL = "http://localhost:3000/";
  }
}

export const useRecipesStore = create()(
  devtools(
    persist(
      (set, get) => {
        return {
          originalRecipes: [], // Estado para las recetas originales
          recipes: [], // Estado para las recetas filtradas
          uniqueIngredients: [],
          recipesSave: [],
          selectedIngredient: false,
          changeSelected: () => {
            const { selectedIngredient } = get();
            set({ selectedIngredient: !selectedIngredient });
          },
          fetchRecipes: async () => {
            const res = await fetch(`${API_URL}data.json`);
            const json = await res.json();
            const recipes = json;
            set({ originalRecipes: recipes, recipes }, false, "FETCH_RECIPES");
          },
          searchIngredient: (ingredient) => {
            const { originalRecipes } = get();
            const recipesClone = structuredClone(originalRecipes);
            if (ingredient !== "" && ingredient != "todos") {
              let filteredRecipes = recipesClone.filter((recipe) =>
                recipe.ingredientes
                  .toLowerCase()
                  .includes(ingredient.toLowerCase())
              );
              set({ recipes: filteredRecipes });
            } else {
              set({ recipes: originalRecipes });
            }
          },
          saveRecipe: (dataRecipe) => {
            const { recipesSave } = get();
            const newData = structuredClone(recipesSave);
            newData.push(dataRecipe);
            const objetoAuxiliar = {};
            const dataSave = newData.filter((objeto) => {
              if (!objetoAuxiliar[objeto.nombre]) {
                objetoAuxiliar[objeto.nombre] = true;
                return true;
              }
              return false;
            });
            set({ recipesSave: dataSave });
          },
          unSavedRecipe: (dataRecipe) => {
            const { recipesSave } = get();
            const newRecipesSave = recipesSave.filter(
              (recipeSave) => recipeSave.nombre != dataRecipe.nombre
            );
            set({ recipesSave: newRecipesSave });
          },
          reset: () => {
            set({ recipesSave: [] }, false, "RESET_SAVE_RECIPES");
          },
        };
      },
      {
        name: "recipes",
      }
    )
  )
);
