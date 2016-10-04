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

Router.route('/template/:paspoortnummer/:straatnaam/:woonplaats/:boomsoort/:aantal/:aanlegjaar/:terrein/:monumentaal/:waardevol/:coord1/:coord2', function () {
	var object = {'paspoortnummer': this.params.paspoortnummer, 'straatnaam': this.params.straatnaam, 'woonplaats': this.params.woonplaats, 
			'boomsoort': this.params.boomsoort, 'aantal': this.params.aantal, 'aanlegjaar': this.params.aanlegjaar, 'terrein': this.params.terrein, 
			'monumentaal': this.params.monumentaal, 'waardevol': this.params.waardevol};
	
	Session.set('boomInformatie', object);
	Session.set('boomCoordinaten', [parseInt(this.params.coord1), parseInt(this.params.coord2)]);
	
	this.render('template');
	}, {
	  name: 'template'
});