import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  model() {
    let api = this.get('player.api');
    return ajax(`http://${api}/cablecastapi/v1/categories`)
    .then((result) => {
      return result.categories;
    });
  }
});