/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('id').primary();
		table.string('username');
		table.string('email');
		table.string('password');
		table.bigInteger('status').default(1).comment('0.disabled , 1.enabled');
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('users');
};