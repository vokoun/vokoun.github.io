/* 
 * main.js (the javascript for the website 'vokoun.github.io')
 * Copyright 2016 David Vokoun
 * Free software under the terms of the The MIT License
 */

function getHash() {
	var hash = window.location.hash;

	if (hash) 
		hash = hash.substr(1);
	else
		hash = null;

	console.log("Get hash: " + hash);
	return hash;
}


var state = getHash() || 'status';

function changeTab(name) {
	$('span#tab-status').classList.remove('tab-active');
	//$('span#tab-dev').classList.remove('tab-active');
	//$('span#tab-media').classList.remove('tab-active');
	$('span#tab-blog').classList.remove('tab-active');
	$('span#tab-resources').classList.remove('tab-active');
	//$('span#tab-music').classList.remove('tab-active');

	
	if (name !== null && name !== 'null') {
		console.log("[changeTab] current: " + state + ", name: " + name);
		state = name;

		tk.get('./view/'+name+'.html', function() {
			$('span#tab-' + name).classList.add('tab-active');
			$('div#view').innerHTML = this.responseText;

			if (name !== 'null')
				window.location.hash = '#' + name;
		
			if (name === 'status') { //fetch status extra views
				//tk.get('./view/status_news.html', function() {
				//	$('div#news').innerHTML = this.responseText;
				//});
				//tk.get('./view/status_resources.html', function() {
					//$('div#resources').innerHTML = this.responseText;

					/*$('span#resources-show').addEventListener('click', function() {
						$('div#resources').classList.add('show-all');
					});*/
				//});

			}

		});


	} else {

		$('div#view').innerHTML = '<h3>Index</h3> <p>Please choose a tab above</p>';
	}
}



window.onload = function() {
	$('div#no-js-detected').style.display = 'none';

	/*
	$('span#tab-dev').addEventListener('click', function() {
		changeTab('dev');
	});
	$('span#tab-media').addEventListener('click', function() {
		changeTab('media');
	});
	$('span#tab-music').addEventListener('click', function() {
		changeTab('music');
	});
	*/
	$('span#tab-status').addEventListener('click', function() {
		changeTab('status');
	});
	$('span#tab-blog').addEventListener('click', function() {
		changeTab('blog');
	});
	$('span#tab-resources').addEventListener('click', function() {
		changeTab('resources');
	});

	
	changeTab(state);
};

window.onhashchange = function() {
	console.log('detected hash change');
	var name = getHash();

	if (name !== state) {
		changeTab(name);
	}
};