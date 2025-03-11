# Leaflet Earthquake Visualization

## 📖 Overview
This project visualizes real-time earthquake data using **Leaflet.js** and **D3.js**. The data is sourced from the [USGS GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and displayed as interactive markers on a **Leaflet map**. The application also includes **tectonic plate boundaries** for enhanced visualization.

## 📌 Features

- 🌍 **Earthquake Data Visualization**: Displays recent earthquakes from the **past month** with **circle markers**.

- 🎨 **Depth-based Coloring**: Markers change color based on earthquake depth.

- 🔎 **Magnitude-based Sizing**: Larger circles indicate higher magnitude earthquakes.

- 🗺️ **Multiple Base Maps**: Users can toggle between **Street Map, Satellite Map, and Greyscale Map**.

- 📑 **Layer Control**: Enables switching between **earthquake data** and **tectonic plate boundaries**.

- 📌 **Popups with Details**: Displays **magnitude, location, depth, and date/time** when a marker is clicked.

- 🎭 **Legend**: Provides color reference for earthquake depth.

## 🖥️ Technologies Used

- **JavaScript (ES6)**

- **Leaflet.js** (Map rendering)

- **D3.js** (Fetching and handling GeoJSON data)

- **HTML5 & CSS3**

- **USGS GeoJSON API** (Earthquake data source)

- **GitHub GeoJSON** (Tectonic plate boundaries)

## 🗄️ Repository Structure
```
📁 leaflet-challenge/
│── 📂 Leaflet-Part-1/
│   │── 🗒️ index.html       # Main HTML file containing the map container
│   │── 📂 static/
│   │   ├── 📂 css/
│   │   │   ├── 📘 style.css  # Styling for the map and legend
│   │   ├── 📂 js/
│   │   │   ├── 📙 logic.js   # JavaScript file containing Leaflet and D3 logic
│── 📂 Leaflet-Part-2/      # Optional extension for additional visualization
│   │── 🗒️ index.html
│   │── 📂 static/
│   │   ├── 📂 css/
│   │   │   ├── 📘 style.css
│   │   ├── 📂 js/
│   │   │   ├── 📙 logic.js
```

## 🆚 Differences Between Leaflet-Part-1 and Leaflet-Part-2

### 📓 **Leaflet-Part-1**

- Focuses on **visualizing earthquake data** from the USGS API.

- Uses **circle markers** to represent earthquake magnitude and depth.

- Includes **popups with earthquake details** (location, magnitude, depth, date).

- Provides a **legend** for depth-based coloring.

- Uses a **single base map** with simple visualization.

### 📓 **Leaflet-Part-2**

- **Enhances Part-1** by introducing additional features.

> Adds **tectonic plate boundaries** using external GeoJSON data.

> Implements **multiple base maps** (Street Map, Satellite Map, Greyscale Map).

> Introduces **layer control**, allowing users to toggle **earthquake data** and **tectonic plates**.

> Provides a **more interactive and detailed** visualization experience.

## 🛠️ Installation & Usage

1️⃣ **Clone the Repository**:
   ```sh
   git clone https://github.com/Sharkb8t/leaflet-challenge.git
   ```

2️⃣ **Navigate to the Project Directory**:
   ```sh
   cd leaflet-challenge/Leaflet-Part-1
   ```

3️⃣ **Open `index.html` in a Browser**
   - Simply **double-click** on `index.html` OR
   - Run a local server (for best results):
     ```sh
     python3 -m http.server 8000
     ```
     Then, open `http://localhost:8000` in your browser.

## 💭 How it Works

- **Fetching Data**: `logic.js` fetches earthquake data from the **USGS API**.

- **Processing & Displaying**: D3.js processes the data, and Leaflet.js visualizes it.

- **Styling & Popups**: The depth and magnitude determine marker styles. Clicking a marker displays additional info.

- **Layer Control**: Users can switch between **base maps** and **overlay layers**.

## ℹ️ Credits
- **USGS** - Earthquake data API
- **Fraxen GitHub** - Tectonic plate data
- **Leaflet.js** - Interactive map library
- **D3.js** - Data-driven document manipulation

## 🔖 License
This project is open-source and available under the [MIT License](LICENSE).

