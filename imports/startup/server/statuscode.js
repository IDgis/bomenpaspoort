import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getStatuscode: function(url) {
		try {
			var res = HTTP.get(url);
			if(typeof res !== 'undefined') {
				return res.statusCode;
			}
		} catch(e) {
			
		}
	}
});