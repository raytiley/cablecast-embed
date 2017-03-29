import DS from 'ember-data';

export default DS.Model.extend({
  embedCode: DS.attr('string'),
  show: DS.belongsTo('show')
});