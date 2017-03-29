import Ember from 'ember';

export default Ember.Controller.extend({
  query: null,
  actions: {
    search(query) {
      this.get('store').query('show', {
        search: query,
        include: 'vod'
      })
      .then((results) => {
        this.set('results', results);
      });
    }
  }
});