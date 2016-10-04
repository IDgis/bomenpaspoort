import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getFeatureInfo: function(url) {
		var res = HTTP.get(url);
		var xml = xml2js.parseStringSync(res.content);
		
		if(typeof xml.FeatureCollection['gml:featureMember'] !== 'undefined') {
			var featureObject = xml.FeatureCollection['gml:featureMember'][0]['app:paspoortbomen_sittard_geleen'][0];
			
			console.log(featureObject);
			
			var paspoortnummer = featureObject['app:paspoort'][0];
			var straatnaam = featureObject['app:straatnaam'][0];
			var woonplaats = featureObject['app:wpl_wijk'][0];
			var boomsoort = featureObject['app:boomsoort'][0];
			var aantal = featureObject['app:aantal'][0];
			var aanlegjaar = featureObject['app:aanlegjaar'][0];
			var terrein = featureObject['app:terrein'][0];
			var monumentaal = featureObject['app:monumentaal'][0];
			var waardevol = featureObject['app:waardevol'][0];
			
			return {'paspoortnummer': paspoortnummer, 'straatnaam': straatnaam, 'woonplaats': woonplaats, 'boomsoort': boomsoort,
							'aantal': aantal, 'aanlegjaar': aanlegjaar, 'terrein': terrein, 'monumentaal': monumentaal,
							'waardevol': waardevol};
		}
	}
});