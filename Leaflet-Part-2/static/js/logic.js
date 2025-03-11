// Step 1: Define Base Maps (Street and Satellite)
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let satelliteMap = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM Hot contributors'
});

let greyscaleMap = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>CARTO</a>'
});

// Step 2: Initialize the map with default settings
let map = L.map("map", {
    center: [37.09, -95.71], // Centered over the US
    zoom: 5,
    layers: [streetMap] // Default base layer
});

// Step 3: Define Layer Groups for Earthquakes & Tectonic Plates
let earthquakeLayer = L.layerGroup();
let tectonicPlatesLayer = L.layerGroup();

// Step 4: Fetch Earthquake Data from the Monthly USGS API
let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(earthquakeURL).then(function(data) {

    function getColor(depth) {
        return depth > 90 ? "#ff3333" :
               depth > 70 ? "#ff6633" :
               depth > 50 ? "#ff9933" :
               depth > 30 ? "#ffcc33" :
               depth > 10 ? "#ffff33" :
                            "#99ff33";
    }

    function getRadius(magnitude) {
        return magnitude ? magnitude * 4 : 1;
    }

    function formatDate(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString(); 
    }

    function styleInfo(feature) {
        return {
            radius: getRadius(feature.properties.mag),
            fillColor: getColor(feature.geometry.coordinates[2]), 
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

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
    }).addTo(earthquakeLayer);

    earthquakeLayer.addTo(map);
});

// Step 5: Fetch & Add Tectonic Plate Boundaries
let tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(tectonicPlatesURL).then(function(data) {
    L.geoJson(data, {
        color: "orange",
        weight: 2
    }).addTo(tectonicPlatesLayer);
});

// Step 6: Add a Formatted Legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ["#99ff33", "#ffff33", "#ffcc33", "#ff9933", "#ff6633", "#ff3333"];

    div.innerHTML += "<h4>Depth (km)</h4>";

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


// Step 7: Add Layer Control (Base Maps & Overlays)
let baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap,
    "Greyscale Map": greyscaleMap
};

let overlayMaps = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicPlatesLayer
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);