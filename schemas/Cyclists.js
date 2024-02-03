const {Schema, model} = require('mongoose') 

const Cyclists = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    fullname: String,
    category: String,
    sex: String,
    country: String,
    rating: Number,
    competitions: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        format: String,
        image: String,
        likes: Number 
    }],
    facts: [{
        shortid: String,
        name: String,
        content: String,
        level: String,
        isTrue: Boolean
    }]
})

module.exports = model('Cyclists', Cyclists)