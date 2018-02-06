import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getFeatureInfo: function(url) {
		var res = HTTP.get(url);
		var xml = xml2js.parseStringSync(res.content);
		
		if(typeof xml.FeatureCollection['gml:featureMember'] !== 'undefined') {
			var featureObject = xml.FeatureCollection['gml:featureMember'][0]['app:paspoortbomen_sittard_geleen'][0];
			
			var paspoortnummer = getValueCheck(featureObject['app:paspoort']);
			var straatnaam = getValueCheck(featureObject['app:straatnaam']);
			var woonplaats = getValueCheck(featureObject['app:wpl_wijk']);
			var boomsoort = getValueCheck(featureObject['app:boomsoort']);
			var aantal = getValueCheck(featureObject['app:aantal']);
			var aanlegjaar = getValueCheck(featureObject['app:aanlegjaar']);
			var terrein = getValueCheck(featureObject['app:terrein']);
			var monumentaal = getValueCheck(featureObject['app:monumentaal']);
			var waardevol = getValueCheck(featureObject['app:waardevol']);
			var aanvMonumentaal = getValueCheck(featureObject['app:aanv_mon']);
			var aanvWaardevol = getValueCheck(featureObject['app:aanv_waa']);
			
			return {'paspoortnummer': paspoortnummer, 'straatnaam': straatnaam, 'woonplaats': woonplaats, 'boomsoort': boomsoort,
							'aantal': aantal, 'aanlegjaar': aanlegjaar, 'terrein': terrein, 'monumentaal': monumentaal,
							'waardevol': waardevol, 'aanvMonumentaal': aanvMonumentaal, 'aanvWaardevol': aanvWaardevol};
		}
		
		function getValueCheck(field) {
			if(typeof field != 'undefined') {
				return field[0];
			} else {
				return 'onbekend';
			}
		}
	}
});