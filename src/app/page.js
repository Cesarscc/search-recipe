import BanderaPe from "@/components/BanderaPe";
import SaveRecipes from "@/components/SaveRecipes";
import SelectIngredient from "@/components/SelectIngredient";
import Tablero from "@/components/Tablero";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-amber-300 via-yellow-200 to-orange-100 h-[100vh]">
      <div className="flex flex-col md:flex-row justify-evenly">
        <SelectIngredient />
        <div className="flex justify-center md:justify-center items-center gap-3 pt-5 md:w-1/2">
          <h1 className="font-semibold text-lg xl:text-2xl text-[#7c4212]">
            Recetario de Comidas Peruanas
          </h1>
          <BanderaPe />
        </div>
        <SaveRecipes />
      </div>
      <Tablero />
    </main>
  );
}
