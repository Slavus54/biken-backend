const {Schema, model} = require('mongoose') 

const Places = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    surface: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    image: String,
    questions: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        answer: String
    }],
    infrastructures: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        distance: Number,
        rating: Number
    }]
})

module.exports = model('Places', Places)