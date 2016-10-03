import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

import '../../ui/main.js';

import '../../ui/viewer/viewer.js';
import '../../ui/template/template.js';

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function () {
	  this.render('viewer');
	}, {
	  name: 'viewer'
});

Router.route('/template/:paspoortnummer/:straatnaam/:woonplaats/:boomsoort/:aantal/:terrein/:monumentaal/:waardevol', function () {
	var object = {'paspoortnummer': this.params.paspoortnummer, 'straatnaam': this.params.straatnaam, 'woonplaats': this.params.woonplaats, 
			'boomsoort': this.params.boomsoort, 'aantal': this.params.aantal, 'terrein': this.params.terrein, 'monumentaal': this.params.monumentaal, 
			'waardevol': this.params.waardevol};
	
	Session.set('boomInformatie', object);
	
	this.render('template');
	}, {
	  name: 'template'
});