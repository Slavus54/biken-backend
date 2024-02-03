const {Schema, model} = require('mongoose') 

const Tricks = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    level: String,
    bicycles: [String],
    max_speed: Number,
    steps: [{
        id: String,
        content: String,
        dateUp: String
    }],
    stars: Number,
    locations: [{
        shortid: String,
        name: String,
        text: String,
        format: String,
        image: String,
        cords: {
            lat: Number,
            long: Number
        }
    }],
    videos: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        url: String,
        likes: Number
    }]
})

module.exports = model('Tricks', Tricks)