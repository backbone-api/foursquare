/* Backbone API: Foursquare
 * Source: https://github.com/backbone-api/foursquare
 *
 * Created by Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 * Released under the [MIT license](http://makesites.org/licenses/MIT)
 */

(function(_, Backbone) {

	// Reference: https://developer.foursquare.com/docs/
	var api = "https://api.foursquare.com/v2";

	// support the APP namespace (if available)
	var Model = ( typeof APP != "undefined" && !_.isUndefined( APP.Model) ) ? APP.Model : Backbone.Model;
	var View = (typeof APP != "undefined" && !_.isUndefined( APP.View) ) ? APP.View : Backbone.View;
	var Collection = (typeof APP != "undefined" && !_.isUndefined( APP.Collection) ) ? APP.Collection : Backbone.Collection;


	// main request method
	Foursquare = new Backbone.Model({
		api: api,
		token: 0
	});

	// namespace
	Foursquare.Models = {};
	Foursquare.Collection = {};
	Foursquare.Views = {};


	// **Models**: ...

	Foursquare.Models.User = Model.extend({
		url: function(){ return Foursquare.get("api") +"/users/"+ this.get("id") },

		defaults: { },

		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});

	Foursquare.Models.Me = Foursquare.Models.User.extend({
		defaults : {
			id : "self"
		}
	});

	Foursquare.Models.AddCheckin = Model.extend({
		url : function(){ return Foursquare.get("api") +"/checkins/add" },
		defaults : {
			venueId : 0
		}
	});

	Foursquare.Models.Friend = Model.extend({
		defaults: {
		},

		parse: function( data ){
			return (data.user) ? data.user : data;
		}
	});

	Foursquare.Models.Venue = Model.extend({
		defaults: { }
	});



	// **Collections**: ...

	Foursquare.Collections.Tips = Collection.extend({
		url: function(){ return Foursquare.get("api") +"/users/"+ this.options.user +"/tips" },
		defaults: { },
		options: {
			user: "self"
		},

		parse: function( data ){
			console.log(data);
			return (data.tips) ? data.tips.items : data;
		}
	});

	Foursquare.Collections.Friends = Collection.extend({
		url: function(){ return Foursquare.get("api") +"/users/"+ this.options.user +"/friends" },
		options: {
			user: "self"
		},

		parse: function( data ){
			return (data.friends) ? data.friends.items : data;
		}
	});


	Foursquare.Collections.Venues = Collection.extend({
		url: function(){
			return Foursquare.get("api") +"/venues/search?"
				+ "ll="+ app.state.location.coords.latitude +","+ app.state.location.coords.longitude
				+"&radius=50"; // hard-code radius to 50m
				//+"&oauth_token="+ app.session.get("access_token");
		},

		parse: function( data ){
			//console.log( data );
			return (data.venues) ? data.venues : data;
		}
	});

	// Fallbacks
	if( _.isUndefined(Backbone.API) ) Backbone.API = {};
	Backbone.API.Foursquare = Foursquare;

	// Shortcut
	if(typeof window.Foursquare == "undefined"){
		window.Foursquare = Backbone.API.Foursquare;
	}

})(this._, this.Backbone);