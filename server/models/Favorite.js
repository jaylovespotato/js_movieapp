const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const favoriteSchema = mongoose.Schema({
    // 외래키 설정인듯.
    userFrom: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    movieId: {
        type:String,
    },
    movieTitle: {
        type: String,
    },
    moviePost: {
        type:String,
    },
    movieRunTime : {
        type: String,
    },

}, {timestamps:true})


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }