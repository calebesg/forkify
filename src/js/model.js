export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();

    if (response.ok === false)
      throw new Error(`ERROR: ${data.message}, STATUS: ${response.status}`);

    const { recipe: dataRecipe } = data.data;

    state.recipe = {
      id: dataRecipe.id,
      title: dataRecipe.title,
      cookingTime: dataRecipe.cooking_time,
      publisher: dataRecipe.publisher,
      servings: dataRecipe.servings,
      ingredients: dataRecipe.ingredients,
      image: dataRecipe.image_url,
      souceUrl: dataRecipe.source_url,
    };

    console.log(state.recipe);
  } catch (error) {
    console.error(error.message);
  }
};
