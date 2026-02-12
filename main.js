class RecipePlatform extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shoppingList = new Set();
        this.spoonacularApiKey = '0629d218da794d40a24289e25ad7bbd8';
        this.pexelsApiKey = 'ADD_YOUR_PEXELS_API_KEY_HERE';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --primary-color: #f57c00;
                    --secondary-color: #ffcc80;
                    --text-color: #5d4037;
                    --bg-color: #ffffff;
                    --card-shadow: 0 5px 20px rgba(93, 64, 55, 0.15);
                    --input-border-color: #d7ccc8;
                }
                .container {
                    display: grid;
                    grid-template-areas:
                        'search search'
                        'results shopping-list';
                    grid-template-columns: 2fr 1fr;
                    gap: 30px;
                }
                .search-container {
                    grid-area: search;
                    display: grid;
                    grid-template-columns: 1fr auto auto auto;
                    gap: 15px;
                    align-items: center;
                    background: var(--bg-color);
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: var(--card-shadow);
                }
                #search-input, #cuisine-select, #calorie-input {
                    padding: 12px;
                    border: 1px solid var(--input-border-color);
                    border-radius: 8px;
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box;
                    background-color: #fff;
                    color: var(--text-color);
                }
                #search-input::placeholder, #calorie-input::placeholder {
                    color: #a1887f;
                }
                #search-button {
                    padding: 12px 25px;
                    border: none;
                    border-radius: 8px;
                    background-color: var(--primary-color);
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                #search-button:hover {
                    background-color: #ef6c00;
                }
                .results-container {
                    grid-area: results;
                }
                .shopping-list-container {
                    grid-area: shopping-list;
                    background: #fff3e0;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: var(--card-shadow);
                }
                h2 {
                    margin-top: 0;
                    color: var(--primary-color);
                    border-bottom: 2px solid var(--secondary-color);
                    padding-bottom: 10px;
                    font-weight: 600;
                }
                .recipe-card {
                    background: var(--bg-color);
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: var(--card-shadow);
                    margin-bottom: 25px;
                    position: relative;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .recipe-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 28px rgba(93, 64, 55, 0.2);
                }
                .recipe-card img {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                }
                .recipe-card-content {
                    padding: 20px;
                }
                .recipe-card-content h3 {
                    margin: 0 0 15px 0;
                    color: var(--text-color);
                    font-size: 1.2rem;
                }
                .calorie-count {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(255, 255, 255, 0.8);
                    padding: 5px 10px;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-color);
                }
                .card-buttons {
                    display: flex;
                    gap: 10px;
                }
                .add-to-list-btn, .video-link {
                    padding: 10px 18px;
                    border: none;
                    border-radius: 8px;
                    background-color: var(--secondary-color);
                    color: var(--text-color);
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    text-align: center;
                    transition: background-color 0.3s;
                }
                .add-to-list-btn:hover, .video-link:hover {
                    background-color: #ffb74d;
                }
                #shopping-list ul {
                    list-style-type: none;
                    padding: 0;
                }
                #shopping-list li {
                    padding: 10px 0;
                    border-bottom: 1px solid #ffcc80;
                    color: var(--text-color);
                }
                #shopping-list li:last-child {
                    border-bottom: none;
                }
                #buy-ingredients-btn {
                    margin-top: 20px;
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background-color: var(--primary-color);
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                #buy-ingredients-btn:hover {
                    background-color: #ef6c00;
                }
                #grocery-links ul {
                    list-style-type: none;
                    padding: 0;
                }
                #grocery-links li {
                    padding: 10px 0;
                    border-bottom: 1px solid #ffcc80;
                }
                .grocer-links {
                    margin-top: 5px;
                }
                .grocer-links a {
                    margin-right: 10px;
                    color: var(--primary-color);
                    text-decoration: none;
                    font-weight: 600;
                }
                .grocer-links a:hover {
                    text-decoration: underline;
                }
                @media (max-width: 992px) {
                    .search-container {
                        grid-template-columns: 1fr 1fr;
                    }
                }
                @media (max-width: 768px) {
                    .container {
                        grid-template-areas:
                            'search'
                            'results'
                            'shopping-list';
                        grid-template-columns: 1fr;
                    }
                    .search-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            <div class="container">
                <div class="search-container">
                    <input id="search-input" type="text" placeholder="e.g., Spicy Chicken Noodles">
                    <select id="cuisine-select">
                        <option value="">All Cuisines</option>
                        <option value="Asian">Asian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Thai">Thai</option>
                        <option value="Indonesian">Indonesian</option>
                    </select>
                    <input id="calorie-input" type="number" placeholder="Max calories (e.g., 500)">
                    <button id="search-button">Search</button>
                </div>
                <div class="results-container">
                    <h2>Recipes</h2>
                    <div id="recipe-results"></div>
                </div>
                <div class="shopping-list-container">
                    <h2>Shopping List</h2>
                    <div id="shopping-list"><ul></ul></div>
                    <button id="buy-ingredients-btn" style="display: none;">Buy Ingredients Online</button>
                    <div id="grocery-links"></div>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('search-button').addEventListener('click', () => this.searchRecipes());
        this.shadowRoot.getElementById('buy-ingredients-btn').addEventListener('click', () => this.generateGroceryLinks());
        this.shadowRoot.querySelector('#shopping-list ul').innerHTML = '<li>Your shopping list is empty.</li>';
    }

    async fetchPexelsImage(query) {
        if (!this.pexelsApiKey || this.pexelsApiKey === 'ADD_YOUR_PEXELS_API_KEY_HERE') {
            console.warn('Pexels API key is missing. Using default Spoonacular images.');
            return null;
        }
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=food ${query}&per_page=1`, {
                headers: {
                    Authorization: this.pexelsApiKey
                }
            });
            const data = await response.json();
            return data.photos[0]?.src.large || null;
        } catch (error) {
            console.error('Error fetching Pexels image:', error);
            return null;
        }
    }

    async fetchYoutubeVideo(query) {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/videos/search?apiKey=${this.spoonacularApiKey}&query=${query}&number=1`);
            const data = await response.json();
            return data.videos[0]?.youTubeId ? `https://www.youtube.com/watch?v=${data.videos[0].youTubeId}` : null;
        } catch (error) {
            console.error('Error fetching YouTube video:', error);
            return null;
        }
    }

    async searchRecipes() {
        const query = this.shadowRoot.getElementById('search-input').value;
        const cuisine = this.shadowRoot.getElementById('cuisine-select').value;
        const calories = this.shadowRoot.getElementById('calorie-input').value;
        const resultsContainer = this.shadowRoot.getElementById('recipe-results');
        resultsContainer.innerHTML = '<p>Searching for delicious recipes...</p>';

        let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.spoonacularApiKey}&query=${query}&number=12&addRecipeNutrition=true`;

        if (cuisine) {
            apiUrl += `&cuisine=${cuisine}`;
        }
        if (calories) {
            apiUrl += `&maxCalories=${calories}`;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.displayRecipes(data.results, calories);
        } catch (error) {
            resultsContainer.innerHTML = '<p>Could not fetch recipes. Please check your network connection or API key.</p>';
            console.error('Error fetching recipes:', error);
        }
    }

    async displayRecipes(recipes, calories) {
        const resultsContainer = this.shadowRoot.getElementById('recipe-results');
        resultsContainer.innerHTML = '';

        if (!recipes || recipes.length === 0) {
            if (calories) {
                resultsContainer.innerHTML = `<p>No recipes found matching your search under ${calories} calories. Try a different search!</p>`;
            } else {
                resultsContainer.innerHTML = '<p>No matching recipes found. Try a different search!</p>';
            }
            return;
        }

        for (const recipe of recipes) {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            const pexelsImage = await this.fetchPexelsImage(recipe.title);
            const imageUrl = pexelsImage || recipe.image;
            const calorieInfo = recipe.nutrition.nutrients.find(n => n.name === 'Calories');
            const videoUrl = await this.fetchYoutubeVideo(recipe.title);

            card.innerHTML = `
                <img src="${imageUrl}" alt="${recipe.title}">
                <div class="calorie-count">${Math.round(calorieInfo.amount)} kcal</div>
                <div class="recipe-card-content">
                    <h3>${recipe.title}</h3>
                    <div class="card-buttons">
                        <button class="add-to-list-btn" data-recipe-id="${recipe.id}">Add to Shopping List</button>
                        ${videoUrl ? `<a href="${videoUrl}" target="_blank" class="video-link">Watch Video</a>` : ''}
                    </div>
                </div>
            `;
            card.querySelector('.add-to-list-btn').addEventListener('click', (e) => this.addToShoppingList(e.target.dataset.recipeId));
            resultsContainer.appendChild(card);
        }
    }

    async addToShoppingList(recipeId) {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${this.spoonacularApiKey}`);
            const recipe = await response.json();

            if (recipe && recipe.extendedIngredients) {
                recipe.extendedIngredients.forEach(ingredient => {
                    this.shoppingList.add(ingredient.original);
                });
                this.displayShoppingList();
            } else {
                 alert('Could not retrieve recipe details.');
            }
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            alert('Could not retrieve recipe details.');
        }
    }

    displayShoppingList() {
        const shoppingListUl = this.shadowRoot.querySelector('#shopping-list ul');
        const buyIngredientsBtn = this.shadowRoot.getElementById('buy-ingredients-btn');
        const groceryLinksContainer = this.shadowRoot.getElementById('grocery-links');

        shoppingListUl.innerHTML = '';
        groceryLinksContainer.innerHTML = '';

        if (this.shoppingList.size === 0) {
             shoppingListUl.innerHTML = '<li>Your shopping list is empty.</li>';
             buyIngredientsBtn.style.display = 'none';
        } else {
            this.shoppingList.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                shoppingListUl.appendChild(li);
            });
            buyIngredientsBtn.style.display = 'block';
        }
    }

    generateGroceryLinks() {
        const groceryLinksContainer = this.shadowRoot.getElementById('grocery-links');
        groceryLinksContainer.innerHTML = '<h3>Where to Buy Your Ingredients</h3>';

        const groceryListUl = document.createElement('ul');
        groceryLinksContainer.appendChild(groceryListUl);

        this.shoppingList.forEach(item => {
            const encodedItem = encodeURIComponent(item);

            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item}</span>
                <div class="grocer-links">
                    <a href="https://www.amazon.com/fresh/s?k=${encodedItem}" target="_blank">Amazon Fresh</a>
                    <a href="https://www.instacart.com/store/search/${encodedItem}" target="_blank">Instacart</a>
                    <a href="https://www.walmart.com/search?q=${encodedItem}" target="_blank">Walmart</a>
                </div>
            `;
            groceryListUl.appendChild(li);
        });

        this.shadowRoot.getElementById('buy-ingredients-btn').style.display = 'none';
    }
}

customElements.define('recipe-platform', RecipePlatform);
