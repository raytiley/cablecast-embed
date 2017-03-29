"use strict";define("cablecast-embed/adapters/application",["exports","ember","ember-data"],function(e,t,l){e.default=l.default.RESTAdapter.extend({player:t.default.inject.service(),host:t.default.computed("player.api",function(){return"http://"+this.get("player.api")}),namespace:"cablecastapi/v1"})}),define("cablecast-embed/app",["exports","ember","cablecast-embed/resolver","ember-load-initializers","cablecast-embed/config/environment"],function(e,t,l,a,n){var s=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,s=t.default.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:l.default}),(0,a.default)(s,n.default.modulePrefix),e.default=s}),define("cablecast-embed/controllers/application",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({queryParams:["api"],api:null,player:t.default.inject.service()})}),define("cablecast-embed/controllers/search",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({query:null,actions:{search:function(e){var t=this;this.get("store").query("show",{search:e,include:"vod"}).then(function(e){t.set("results",e)})}}})}),define("cablecast-embed/helpers/app-version",["exports","ember","cablecast-embed/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,l,a){function n(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return t.hideSha?s.match(a.versionRegExp)[0]:t.hideVersion?s.match(a.shaRegExp)[0]:s}e.appVersion=n;var s=l.default.APP.version;e.default=t.default.Helper.helper(n)}),define("cablecast-embed/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("cablecast-embed/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("cablecast-embed/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","cablecast-embed/config/environment"],function(e,t,l){var a=l.default.APP,n=a.name,s=a.version;e.default={name:"App Version",initialize:(0,t.default)(n,s)}}),define("cablecast-embed/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("cablecast-embed/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("cablecast-embed/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,l){e.default={name:"ember-data",initialize:t.default}}),define("cablecast-embed/initializers/export-application-global",["exports","ember","cablecast-embed/config/environment"],function(e,t,l){function a(){var e=arguments[1]||arguments[0];if(l.default.exportApplicationGlobal!==!1){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var n,s=l.default.exportApplicationGlobal;n="string"==typeof s?s:t.default.String.classify(l.default.modulePrefix),a[n]||(a[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[n]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("cablecast-embed/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("cablecast-embed/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("cablecast-embed/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:function(){}}}),define("cablecast-embed/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("cablecast-embed/models/show",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({cgTitle:t.default.attr("string"),vods:t.default.hasMany("vod")})}),define("cablecast-embed/models/vod",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({embedCode:t.default.attr("string"),show:t.default.belongsTo("show")})}),define("cablecast-embed/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("cablecast-embed/router",["exports","ember","cablecast-embed/config/environment"],function(e,t,l){var a=t.default.Router.extend({location:l.default.locationType,rootURL:l.default.rootURL});a.map(function(){this.route("search"),this.route("projects",function(){this.route("view",{path:"view/:id"})}),this.route("categories",function(){this.route("view",{path:"view/:id"})}),this.route("playlists",function(){this.route("view",{path:"view/:id"})})}),e.default=a}),define("cablecast-embed/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({player:t.default.inject.service(),beforeModel:function(){var e=this.paramsFor(this.routeName);this.set("player.api",e.api||"tighty.tv")},actions:{play:function(e){this.set("player.activeShow",e)},browse:function(){this.toggleProperty("player.browsing")}}})}),define("cablecast-embed/routes/categories/index",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({player:t.default.inject.service(),model:function(){var e=this.get("player.api");return(0,l.default)("http://"+e+"/cablecastapi/v1/categories").then(function(e){return e.categories})}})}),define("cablecast-embed/routes/categories/view",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({model:function(e){var t=e.id;return this.get("store").query("show",{search:t,include:"vod"}).then(function(e){return e.filter(function(e){return e.get("vods.length")>0})})}})}),define("cablecast-embed/routes/playlists/index",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({player:t.default.inject.service(),model:function(){var e=this.get("player.api");return(0,l.default)("http://"+e+"/cablecastapi/v1/shows/search/advanced").then(function(e){return e.savedShowSearches})}})}),define("cablecast-embed/routes/playlists/view",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({model:function(e){var t=this,a=e.id;return(0,l.default)("http://gnat.cablecast.tv/cablecastapi/v1/shows/search/advanced/"+a).then(function(e){var l=e.savedShowSearch.results.slice(0,50);return t.get("store").query("show",{ids:l,include:"vod"})})}})}),define("cablecast-embed/routes/projects/index",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({player:t.default.inject.service(),model:function(){var e=this.get("player.api");return(0,l.default)("http://"+e+"/cablecastapi/v1/projects").then(function(e){return e.projects})}})}),define("cablecast-embed/routes/projects/view",["exports","ember","ic-ajax"],function(e,t,l){e.default=t.default.Route.extend({model:function(e){var t=e.id;return this.get("store").query("show",{project:t,include:"vod"}).then(function(e){return e.filter(function(e){return e.get("vods.length")>0})})}})}),define("cablecast-embed/routes/search",["exports","ember"],function(e,t){e.default=t.default.Route.extend({})}),define("cablecast-embed/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("cablecast-embed/services/player",["exports","ember"],function(e,t){e.default=t.default.Service.extend({api:null})}),define("cablecast-embed/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"niyxuyow",block:'{"statements":[["text","\\n"],["open-element","div",[]],["static-attr","class","container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","col-md-12"],["flush-element"],["text","\\n      "],["open-element","ul",[]],["static-attr","class","nav nav-tabs"],["flush-element"],["text","\\n"],["block",["link-to"],["search"],[["tagName"],["li"]],11],["block",["link-to"],["categories"],[["tagName"],["li"]],9],["block",["link-to"],["projects"],[["tagName"],["li"]],7],["block",["link-to"],["playlists"],[["tagName"],["li"]],5],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tab-content player-selector"],["flush-element"],["text","\\n        "],["append",["unknown",["outlet"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["player-background ",["helper",["if"],[["get",["player","activeShow"]],"active"],null]," ",["helper",["if"],[["get",["player","browsing"]],"browse"],null]]]],["flush-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["player ",["helper",["if"],[["get",["player","activeShow"]],"active"],null]," ",["helper",["if"],[["get",["player","browsing"]],"browse"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["player","activeShow"]]],null,3],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["player","browsing"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","player active browse overlay"],["modifier",["action"],[["get",[null]],"browse"]],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","player-browsing-overlay"],["modifier",["action"],[["get",[null]],"browse"]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","button",[]],["static-attr","class","btn btn-primary btn-block"],["modifier",["action"],[["get",[null]],"browse"]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","glyphicon glyphicon-menu-left"],["flush-element"],["close-element"],["text"," Browse\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","embed-responsive embed-responsive-16by9"],["flush-element"],["text","\\n      "],["open-element","iframe",[]],["static-attr","class","embed-responsive-item"],["dynamic-attr","src",["concat",["http://gnat.cablecast.tv/cablecastapi/embed?show_id=",["unknown",["player","activeShow","id"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["player","browsing"]]],null,2,1]],"locals":[]},{"statements":[["text","Playlists"]],"locals":[]},{"statements":[["text","          "],["block",["link-to"],["playlists"],null,4],["text","\\n"]],"locals":[]},{"statements":[["text","Projects"]],"locals":[]},{"statements":[["text","          "],["block",["link-to"],["projects"],null,6],["text","\\n"]],"locals":[]},{"statements":[["text","Categories"]],"locals":[]},{"statements":[["text","          "],["block",["link-to"],["categories"],null,8],["text","\\n"]],"locals":[]},{"statements":[["text","Search"]],"locals":[]},{"statements":[["text","          "],["block",["link-to"],["search"],null,10],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/application.hbs"}})}),define("cablecast-embed/templates/categories/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"2uRYPExm",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["append",["helper",["log"],["Categories",["get",["model"]]],null],false],["text","\\n"],["block",["each"],[["get",["model"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["category","name"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],["categories.view",["get",["category","name"]]],null,0]],"locals":["category"]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/categories/index.hbs"}})}),define("cablecast-embed/templates/categories/view",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"MX6/BMaA",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["link-to"],["categories.index"],null,1],["block",["each"],[["get",["model"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","a",[]],["static-attr","href","#"],["modifier",["action"],[["get",[null]],"play",["get",["show"]]]],["flush-element"],["text","\\n    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["show","cgTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["show"]},{"statements":[["text","  "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","glyphicon glyphicon-menu-left"],["flush-element"],["close-element"],["text"," Categories\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/categories/view.hbs"}})}),define("cablecast-embed/templates/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"cKMaMuWG",block:'{"statements":[["open-element","h3",[]],["flush-element"],["text","Loading..."],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/loading.hbs"}})}),define("cablecast-embed/templates/playlists/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"5k/1IYug",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["each"],[["get",["model"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["search","name"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],["playlists.view",["get",["search","id"]]],null,0]],"locals":["search"]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/playlists/index.hbs"}})}),define("cablecast-embed/templates/playlists/view",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"qsBPUplV",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["link-to"],["playlists.index"],null,1],["block",["each"],[["get",["model"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","a",[]],["static-attr","href","#"],["modifier",["action"],[["get",[null]],"play",["get",["show"]]]],["flush-element"],["text","\\n    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["show","cgTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["show"]},{"statements":[["text","  "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","glyphicon glyphicon-menu-left"],["flush-element"],["close-element"],["text"," Playlists\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/playlists/view.hbs"}})}),define("cablecast-embed/templates/projects/index",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"qigRZKJw",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["each"],[["get",["model"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["search","name"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["link-to"],["projects.view",["get",["search","id"]]],null,0]],"locals":["search"]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/projects/index.hbs"}})}),define("cablecast-embed/templates/projects/loading",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"pzZpRCAA",block:'{"statements":[["open-element","h4",[]],["flush-element"],["text","Loadiing..."],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/projects/loading.hbs"}})}),define("cablecast-embed/templates/projects/view",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"EaYUe/Td",block:'{"statements":[["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["link-to"],["projects.index"],null,1],["block",["each"],[["get",["model"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","a",[]],["static-attr","href","#"],["modifier",["action"],[["get",[null]],"play",["get",["show"]]]],["flush-element"],["text","\\n    "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["show","cgTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["show"]},{"statements":[["text","  "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","glyphicon glyphicon-menu-left"],["flush-element"],["close-element"],["text"," Projects\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/projects/view.hbs"}})}),define("cablecast-embed/templates/search",["exports"],function(e){e.default=Ember.HTMLBars.template({id:"N4YC+8Cd",block:'{"statements":[["open-element","div",[]],["static-attr","class","input-group"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["value","type","class","placeholder"],[["get",["query"]],"text","form-control","Search"]]],false],["text","\\n      "],["open-element","span",[]],["static-attr","class","input-group-btn"],["flush-element"],["text","\\n        "],["open-element","button",[]],["static-attr","class","btn btn-default"],["static-attr","type","button"],["modifier",["action"],[["get",[null]],"search",["get",["query"]]]],["flush-element"],["text","Go!"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["open-element","ul",[]],["static-attr","class","list-group"],["flush-element"],["text","\\n"],["block",["each"],[["get",["results"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","a",[]],["static-attr","href","#"],["modifier",["action"],[["get",[null]],"play",["get",["show"]]]],["flush-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","list-group-item"],["flush-element"],["append",["unknown",["show","cgTitle"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["show"]}],"hasPartials":false}',meta:{moduleName:"cablecast-embed/templates/search.hbs"}})}),define("cablecast-embed/config/environment",["ember"],function(e){try{var t="cablecast-embed/config/environment",l=document.querySelector('meta[name="'+t+'"]').getAttribute("content"),a=JSON.parse(unescape(l)),n={default:a};return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("cablecast-embed/app").default.create({name:"cablecast-embed",version:"0.0.0+af59d97e"});