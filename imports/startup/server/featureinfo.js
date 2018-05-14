import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getFeatureInfo: function(url) {
		var res = HTTP.get(url);
		var xml = xml2js.parseStringSync(res.content);
		
		if(typeof xml.FeatureCollection['gml:featureMember'] !== 'undefined') {
			var featureObject = xml.FeatureCollection['gml:featureMember'][0]['app:paspoortbomen_sittard_geleen'][0];
			
			var paspoortnummer = getValueCheck(featureObject['app:paspoort'], true);
			var straatnaam = getValueCheck(featureObject['app:straatnaam'], true);
			var woonplaats = getValueCheck(featureObject['app:wpl_wijk'], true);
			var boomsoort = getValueCheck(featureObject['app:boomsoort'], true);
			var aantal = getValueCheck(featureObject['app:aantal'], true);
			var aanlegjaar = getValueCheck(featureObject['app:aanlegjaar'], true);
			var terrein = getValueCheck(featureObject['app:terrein'], true);
			var monumentaal = getValueCheck(featureObject['app:monumentaal'], true);
			var waardevol = getValueCheck(featureObject['app:waardevol'], true);
			var aanvMonumentaal = getValueCheck(featureObject['app:aanvulling_monumentaal'], false);
			var aanvWaardevol = getValueCheck(featureObject['app:aanvulling_waardevol'], false);
			
			return {'paspoortnummer': paspoortnummer, 'straatnaam': straatnaam, 'woonplaats': woonplaats, 'boomsoort': boomsoort,
							'aantal': aantal, 'aanlegjaar': aanlegjaar, 'terrein': terrein, 'monumentaal': monumentaal,
							'waardevol': waardevol, 'aanvMonumentaal': aanvMonumentaal, 'aanvWaardevol': aanvWaardevol};
		}
		
		function getValueCheck(field, getLabelUndefined) {
			if(field != undefined) {
				return field[0];
			} else {
				if(getLabelUndefined) {
					return 'onbekend';
				}
			}
		}
	}
});