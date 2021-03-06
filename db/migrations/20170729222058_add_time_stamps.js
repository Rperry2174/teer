exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.timestamps(true, true);
    }),
    knex.schema.table('charities', function(table) {
      table.timestamps(true, true);
    }),
    knex.schema.table('events', function(table) {
      table.timestamps(true, true);
    }),
    knex.schema.table('reviews', function(table) {
      table.timestamps(true, true);
    }),
    knex.schema.table('volunteer_events', function(table) {
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
    knex.schema.table('charities', function(table) {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
    knex.schema.table('events', function(table) {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
    knex.schema.table('reviews', function(table) {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
    knex.schema.table('volunteer_events', function(table) {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    }),
  ]);
};
