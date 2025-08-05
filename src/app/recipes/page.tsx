import { Suspense } from "react";
import RecipesContent from "./RecipesContent";

// Loading component for the suspense boundary
function RecipesLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Todas las Recetas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora nuestra colección completa de recetas deliciosas y encuentra tu próxima comida favorita
          </p>
        </div>

        {/* Loading filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 bg-gray-50 animate-pulse h-12" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-shrink-0">
              <div className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 animate-pulse h-12 w-48" />
              <div className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 animate-pulse h-12 w-48" />
            </div>
          </div>
        </div>

        {/* Loading grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function RecipesPage() {

  return (
    <Suspense fallback={<RecipesLoading />}>
      <RecipesContent />
    </Suspense>
  );
}
