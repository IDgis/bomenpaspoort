import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

import '../../ui/main.js';

import '../../ui/viewer/viewer.js';

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function () {
	  this.render('viewer');
	}, {
	  name: 'viewer'
});