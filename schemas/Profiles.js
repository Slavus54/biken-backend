const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    security_code: String,
    telegram: String,
    weekday: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    bicycles: [{
        shortid: String,
        title: String,
        category: String,
        status: String,
        mileage: Number,
        image: String,
        likes: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)