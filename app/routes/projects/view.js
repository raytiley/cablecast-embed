import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model({id}) {
    return this.get('store')
      .query('show', {
        project: id,
        include: 'vod'
      })
      .then((results) => {
        return results.filter((show) => {
          return show.get('vods.length') > 0;
        })
      });
  }
});