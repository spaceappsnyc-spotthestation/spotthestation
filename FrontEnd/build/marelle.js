/*

$.Marelle() v0.0.3
================

Foursquare API client library for Javascript, meant to be used qith jquery 1.5+, written in coffeescript.
Authored by Francois Lafortune, [@quickredfox][twitter].

	Copyright 2011 PraizedMedia Inc. 

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	  http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

[twitter]: http://twitter.com/quickredfox

*/

// Supply your foursquare client id
     var FSQUARE_CLIENT_ID = 'OCDE4J4KFIFFUQ1BUQSASIVDIO034V1V1GVU1YRGWNFS54QZ';

/*
 Foursqure  API Structure
*/var API;
API = {
  users: {
    methods: {
      search: {
        http: 'POST',
        params: ['phone', 'email', 'twitter', 'twitterSource', 'fbid', 'name']
      },
      requests: {
        http: 'GET'
      }
    },
    aspects: {
      badges: [],
      checkins: ['limit', 'offset', 'afterTimestamp', 'beforeTimestamp'],
      friends: [],
      tips: ['sort', 'll'],
      todos: ['sort', 'll'],
      venuehistory: []
    },
    actions: {
      request: [],
      unfriend: [],
      approve: [],
      deny: [],
      setpings: ['value']
    }
  },
  venues: {
    methods: {
      add: ['name', 'address', 'crossStreet', 'city', 'state', 'zip', 'phone', 'll', 'primaryCategoryId'],
      categories: [],
      search: ['ll', 'llAcc', 'alt', 'altAcc', 'query', 'limit', 'intent']
    },
    aspects: {
      herenow: [],
      tips: ['sort']
    },
    actions: {
      marktodo: ['text'],
      flag: ['problem'],
      proposeedit: ['name', 'address', 'crossStreet', 'city', 'state', 'zip', 'phone', 'll', 'primaryCategoryId']
    }
  },
  checkins: {
    methods: {
      add: {
        http: 'POST',
        params: ['venueId', 'venue', 'shout', 'broadcast', 'll', 'llAcc', 'alt', 'altAcc']
      },
      recent: ['ll', 'limit', 'offset', 'afterTimestamp']
    },
    actions: {
      addcomment: {
        http: 'POST',
        param: ['text']
      },
      deletecomment: ['commentId']
    }
  },
  tips: {
    methods: {
      add: ['venueId', 'text', 'url'],
      search: ['ll', 'limit', 'offset', 'filter', 'query']
    },
    actions: {
      marktodo: [],
      markdone: [],
      unmark: []
    }
  },
  photos: {
    methods: {
      add: ['checkingId', 'tipId', 'venueId', 'broadcast', 'll', 'llAcc', 'alt', 'altAcc']
    }
  },
  settings: {
    methods: {
      all: []
    },
    actions: {
      set: ['value']
    }
  },
  badges: {},
  mayorships: {}
};
/*
 XHR

 Provides a marelle-specific interface to jQuery's $.Ajax

*/var XHR;
XHR = {
  getOpts: function(args) {
    var method, options, params;
    args = Array.prototype.slice.call(args);
    method = args.shift();
    params = typeof args[args.length - 1] !== 'object' ? {} : args.pop();
    options = {
      path: args.join('/'),
      method: method.toUpperCase(),
      params: $.extend({}, params, {
        oauth_token: Marelle.AUTH_TOKEN
      })
    };
    return options;
  },
  request: function(method, params) {
    var deferred, opts, url, xhropts;
    deferred = $.Deferred();
    opts = XHR.getOpts(arguments);
    url = "https://api.foursquare.com/v2/" + opts.path.replace(/\/+/g,'/');
    xhropts = {
      type: opts.method,
      url: url,
      data: opts.params,
      dataType: 'json'
    };
    return $.ajax(xhropts);
  }
};
/*
  grep()

  Returns the first matched grouping.

  @param {String} str The string to search.
  @param {RegExp} re  The regular expression to match.

  @return First matched group
*/var Marelle, clearToken, decorate, getToken, grep, itterate, modelize, redirect, setToken, synchronize;
var __hasProp = Object.prototype.hasOwnProperty;
grep = function(str, re) {
  var m;
  m = str.match(re);
  if (m && m[1]) {
    return m[1];
  }
};
itterate = function(obj, fn) {
  var k, value, _results;
  _results = [];
  for (k in obj) {
    if (!__hasProp.call(obj, k)) continue;
    value = obj[k];
    _results.push(fn(k, value));
  }
  return _results;
};
/*
  modelize()

  Takes the structure from api.coffee and materializes
  it into a DSL for use qith jQuery.

  @returns An augmented Marelle object.
*/
modelize = function() {
  itterate(API, function(name, endpoint) {
    var model, modelName;
    modelName = name.classify();
    model = function(data) {
      var v, value;
      for (v in data) {
        value = data[v];
        this[v] = decorate(v, value, this);
      }
      return this;
    };
    itterate(endpoint.methods, function(method, spec) {
      var http;
      http = (spec.http || 'get').toLowerCase();
      return model[method] = function(params, callback) {
        if (typeof params === 'function') {
          callback = params;
          params = {};
        }
        return XHR.request.call(model, http, name, method, params);
      };
    });
    itterate(endpoint.aspects, function(aspect, spec) {
      var aspectName, http;
      http = (spec.http || 'get').toLowerCase();
      aspectName = 'get' + aspect.classify().pluralize();
      return model.prototype[aspectName] = function(params, callback) {
        if (typeof params === 'function') {
          callback = params;
          params = {};
        }
        return XHR.request.call(this, http, name, this.id || 'self', aspect, params);
      };
    });
    itterate(endpoint.actions, function(action, spec) {
      var http;
      http = (spec.http || 'get').toLowerCase();
      return model.prototype[action] = function(id, params, callback) {
        if (typeof params === 'function') {
          callback = params;
          params = {};
        }
        return XHR.request.call(this, http, name, id, action, params);
      };
    });
    return Marelle[modelName] = model;
  });
  return Marelle;
};
/*
  decorate()

  Decorates a json response from the foursquare API, casting
  nodes to their Marelle equivalent models.

  @params {String} type The type of object we want ot decorate.
  @params {Object} json The json data represnting this object.
  @params {Object} parent The parent object, if any.

  @returns The provided json, decorated.
*/
decorate = function(type, json, parent) {
  var model, nuitems;
  model = String.prototype.classify.call(type);
  if (parent && typeof json.count !== 'undefined') {
    parent[type + 'Count'] = json.count;
  }
  if (Marelle[model] && typeof json === 'object') {
    if (json.count) {
      if (json.items) {
        nuitems = [];
        json.items.forEach(function(item) {
          return nuitems.push(new Marelle[model](item));
        });
        json.items = nuitems;
      }
      return json;
    } else {
      return new Marelle[model](json);
    }
  } else if (type === 'groups') {
    json.forEach(function(group, idx) {
      return json[idx].items.forEach(function(item, i) {
        return json[idx].items[i] = decorate('venues', item);
      });
    });
  }
  return json;
};
/*
  synchronize()

  Looks for an access_token or error argument within the
  location hash in order to setup the Marelle.AUTH_TOKEN
  parameter
*/
synchronize = function() {
  var hashregex, winhash;
  winhash = window.location.hash;
  hashregex = {
    token: /^\#?access_token\=([^\&]+)/,
    error: /^\#?error\=([^\&]+)/
  };
  if (hashregex.error.test(winhash)) {
    window.location.hash = '';
    throw 'Foursquare Authentication Error: ' + grep(winhash, hashregex.error);
  } else {
    if (hashregex.token.test(winhash)) {
      window.location.hash = '';
      setToken(grep(winhash, hashregex.token));
    }
    if (!Marelle.AUTH_TOKEN) {
      Marelle.AUTH_TOKEN = getToken();
    }
  }
  return Marelle;
};
/*
  setToken()

  Sets the visitor's oauth token within localStorage.

  @params {String} token The oauth token string.
*/
setToken = function(token) {
  return localStorage.setItem('marelleAuthToken', token);
};
/*
  getToken()

  Gets the visitor's oauth token within localStorage

*/
getToken = function() {
  return localStorage.getItem('marelleAuthToken');
};
/*
  clearToken()

  Clear the visitor's oauth token from within localStorage

*/
clearToken = function() {
  return localStorage.removeItem('marelleAuthToken');
};
/*
  redirect()

  Redirect the browser to the provided URL (removing empty hash if present)
  @param {String} url The URL to redirect to

*/
redirect = function(url) {
  return window.location.href = url.replace(/\#$/, '');
};
/*

  Marelle
  =======

  Marelle's public interface.

*/
Marelle = {
  startSession: function() {
    var startURL;
    startURL = "https://foursquare.com/oauth2/authenticate?";
    startURL += "client_id=" + Marelle.CLIENT_ID + "&response_type=token&redirect_uri=";
    startURL += window.location.href.replace(/\#.+/, '');
    return redirect(startURL);
  },
  endSession: function() {
    clearToken();
    return redirect(window.location.href);
  },
  signinButton: function(el) {
    var button, holder;
    el || (el = document.body);
    holder = $(el);
    button = $('<a class="marelle-sign-in-button" href="#">click to connect to foursquare</a>');
    button.bind('click', function(e) {
      e.preventDefault();
      return Marelle.startSession();
    });
    return holder.append(button);
  },
  signoutButton: function(el) {
    var button, holder;
    el || (el = document.body);
    holder = $(el);
    button = $('<a class="marelle-sign-out-button" href="#">click to disconnect from foursquare</a>');
    button.bind('click', function(e) {
      e.preventDefault();
      return Marelle.endSession();
    });
    return holder.append(button);
  },
  authenticateVisitor: function() {
    var request, result;
    result = $.Deferred();
    request = XHR.request('get', 'users', 'self', {});
    request.done(function(json) {
      $.Marelle.Visitor = new Marelle.User(json);
      return result.resolve($.Marelle.Visitor);
    });
    request.fail(function() {
      delete $.Marelle.Visitor;
      return result.reject();
    });
    return result.promise();
  }
};
modelize(Marelle, API);
/*
  jQuery bootstrap.
*/
$.extend({
  Marelle: function(clientID) {
    var deferred;
    deferred = $.Deferred();
    Marelle.CLIENT_ID = clientID || Marelle.CLIENT_ID;
    synchronize(Marelle);
    deferred.resolve(Marelle);
    return deferred.promise();
  }
});
$.extend($.Marelle, Marelle);