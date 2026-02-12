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

## Current Plan: Add YouTube Video Links

### Steps
1.  **Update Blueprint**: The `blueprint.md` will be updated to include the new YouTube video link feature.
2.  **Request Video Data**: The `searchRecipes` method in `main.js` will be modified to request video information from the Spoonacular API.
3.  **Display Video Link**: The `displayRecipes` method will be updated to include a link to the YouTube video on each recipe card. If a video is not available for a recipe, the link will not be displayed.
