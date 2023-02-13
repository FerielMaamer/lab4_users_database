const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [4, 'Username needs to be at least 4 characters'],
    required:[true, 'Username is required']
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: [true, 'Email address is required'],
  },
  address: {
    street: {type: String, required:true},
    suite: {type: String, required:true},
    city: {
        type: String,
        match: [/^[a-zA-Z ]*$/],
        required: [true, 'City is required'],
    },
    zipcode:{
        type: String,
        validate: {
            validator: function(v){
                return /\d{5}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid zip code!`
        },
        required:[true, 'zipcode is required']
    },
    geo: {
        lat: {type: String, required:true},
        lng: {type: String, required:true}
    }
  },
  phone: {
    type: String,
    validate: {
        validator: function(v){
            return /\d{1}-\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    },
    required:[true, 'User phone number required']
  },
  website: {
    type: String,
    match: [/^(?=http|https)*/m, 'has to start with http or https'],
    required:[true, 'Web address is required']
  },
  company: {
    name: {type: String, required:true},
    catchPhrase: {type: String, required:true},
    bs: {type: String, required:true}
  }
  
  
});

const User = mongoose.model("Users", UsersSchema);
module.exports = User;