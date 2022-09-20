/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('article').del()
  await knex('article').insert([
    { heading: 'Article1', content: 'This is article 1.', },
    { heading: 'Article2', content: 'This is article 2.', },
    { heading: 'Article3', content: 'This is article 3.', },
  ]);
};
