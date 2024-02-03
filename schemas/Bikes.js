const {Schema, model} = require('mongoose') 

const Bikes = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    speeds: Number,
    wheel_size: Number,
    country: String,
    phone: String,
    cost: Number,
    image: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    isOpen: Boolean,
    rates: [{
        shortid: String,
        name: String,
        msg: String,
        cost: Number
    }],
    details: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        explanation: String,
        likes: Number
    }]
})

module.exports = model('Bikes', Bikes)