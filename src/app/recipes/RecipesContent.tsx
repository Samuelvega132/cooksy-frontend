"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Recipe } from "types/recipe";
import RecipeCard from "@/components/recipeCard";
import { fetchFromBackend } from "@/services/index";

export default function RecipesContent() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleViewRecipe = (recipe: Recipe) => {
    localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    router.push("/recipe_detail");
  };

  // ✅ Detectar categoría y búsqueda desde la URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const searchFromUrl = searchParams.get("search");
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
      console.log("🔍 Término de búsqueda desde URL:", searchFromUrl);
    }
  }, [searchParams]);

  // ✅ Fetch de recetas
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchFromBackend<Recipe[]>("/recipes", {
          method: "GET",
          cache: "no-store",
        });

        console.log("📦 Todas las recetas:", data);
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // ✅ Lógica de filtrado
  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
        const ingredientMatch = recipe.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const descriptionMatch = recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return titleMatch || ingredientMatch || descriptionMatch;
      });
    }

    if (selectedCategory && selectedCategory !== "Filtrar por categoría") {
      filtered = filtered.filter(
        (recipe) =>
          recipe.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedDifficulty && selectedDifficulty !== "Filtrar por dificultad") {
      filtered = filtered.filter(
        (recipe) =>
          recipe.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    console.log("🔍 Recetas filtradas:", filtered.length, "de", recipes.length);
    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, recipes]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header moderno */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Todas las Recetas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra colección completa de recetas deliciosas y encuentra tu próxima comida favorita
          </p>
        </div>

        {/* Barra de búsqueda y filtros modernizada */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Buscar recetas, ingredientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-700"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-700 bg-white"
              >
                <option>🍽️ Filtrar por categoría</option>
                <option value="Desayuno">🥐 Desayuno</option>
                <option value="Almuerzo">🍴 Almuerzo</option>
                <option value="Cena">🍝 Cena</option>
                <option value="Postre">🍰 Postre</option>
                <option value="Snack">🍪 Snack</option>
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-700 bg-white"
              >
                <option>📊 Filtrar por dificultad</option>
                <option value="Fácil">🟢 Fácil</option>
                <option value="Intermedio">🟡 Intermedio</option>
                <option value="Difícil">🔴 Difícil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contador de resultados modernizado */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-center">
              {searchTerm ? (
                <>
                  <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> resultados para 
                  <span className="font-bold text-gray-900 mx-1">&quot;{searchTerm}&quot;</span> 
                  de <span className="font-semibold">{recipes.length}</span> recetas totales
                </>
              ) : (
                <>
                  Mostrando <span className="font-semibold text-orange-600">{filteredRecipes.length}</span> de 
                  <span className="font-semibold"> {recipes.length}</span> recetas disponibles
                </>
              )}
            </p>
          </div>
        </div>

        {/* Grid de recetas modernizado */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id || recipe._id} className="transform hover:scale-105 transition-all duration-300">
                <RecipeCard
                  recipeId={recipe.id || recipe._id}
                  title={recipe.title}
                  description={recipe.description}
                  imageUrl={recipe.imageUrl}
                  time={(recipe.prepTime || 0) + (recipe.cookTime || 0)}
                  difficulty={recipe.difficulty}
                  rating={recipe.rating}
                  author={recipe.author}
                  onViewRecipe={() => handleViewRecipe(recipe)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-6xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {searchTerm ? "No encontramos recetas" : "No hay recetas disponibles"}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm 
                    ? `No encontramos recetas que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
                    : "Aún no hay recetas disponibles. ¡Sé el primero en compartir una!"
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      setSelectedDifficulty("");
                    }}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 font-semibold"
                  >
                    Ver todas las recetas
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}