import DS from 'ember-data';

export default DS.Model.extend({
  cgTitle: DS.attr('string'),
  vods: DS.hasMany('vod')
});