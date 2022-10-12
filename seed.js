clearData().then( function() {
  // console.log('Table cleared')
})
.then(inserts)
.then( function() {
  // console.log('inserts done')
})
.then( function() {
  process.exit(0)
})
.catch( function(error) {
  db.destroy()
  // console.log('error', error)
})


var knex = require('knex')({
    client: 'pg',
    connection:
      'postgresql://postgres:postgres@localhost:5432/barapp',
    //   + '?ssl=true',
    debug: false
  });
  
  // let games = [];
  var categories = require('./categories')
  var data = require('./fakeData')
  
  var clearData = function() {
    return knex.transaction(trx =>
      trx.raw(
        `TRUNCATE 
          inventory,
          bottles,
          categories,
        `
      )
        .then(function() {
          Promise.all([
            trx.raw(`ALTER SEQUENCE inventory_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE categories_id_seq minvalue 0 START WITH 1`),
            trx.raw(`SELECT setval('inventory_id_seq', 0)`),
            trx.raw(`SELECT setval('categories_id_seq', 0)`)
          ])
  })
    )
  }
  
  const inserts = function() {
    const insertPromises = [];
    categories.forEach(function(cat) {
        insertPromises.push(knex('categories')
        .insert({ category: cat.category, sub: cat.sub })
      );
    })
    data.forEach(function(bottle) {
      insertPromises.push(knex('bottles')
        .insert({ upc: bottle.upc, brand: bottle.brand, year: bottle.year, category: bottle.category, size: bottle.size, msrp: bottle.msrp, bottle_desc: bottle.desc })
      );
      insertPromises.push(knex('inventory')
        .insert({ bottle: bottle.brand, year: bottle.year, category: bottle.category, size: bottle.size, msrp: bottle.msrp, bottle_desc: bottle.desc })
      );
    });
    return Promise.all(insertPromises);
  };
  
 