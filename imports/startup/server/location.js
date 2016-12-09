import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getLocation: function(url) {
		var res = HTTP.get(url);
		var xml = xml2js.parseStringSync(res.content);
		
		if(typeof xml['xls:GeocodeResponse']['xls:GeocodeResponseList'] !== 'undefined') {
			return xml['xls:GeocodeResponse']['xls:GeocodeResponseList'][0]['xls:GeocodedAddress'][0]['gml:Point'][0]['gml:pos'][0]._;
		} else {
			//don't return anything
		}
	}
});