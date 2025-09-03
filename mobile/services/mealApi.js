const Base_Url = "https://www.themealdb.com/api/json/v1/1";

export const MealAPI = {
  // search meal by name
  searchMealByName: async (query) => {
    try {
      const response = await fetch(
        `${Base_Url}/search.php?s=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (err) {
      console.error("Error searching meal by name: ", err);
      return [];
    }
  },

  // lookup full meal detail by id
  getMealById: async (id) => {
    try {
      const response = fetch(`${Base_Url}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (err) {
      console.error("Error getting meal by id: ", err);
      return null;
    }
  },

  // lookup single random meal
  getRandom: async () => {
    try {
      const response = await fetch(`${Base_Url}/random.php`);

      // console.log(response)
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (err) {
      console.error("Error getting random meals", err);
      return null;
    }
  },

  // get multiple random meal
  getRandomMeals: async (count = 6) => {
    try {
      const promise = Array(count)
        .fill()
        .map(() => MealAPI.getRandom());

      const meals = await Promise.all(promise);
      return meals.filter((meal) => meal !== null);
    } catch (err) {
      console.error("Error getting random meal: ", err);
      return [];
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const response = await fetch(`${Base_Url}/categories.php`);
      // console.log(response)
      const data = await response.json();
      return data.categories || [];
    } catch (err) {
      console.error("Error getting Categories: ", err);
      return [];
    }
  },

  // filter by Ingridents
  filterByIngridents: async (ingrident) => {
    try {
      const response = await fetch(
        `${Base_Url}/filter.php?i=${encodeURIComponent(ingrident)}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (err) {
      console.error("Error filtering by ingridents: ", err);
      return [];
    }
  },

  // filter by categories
  filterByCategories: async (category) => {
    try {
      const response = await fetch(
        `${Base_Url}/filter.php?i=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      return data.meals || [];
    } catch (err) {
      console.error("Error filtering Categories: ", err);
      return [];
    }
  },

  transformMealData: (meal) => {
    if (!meal) return null;

    const ingredients = [];
    for (let i = 1; i < 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const measureText =
          measure && measure.trim() ? `${measure.trim()} ` : "";
        ingredients.push(`${measureText}${ingredient.trim()}`);
      }
    }

    const instructions = meal.strInstructions
      ? meal.strInstructions.split(/\r?\n/).filter((step) => step.trim())
      : [];

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strInstructions
        ? meal.strInstructions.substring(0, 120) + "..."
        : "Delicious meal from TheMealDB",
      image: meal.strMealThumb,
      cookTime: "30 minutes",
      servings: 4,
      category: meal.strCategory || "Main Course",
      area: meal.strArea,
      ingredients,
      instructions,
      originalData: meal,
    };
  },


};
