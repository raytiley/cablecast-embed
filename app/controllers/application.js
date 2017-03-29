import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['api'],
  api: null,
  player: Ember.inject.service()
});