window.addEventListener('load', function(e) {

validator = {
  types: {},
  config: {},
  messages: [],
  validate: function(data) {
    var validator, type;
    
    // clear errors
    messages = [];
    for( member in data ) {
      if( !data.hasOwnProperty(member) )
        continue;
      validator = this.config[member];
      if( ! validator )
        continue;
      type = this.types[validator];
      if( !type ) {
        throw { 
          name: "Unknown validation",
          error : "unknown validator" 
          }};
      if( ! type.validate(data[member])) {
        this.messages.push( type.instructions );
      }
    }
    return this.hasErrors();       
  },
  hasErrors : function() {
    return this.messages.length !== 0;
  }
}

validator.types.isNonEmpty = {
  validate: function (value) {
    return value !== "";
  },
  instructions: "the value cannot be empty"
};
// checks if a value is a number
validator.types.isNumber = {
  validate: function (value) {
    return !isNaN(value);
  },
  instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
};
// checks if the value contains only letters and numbers
validator.types.isAlphaNum = {
  validate: function (value) {
    return !/[^a-z0-9]/i.test(value);
  },
  instructions: "the value can only contain characters and numbers, no special symbols"
};

// configure validation strategies...
validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
};

var data = {
  first_name: "Super",
  last_name: "Man",
  age: "unknown",
  username: "o_O"
};

validator.validate(data);
if (validator.hasErrors()) {
  console.log(validator.messages.join("\n"));
}
}, false);