import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  player: Ember.inject.service(),
  host: Ember.computed('player.api', function() {
    let api =  this.get('player.api');
    return `http://${api}`;
  }),
  namespace: 'cablecastapi/v1'
});