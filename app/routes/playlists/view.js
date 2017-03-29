import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model({id}) {
    return ajax(`http://gnat.cablecast.tv/cablecastapi/v1/shows/search/advanced/${id}`)
    .then((result) => {
      let ids = result.savedShowSearch.results.slice(0, 50);
      return this.get('store').query('show', {
        ids: ids,
        include: 'vod'
      });
    });
  }
});