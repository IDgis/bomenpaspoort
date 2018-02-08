import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

import '../../ui/main.js';

import '../../ui/viewer/viewer.js';
import '../../ui/template/template.js';

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/bomenpaspoort', function () {
	  this.render('viewer');
	}, {
	  name: 'viewer'
});

Router.route('/bomenpaspoort/template', function () {
	var object = {'paspoortnummer': this.params.query.pn, 'straatnaam': this.params.query.sn, 'woonplaats': this.params.query.wp, 
			'boomsoort': this.params.query.bs, 'aantal': this.params.query.aant, 'aanlegjaar': this.params.query.jaar, 'terrein': this.params.query.terr, 
			'monumentaal': this.params.query.mon, 'waardevol': this.params.query.waarde, 'aanvullingMonumentaal': this.params.query.aanvmon,
			'aanvullingWaardevol': this.params.query.aanvwa};
	
	Session.set('boomInformatie', object);
	Session.set('boomCoordinaten', [parseInt(this.params.query.coordx), parseInt(this.params.query.coordy)]);
	
	this.render('template');
	}, {
	  name: 'template'
});