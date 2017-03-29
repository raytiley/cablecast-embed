import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  beforeModel() {
    let params = this.paramsFor(this.routeName);
    this.set('player.api', params.api || 'tighty.tv');
  },
  actions: {
    play(show) {
      this.set('player.activeShow', show);
    },
    browse () {
      this.toggleProperty('player.browsing');
    }
  }
});