import './template.html';
import './template.css';

Template.template.onRendered(function() {
	var boominfo = Session.get('boomInformatie');
	var boomCoordinaten = Session.get('boomCoordinaten');
	
	$('#js-paspoortnummer').append(boominfo.paspoortnummer);
	$('#js-straatnaam').append(boominfo.straatnaam);
	$('#js-woonplaats').append(boominfo.woonplaats);
	$('#js-boomsoort').append(boominfo.boomsoort);
	$('#js-aantal').append(boominfo.aantal);
	$('#js-terrein').append(boominfo.terrein);
	$('#js-monumentaal').append(boominfo.monumentaal);
	$('#js-waardevol').append(boominfo.waardevol);
	
	var imgSrc = 'http://sittard-geleen.gispubliek.nl/paspoortfotos/' + boominfo.paspoortnummer + '.jpg';
	var img = document.createElement('img');
	$(img).attr('src', imgSrc);
	$(img).attr('class', 'img-pnr');
	$('#photo-1-block').append(img);
	
	var projection = new ol.proj.Projection({
		code: 'EPSG:28992',
		extent: [185130.30300000, 331786.35260000, 186691.93210000, 333634.55600000]
	});

	var view = new ol.View({
		projection: projection,
		center: boomCoordinaten,
		zoom: 3
	});

	var zoomControl = new ol.control.Zoom();

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
		control: zoomControl,
		target: 'map-template',
		view: view
	});
	
	var layer = new ol.layer.Image({
		source: new ol.source.ImageWMS({
			url: 'http://sittard-geleen.gispubliek.nl/kragten/services/wms_sittard_geleen?', 
			params: {'LAYERS': 'Sittard-Geleen', 'VERSION': '1.3.0',
				'sld_body': '<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld"><NamedLayer><Name>Sittard-Geleen</Name>' +
					'<NamedStyle><Name>default</Name></NamedStyle></NamedLayer><NamedLayer><Name>Sittard-Geleen</Name><LayerFeatureConstraints>' +
					'<FeatureTypeConstraint><ogc:Filter xmlns:app="http://www.deegree.org/app" xmlns:ogc="http://www.opengis.net/ogc">' +
					'<ogc:PropertyIsEqualTo><ogc:PropertyName>paspoort</ogc:PropertyName><ogc:Literal>' + boominfo.paspoortnummer + '</ogc:Literal>' +
					'</ogc:PropertyIsEqualTo></ogc:Filter></FeatureTypeConstraint></LayerFeatureConstraints><NamedStyle><Name>paspoortbomen_selected' +
					'</Name></NamedStyle></NamedLayer></StyledLayerDescriptor>'}
		})
	});
	
	map.addLayer(layer);
});