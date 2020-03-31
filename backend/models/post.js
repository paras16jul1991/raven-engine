const mongoose = require('mongoose')

const postschema  = mongoose.Schema({
                         title   : { type : String, require : true, default : 'Hello'},
                         content : { type : String, require : true, default : 'Hello'}
                     });

module.exports =  mongoose.model('Post' , postschema );                    