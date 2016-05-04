/*
 * tk.js (the software library `mtkjs` a minimalistic toolkit for javascript)
 * Copyright 2014, 2015, 2016  David Vokoun
 * Free Software under the terms of the The MIT License
 *
 * (mtkjs has been completely stripped back, this sketelon exists just to serve
 *  a few basic functions, check out github.com/vokoun/mtkjs for more info)
 */

/* Toolkit Constructor */
var tk = (function() {
  var tk = Object.create(null);

  tk.copyright = 'Copyright 2014, 2015, 2016  David Vokoun'
  tk.version = '0.1.0';

  tk.get = function(url, callback) {
    console.log('getting' + url);

    var req = new XMLHttpRequest();
    req.addEventListener('load', callback);
    req.open('GET', url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime()); // bypass cache
    req.send();

  };

  tk.post = function() {};
  tk.byId = function(query) {
    if (typeof query !== 'undefined') { return document.querySelector(query); } 
  };
  tk.query = function() {};
  tk.select = function() {};
  tk.byTag = function() {};

  return tk;
})();


/* Common Aliases */
var $ = tk.byId;
