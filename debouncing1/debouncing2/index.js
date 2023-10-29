// Throttling function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Function to fetch and display recipe results
function searchRecipes(query) {
    const apiKey = '1';
    const apiUrl = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (data.meals) {
                data.meals.forEach(recipe => {
                    const recipeName = recipe.strMeal;
                    const recipeThumbnail = recipe.strMealThumb;

                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = recipeName;

                    const thumbnailElement = document.createElement('img');
                    thumbnailElement.src = recipeThumbnail;

                    recipeCard.appendChild(nameElement);
                    recipeCard.appendChild(thumbnailElement);

                    resultsContainer.appendChild(recipeCard);
                });
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Add throttling to the search input field
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', throttle(function () {
    const query = searchInput.value;
    if (query.length >= 3) {
        searchRecipes(query);
    }
}, 1000)); // Adjust the throttle delay as needed
