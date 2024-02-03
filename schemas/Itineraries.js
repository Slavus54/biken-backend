const {Schema, model} = require('mongoose') 

const Itineraries = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    level: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    points: [{
        id: String,
        label: String,
        surface: String,
        score: Number,
        dot: {
            lat: Number,
            long: Number
        }
    }], 
    distance: Number,
    latest_bike: String,
    races: [{
        shortid: String,
        name: String,
        text: String,
        speed: Number,
        image: String,
        respect: Number
    }],
    invites: [{
        shortid: String,
        name: String,
        fullname: String,
        category: String,
        percent: Number,
        dateUp: String
    }]
})

module.exports = model('Itineraries', Itineraries)