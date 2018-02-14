const conn = require('./conn'); 
const Sequelize = require('sequelize');


const Word = conn.define('word', {
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set: function(x){
      this.setDataValue('name', x.toUpperCase());
    }
  }
}, {
  hooks: {
    beforeValidate: function(word){
      if(!word.name){
        word.name = 'YOU FORGOT'
      }
    }
  },
  getterMethods: {
    letterCount: function(){
      return this.name.length;
    }
  }
});

Word.getTheCount = function(){
  return this.findAll({
    where: { name: 'the' }
  })
  .then( words => words.length);
}

Word.prototype.changeMeToInactive = function(){
  this.active = false;
}

Word.prototype.foo = function(){
  return 'foo';
};

module.exports = Word;
