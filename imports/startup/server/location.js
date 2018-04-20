import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getResponseFromLocationServer(url, attribute) {
		var res = HTTP.get(url);
		var xml = xml2js.parseStringSync(res.content);
		
		var response;
		if(typeof xml.response.result[0].doc !== 'undefined') {
			var object = xml.response.result[0].doc[0];
			object.str.forEach(function(item) {
				if(item.$.name === attribute) {
					response = item._;
				}
			});
		}
		
		return response;
	}
});