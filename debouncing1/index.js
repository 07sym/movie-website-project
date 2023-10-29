// Debouncing function
function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}


function searchMovies(query) {
    const apiKey = '32835c19';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (data.Search) {
                data.Search.forEach(movie => {
                    const movieTitle = movie.Title;
                    const moviePoster = movie.Poster;

                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');

                    const titleElement = document.createElement('h2');
                    titleElement.textContent = movieTitle;

                    const posterElement = document.createElement('img');
                    posterElement.src = moviePoster;

                    movieCard.appendChild(titleElement);
                    movieCard.appendChild(posterElement);

                    resultsContainer.appendChild(movieCard);
                });
            } else {
                resultsContainer.textContent = 'No results found.';
            }
        })
        .catch(error => console.error('Error:', error));
}


const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', debounce(function () {
    const query = searchInput.value;
    if (query.length >= 3) {
        searchMovies(query);
    }
}, 500))
