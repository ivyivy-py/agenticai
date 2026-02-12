# Project Blueprint

## Overview
This project is a platform for users to search for recipes and create a shopping list. The application is built as a modern, framework-less web application using the Spoonacular API for recipe data and the Pexels API for high-quality imagery.

## Implemented Features
- **Web Components**: A `recipe-platform` custom element that encapsulates all application logic.
- **Advanced Recipe Search**: Fetches and filters recipes from the Spoonacular API by query, cuisine, and calorie count.
- **Dynamic Shopping List**: Allows users to generate a shopping list from the ingredients of any selected recipe.
- **Modern Styling**: A responsive, modern design with a warm color scheme and a food-themed header.
- **Pexels Integration**: Uses the Pexels API to display high-quality images for each recipe.
- **Calorie Information**: Displays the calorie count for each recipe.
- **Improved Search Feedback**: Provides specific messages when no recipes are found.
- **YouTube Integration**: Includes links to YouTube cooking videos for recipes.

## Current Plan: Integrate with Online Grocers

### Steps
1.  **Update Blueprint**: The `blueprint.md` will be updated to include the new online grocer integration feature.
2.  **Add "Buy Ingredients" Button**: A "Buy Ingredients" button will be added to the shopping list section.
3.  **Map Ingredients to Products**: When the "Buy Ingredients" button is clicked, the Spoonacular API will be used to map the ingredients in the shopping list to grocery products.
4.  **Display Grocery Products**: The mapped grocery products will be displayed to the user, providing a convenient way to purchase the ingredients online.
