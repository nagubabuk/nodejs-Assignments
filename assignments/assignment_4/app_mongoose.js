const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isPromoted : { type: Boolean}
});

const User = mongoose.model('User', taskSchema);

module.exports = User; 





// const mongoose = require('mongoose');
// // var faker = require('faker');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     name:{type:String,required: true},
//     email:{type:String,unique: true},
//     isPromoted: {type:Boolean,default:null}
// });
// const User = mongoose.model('User',userSchema);

// module.exports = User;

