const html_script = `


<!DOCTYPE html>
<html lang="en">
<head>
	<base target="_top">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>Quick Start - Leaflet</title>
	
	<link 
	rel="stylesheet" 
	href="http://cdn.leafletjs.com/leaflet-0.7/leaflet.css"
/>
<style>
	body {
		padding: 0;
		margin: 0;
	}
	html, body, #map {
		height: 100%;
		width: 100%;
	}
</style>
</head>
<body>
<div id="map"></div>

<script
	src="http://cdn.leafletjs.com/leaflet-0.7/leaflet.js">
</script>
<script>

	const map = L.map('map').setView([39.6054, -8.4133], 15);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	const marker = L.marker([39.60359, -8.41897]).addTo(map)
		.bindPopup('<b>Olá!</b><br />Sou o Convento de Cristo!').openPopup();


	
</script>



</body>
</html>


`

export default html_script