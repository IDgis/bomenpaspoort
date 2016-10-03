import './template.html';
import './template.css';

Template.template.onRendered(function() {
	var object = Session.get('boomInformatie');
	
	$('#js-paspoortnummer').append(object.paspoortnummer);
	$('#js-straatnaam').append(object.straatnaam);
	$('#js-woonplaats').append(object.woonplaats);
	$('#js-boomsoort').append(object.boomsoort);
	$('#js-aantal').append(object.aantal);
	$('#js-terrein').append(object.terrein);
	$('#js-monumentaal').append(object.monumentaal);
	$('#js-waardevol').append(object.waardevol);
	
	var imgSrc = 'http://sittard-geleen.gispubliek.nl/paspoortfotos/' + object.paspoortnummer + '.jpg';
	var img = document.createElement('img');
	$(img).attr('src', imgSrc);
	$(img).attr('class', 'img-pnr');
	$('#photo-block').append(img);
});