# Draw on Google Map

## Overview

Draw on Google Map is a React-based web application that integrates with the Google Maps API to provide an interactive map experience. Users can view a map, change marker locations, and draw lines and polygons directly on the map.

## Features

- **Interactive Map**: Displays a Google Map using the `@react-google-maps/api` library.
- **Marker Management**: Users can place and move markers on the map.
- **Drawing Tools**: Allows users to draw lines and polygons on the map.

## Preview

![preview](./docs/preview.gif)

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url> <project-name>
   cd <project-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Google Maps API key:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     REACT_APP_GOOGLE_MAPS_MAP_ID=your_map_id_here
     ```

### Running the Application

- Start the development server:
  ```bash
  npm start
  ```

- Open your browser and navigate to `http://localhost:3000`.

### Building for Production

- To create a production build, run:
  ```bash
  npm run build
  ```

## Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm test`: Runs the test suite using Jest.

## Code Structure

- **src/components/Map**: Contains the main map component and related utilities.
- **src/components/Head**: Header component for the application.
- **public/index.html**: The main HTML file.
- **webpack.config.js**: Webpack configuration for bundling the application.

## License

This project is licensed under the ISC License.

## Author

Gordon
