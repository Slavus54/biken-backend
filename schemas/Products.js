const {Schema, model} = require('mongoose') 

const Products = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    format: String,
    country: String,
    url: String,
    status: String,
    reviews: [{
        shortid: String,
        name: String,
        text: String,
        criterion: String,
        rating: Number,
        image: String
    }],
    offers: [{
        shortid: String,
        name: String,
        marketplace: String,
        cost: Number,
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }]
})

module.exports = model('Products', Products)