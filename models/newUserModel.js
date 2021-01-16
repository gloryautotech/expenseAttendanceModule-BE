const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const moment = require('moment');

let userSchema = new Schema({
        userId:{
            type:String,
            unique:true
        },
        name:{
            type:String,
        },
        userEmail:{
            type:String,
        },
        userName:{
            type:String,
            required:true,
            default:''
        },
        userPassword:{
            type:String,
            required:true,
            default:''
        },
        created:{
            type:Date,
            default:Date.now 
        }
})
mongoose.model('user',userSchema);