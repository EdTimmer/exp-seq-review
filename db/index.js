const Sequelize = require('sequelize');
const conn = require('./conn'); 

const Word = require('./Word');

const DataType = conn.define('dataType', {
  name: Sequelize.STRING
});

Word.belongsTo(DataType, { as: 'wordType' });

const seed = ()=> {
  let noun;
  return DataType.create({
    name: 'noun'
  })
  .then( (_noun)=> {
    noun = _noun;
    console.log(noun.get());
    return Promise.all([
      Word.create({ name: 'the'}),
      Word.create({ name: 'quick' }),
      Word.create({ name: 'brown' }),
      Word.create({  }),
    ])
    .then(([the, quick, brown ])=> {
      return Promise.all([
        the.setWordType(noun),
        quick.setWordType(noun),
        brown.setWordType(noun),
      ]);
    })
    .then(([the])=> {
      the.changeMeToInactive();
      console.log(the.active);
      console.log(the.foo());
    });
  })
}

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  seed,
  models : {
    Word,
    DataType
  }
};
