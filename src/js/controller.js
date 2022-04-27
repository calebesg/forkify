const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipe = async function () {
  try {
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await response.json();

    if (response.ok === false)
      throw new Error(`ERROR: ${data.message}, STATUS: ${response.status}`);

    const { recipe: dataRecipe } = data.data;

    const recipe = {
      id: dataRecipe.id,
      title: dataRecipe.title,
      cookingTime: dataRecipe.cooking_time,
      publisher: dataRecipe.publisher,
      servings: dataRecipe.servings,
      ingredients: dataRecipe.ingredients,
      imageUrl: dataRecipe.image_url,
      SouceUrl: dataRecipe.source_url,
    };

    console.log(recipe);
  } catch (error) {
    console.error(error.message);
  }
};

getRecipe();
