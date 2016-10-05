import { Meteor } from 'meteor/meteor';

Meteor.methods({
	getRooturl: function() {
		return process.env.ROOT_URL;
	}
});