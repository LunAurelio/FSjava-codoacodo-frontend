// URL base de la API y la clave de autenticación
const API_SERVER = 'https://api.themoviedb.org/3';
const API_KEY = '699c23321da638ddbe363d1a56bf0cbd';

// Opciones para las solicitudes fetch
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

// Función para cargar películas en tendencia
const loadTrendingMovies = async (page = 1) => {
    try {    
        const response = await fetch(`${API_SERVER}/movie/popular?page=${page}&api_key=${API_KEY}`, options);    
        const data = await response.json();       
        const movies = data.results;        
        const trendsContainer = document.querySelector('#trends .container');
        trendsContainer.innerHTML = '';

        // Itera sobre cada película y crea un elemento de tarjeta para mostrarla
        movies.forEach(movie => {
            const anchor = document.createElement('a');
            anchor.href = './pages/detailsFilms.html';
            const movieCard = document.createElement('div');
            movieCard.classList.add('card', 'img-fluid');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            img.classList.add('img-fluid');
            img.alt = movie.title;
            anchor.appendChild(movieCard);
            movieCard.appendChild(img);
            trendsContainer.appendChild(anchor);
        });

        // Actualiza el atributo data-page del contenedor padre con el número de página actual
        trendsContainer.parentElement.setAttribute('data-page', page);
    } catch (error) {
        console.error('Error loading trending movies:', error);
    }
};

// Función para cargar películas aclamadas
const loadTopRatedMovies = async () => {
    try {       
        const response = await fetch(`${API_SERVER}/movie/top_rated?api_key=${API_KEY}`, options);    
        const data = await response.json();       
        const movies = data.results;
        const acclaimedContainer = document.querySelector('#acclaimedFilms .container-acclaimed');
        acclaimedContainer.innerHTML = '';

        // Itera sobre cada película y crea un elemento de tarjeta para mostrarla
        movies.forEach(movie => {
            const anchor = document.createElement('a');
            anchor.href = './pages/detailsFilms.html';
            const movieCard = document.createElement('div');
            movieCard.classList.add('card', 'img-fluid');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            img.classList.add('img-fluid');
            img.alt = movie.title;
            anchor.appendChild(movieCard);
            movieCard.appendChild(img);
            acclaimedContainer.appendChild(anchor);
        });
    } catch (error) {
        console.error('Error loading top-rated movies:', error);
    }
};

// Manejo de eventos para los botones de página anterior y siguiente
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const trendsSection = document.getElementById('trends');

previousButton.addEventListener('click', () => {
    let currentPage = Number(trendsSection.getAttribute('data-page'));
    // Verifica si la página actual es mayor que 1 antes de cargar la página anterior
    if (currentPage <= 1) return;
    loadTrendingMovies(currentPage - 1);
});

nextButton.addEventListener('click', () => {
    let currentPage = Number(trendsSection.getAttribute('data-page'));
    // Carga la página siguiente al hacer clic en el botón "Siguiente"
    loadTrendingMovies(currentPage + 1);
});

// Carga las películas en tendencia y las películas aclamadas al cargar el documento HTML
document.addEventListener('DOMContentLoaded', () => {
    loadTrendingMovies();
    loadTopRatedMovies();
});
