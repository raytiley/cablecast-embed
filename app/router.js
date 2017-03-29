import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('search');
  this.route('projects', function() {
    this.route('view', {path: 'view/:id'});
  });
  this.route('categories', function() {
    this.route('view', {path: 'view/:id'});
  });
  this.route('playlists', function() {
    this.route('view', {path: 'view/:id'});
  });
});

export default Router;
