import './viewer.html';
import './viewer.css';

Template.viewer.onRendered(function() {
	var projection = new ol.proj.Projection({
		code: 'EPSG:28992',
		extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
	});
	
	var view = new ol.View({
		projection: projection,
		center: [185411, 334810],
		zoom: 8
	});

	var resolutions = 
		[3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21];
	var matrixIds0 = [];
	matrixIds0 = $.map(resolutions, function(resolution) {
		var indexResolution = resolutions.indexOf(resolution);
		return 'EPSG:28992' + ':' + indexResolution;
	});

	var tileGrid0 = new ol.tilegrid.WMTS({
		origin: [-285401.920, 903401.920],
		resolutions: resolutions,
		matrixIds: matrixIds0
	});

	var achtergrond = new ol.layer.Tile({
		opacity: 0.8,
		extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999],
		source : new ol.source.WMTS({
			attributions: [],
			url: '//geodata.nationaalgeoregister.nl/wmts',
			layer: 'brtachtergrondkaartgrijs',
			matrixSet: 'EPSG:28992',
			format: 'image/png',
			tileGrid: tileGrid0,
			style: 'default'
		}),
		visible: true
	});

	map = new ol.Map({
		layers: [achtergrond],
		control: [new ol.control.Zoom()],
		target: 'map',
		view: view
	});
	
	var layer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
			url: 'http://sittard-geleen.gispubliek.nl/kragten/services/wms_sittard_geleen?', 
			params: {'LAYERS': 'Sittard-Geleen', 'VERSION': '1.3.0'} 
		})
	});
	
	map.addLayer(layer);
	
	map.on('singleclick', function(evt) {
		var url = layer.getSource().getGetFeatureInfoUrl(evt.coordinate, map.getView().getResolution(), 
				map.getView().getProjection(), {'INFO_FORMAT': 'application/vnd.ogc.gml'});
		
		Meteor.call('getFeatureInfo', url, function(err, result) {
			if(typeof result !== 'undefined') {
				Meteor.call('getRooturl', function(errRoot, resultRoot) {
					if(typeof resultRoot !== 'undefined') {
						var index = resultRoot.lastIndexOf('/');
						var prefix = resultRoot.substring(0, index);
						
						var suffix = '/bomenpaspoort/template?' 
							+ 'pn=' + result.paspoortnummer.split('&').join('%26')
							+ '&sn=' + result.straatnaam.split('&').join('%26')
							+ '&wp=' + result.woonplaats.split('&').join('%26')
							+ '&bs=' + result.boomsoort.split('&').join('%26')
							+ '&aant=' + result.aantal.split('&').join('%26')
							+ '&jaar=' + result.aanlegjaar.split('&').join('%26')
							+ '&terr=' + result.terrein.split('&').join('%26')
							+ '&mon=' + result.monumentaal.split('&').join('%26')
							+ '&waarde=' + result.waardevol.split('&').join('%26')
							+ '&aanvmon=' + result.aanvMonumentaal.split('&').join('%26')
							+ '&aanvwa=' + result.aanvWaardevol.split('&').join('%26')
							+ '&coordx=' + evt.coordinate[0]
							+ '&coordy=' + evt.coordinate[1];
						
						window.open(prefix + suffix);
					}
				});
			}
		});
	});
});

Template.viewer.events({
	'click #js-location-search': function() {
		locationSearch();
	},
	'keypress #js-location-input': function(e) {
		if(e.which === 13) {
			locationSearch();
		} else {
			//do nothing
		}
		
	}
});

function locationSearch() {
	var value = $('#js-location-input')[0].value;
	var finalValue = value.split(' ').join('+');
	
	var url = 'https://geodata.nationaalgeoregister.nl/geocoder/Geocoder?zoekterm=' + finalValue;
	
	Meteor.call('getLocation', url, function(err, result) {
		if(typeof result !== 'undefined') {
			var coordinatesString = result.split(' ');
			
			var coordX = parseFloat(coordinatesString[0]);
			var coordY = parseFloat(coordinatesString[1]);
			
			var coordinates = [coordX, coordY];
			
			map.getView().setCenter(coordinates);
			map.getView().setZoom(4);
		}
	});
}