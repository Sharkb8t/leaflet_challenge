// Step 1: Create the base map
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Step 2: Initialize the map
let map = L.map("map", {
  center: [37.09, -95.71], // Centered over the US
  zoom: 5,
  layers: [basemap]
});

// Step 3: Fetch Earthquake Data from the Monthly USGS API
let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(earthquakeURL).then(function(data) {

  // Function to determine marker color based on depth
  function getColor(depth) {
      return depth > 90 ? "#ff3333" :
             depth > 70 ? "#ff6633" :
             depth > 50 ? "#ff9933" :
             depth > 30 ? "#ffcc33" :
             depth > 10 ? "#ffff33" :
                          "#99ff33";
  }

  // Function to determine marker size based on magnitude
  function getRadius(magnitude) {
      return magnitude ? magnitude * 4 : 1;
  }

  // Function to format timestamp into human-readable date
  function formatDate(timestamp) {
      let date = new Date(timestamp);
      return date.toLocaleString(); // Converts to local date and time
  }

  // Style function for markers
  function styleInfo(feature) {
      return {
          radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.geometry.coordinates[2]), // Depth
          color: "#000",
          weight: 0.5,
          opacity: 1,
          fillOpacity: 0.7
      };
  }

  // Create GeoJSON layer and add to map
  L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
          layer.bindPopup(`
              <strong>Magnitude:</strong> ${feature.properties.mag}<br>
              <strong>Location:</strong> ${feature.properties.place}<br>
              <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km<br>
              <strong>Date & Time:</strong> ${formatDate(feature.properties.time)}
          `);
      }
  }).addTo(map);
});

// Step 4: Add a formatted legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  let div = L.DomUtil.create("div", "info legend");
  let depths = [-10, 10, 30, 50, 70, 90];
  let colors = ["#99ff33", "#ffff33", "#ffcc33", "#ff9933", "#ff6633", "#ff3333"];

  // Legend title
  div.innerHTML += "<h4>Depth (km)</h4>";

  // Loop through depth categories to create color-coded legend items
  for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
          `<div style="display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background:${colors[i]}; margin-right: 5px;"></div>
              ${depths[i]} ${depths[i + 1] ? `&ndash; ${depths[i + 1]} km` : "+ km"}
          </div>`;
  }

  return div;
};

// Add legend to map
legend.addTo(map);
