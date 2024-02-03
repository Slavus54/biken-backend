const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// API

const towns = require('./api/towns.json')

// schemas

const Profiles = require('./schemas/Profiles')  
const Itineraries = require('./schemas/Itineraries')  
const Bikes = require('./schemas/Bikes')  
const Tricks = require('./schemas/Tricks')  
const Places = require('./schemas/Places')  
const Cyclists = require('./schemas/Cyclists')  
const Products = require('./schemas/Products')  

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./microservices/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/Biken-COM'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        weekday: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Bicycle {
        shortid: String!,
        title: String!,
        category: String!,
        status: String,!
        mileage: Float!,
        image: String!,
        likes: Float!
    }
    type Point {
        id: String!,
        label: String!,
        surface: String!,
        score: Float!,
        dot: Cord!
    }
    input IPoint {
        id: String!,
        label: String!,
        surface: String!,
        score: Float!,
        dot: ICord!
    }
    type Race {
        shortid: String!,
        name: String!,
        text: String!,
        speed: Float!,
        image: String!,
        respect: Float!
    }
    type Invite {
        shortid: String!,
        name: String!,
        fullname: String!,
        category: String!,
        percent: Float!,
        dateUp: String!
    }
    type Rate {
        shortid: String!,
        name: String!,
        msg: String!,
        cost: Float!
    }
    type Detail {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        explanation: String!,
        likes: Float!
    }
    type Step {
        id: String!,
        content: String!,
        dateUp: String!
    }
    input IStep {
        id: String!,
        content: String!,
        dateUp: String!
    }
    type Location {
        shortid: String!,
        name: String!,
        text: String!,
        format: String!,
        image: String!,
        cords: Cord!
    }
    type Video {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        url: String!,
        likes: Float!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        answer: String!
    }
    type Infrastructure {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        distance: Float!,
        rating: Float!
    }
    type Competition {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        format: String!,
        image: String!,
        likes: Float!
    }
    type Fact {
        shortid: String!,
        name: String!,
        content: String!,
        level: String!,
        isTrue: Boolean!
    }
    type Review {
        shortid: String!,
        name: String!,
        text: String!,
        criterion: String!,
        rating: Float!,
        image: String!
    }
    type Offer {
        shortid: String!,
        name: String!,
        marketplace: String!,
        cost: Float!,
        cords: Cord!,
        likes: Float!
    }
    type Product {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        format: String!,
        country: String!,
        url: String!,
        status: String!,
        reviews: [Review]!,
        offers: [Offer]!
    }
    type Cyclist {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        fullname: String!,
        category: String!,
        sex: String!,
        country: String!,
        rating: Float!,
        competitions: [Competition]!,
        facts: [Fact]!
    }
    type Place {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        surface: String!,
        region: String!,
        cords: Cord!,
        image: String!,
        questions: [Question]!,
        infrastructures: [Infrastructure]!
    }
    type Trick {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        bicycles: [String]!,
        max_speed: Float!,
        steps: [Step]!,
        stars: Float!,
        locations: [Location]!,
        videos: [Video]!
    }
    type Bike {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        speeds: Float!,
        wheel_size: Float!,
        country: String!,
        phone: String!,
        cost: Float!,
        image: String!,
        region: String!,
        cords: Cord!,
        isOpen: Boolean!,
        rates: [Rate]!,
        details: [Detail]!
    }
    type Itinerary {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        level: String!,
        region: String!,
        cords: Cord!,
        points: [Point]!, 
        distance: Float!,
        latest_bike: String!,
        races: [Race]!,
        invites: [Invite]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        security_code: String!,
        telegram: String!,
        weekday: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        bicycles: [Bicycle]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, security_code: String!, telegram: String!, weekday: String!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        login(security_code: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileSecurityCode(account_id: String!, security_code: String!) : String!
        updateProfileWeekday(account_id: String!, weekday: String!) : String!
        manageProfileBicycle(account_id: String!, option: String!, title: String!, category: String!, status: String!, mileage: Float!, image: String!, coll_id: String!) : String!
        createItinerary(username: String!, id: String!, title: String!, category: String!, level: String!, region: String!, cords: ICord!, points: [IPoint]!, distance: Float!) : String!
        getItineraries(username: String!) : [Itinerary]!
        getItinerary(username: String!, shortid: String!) : Itinerary!
        manageItineraryRace(username: String!, id: String!, option: String!, text: String!, speed: Float!, image: String!, coll_id: String!) : String!
        updateItineraryBike(username: String!, id: String!, latest_bike: String!) : String!
        makeItineraryInvite(username: String!, id: String!, fullname: String!, category: String!, percent: Float!, dateUp: String!) : String!
        createBike(username: String!, id: String!, title: String!, category: String!, speeds: Float!, wheel_size: Float!, country: String!, phone: String!, cost: Float!, image: String!, region: String!, cords: ICord!) : String!
        getBikes(username: String!) : [Bike]!
        getBike(username: String!, shortid: String!) : Bike!
        makeBikeRate(username: String!, id: String!, msg: String!, cost: Float!) : String!
        updateBikeImage(username: String!, id: String!, image: String!) : String!
        closeBikeAuction(username: String!, id: String!) : String!
        manageBikeDetail(username: String!, id: String!, option: String!, text: String!, category: String!, coll_id: String!, explanation: String!) : String!
        createTrick(username: String!, id: String!, title: String!, category: String!, level: String!, bicycles: [String]!, max_speed: Float!, steps: [IStep]!) : String!
        getTricks(username: String!) : [Trick]!
        getTrick(username: String!, shortid: String!) : Trick!
        makeTrickLocation(username: String!, id: String!, text: String!, format: String!, image: String!, cords: ICord!) : String!
        updateTrickStep(username: String!, id: String!, content: String!, dateUp: String!, coll_id: String!) : String!
        updateTrickRating(username: String!, id: String!, stars: Float!) : String!
        manageTrickVideo(username: String!, id: String!, option: String!, title: String!, category: String!, url: String!, coll_id: String!) : String!
        createPlace(username: String!, id: String!, title: String!, category: String!, surface: String!, region: String!, cords: ICord!, image: String!) : String!
        getPlaces(username: String!) : [Place]!
        getPlace(username: String!, shortid: String!) : Place!
        makePlaceQuestion(username: String!, id: String!, text: String!, level: String!, answer: String!) : String!
        updatePlacePhoto(username: String!, id: String!, image: String!) : String!
        managePlaceInfrastructure(username: String!, id: String!, option: String!, title: String!, category: String!, distance: Float!, rating: Float!, coll_id: String!) : String!
        createCyclist(username: String!, id: String!, fullname: String!, category: String!, sex: String!, country: String!) : String!
        getCyclists(username: String!) : [Cyclist]!
        getCyclist(username: String!, shortid: String!) : Cyclist!
        manageCyclistCompetition(username: String!, id: String!, option: String!, text: String!, category: String!, format: String!, image: String!, coll_id: String!) : String!
        updateCyclistRating(username: String!, id: String!, rating: Float!) : String!
        makeCyclistFact(username: String!, id: String!, content: String!, level: String!, isTrue: Boolean!) : String!
        createProduct(username: String!, id: String!, title: String!, category: String!, format: String!, country: String!, url: String!, status: String!) : String!
        getProducts(username: String!) : [Product]!
        getProduct(username: String!, shortid: String!) : Product!
        makeProductReview(username: String!, id: String!, text: String!, criterion: String!, rating: Float!, image: String!) : String!
        updateProductInfo(username: String!, id: String!, url: String!, status: String!) : String!
        manageProductOffer(username: String!, id: String!, option: String!, marketplace: String!, cost: Float!, cords: ICord!, coll_id: String!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, security_code, telegram, weekday, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username, weekday}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    security_code,
                    telegram,
                    weekday,
                    region,
                    cords,
                    main_photo,
                    bicycles: [],
                    account_components: []
                })

                drop_object = {account_id, username, weekday}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {security_code}) => {
            const profile = await Profiles.findOne({security_code}) 
            let drop_object = {account_id: '', username: '', weekday: ''}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username, weekday: profile.weekday}                       
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileSecurityCode: async (_, {account_id, security_code}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.security_code = security_code

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileWeekday: async (_, {account_id, weekday}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.weekday = weekday

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileBicycle: async (_, {account_id, option, title, category, status, mileage, image, coll_id}) => {
            const profile = await Profiles.findOne({account_id})
            
            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.bicycles = [...profile.bicycles, {
                        shortid,
                        title,
                        category,
                        status,
                        mileage,
                        image,
                        likes: 0
                    }]

                    profile.bicycles = slicer(profile.bicycles, 40)

                } else if (option === 'delete') {

                    profile.bicycles = profile.bicycles.filter(el => el.shortid !== coll_id)

                } else {

                    profile.bicycles.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1
                            } else if (option === 'update') {
                                el.status = status
                                el.mileage = mileage
                                el.image = image
                            }
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createItinerary: async (_, {username, id, title, category, level, region, cords, points, distance}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const itinerary = await Itineraries.findOne({title, category, level, region, cords, distance})

            if (profile && !itinerary) {
                if (profile.account_components.filter(el => el.path === 'itinerary').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'itinerary'
                    }]

                    const newItinerary = new Itineraries({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        level,
                        region,
                        cords,
                        points, 
                        distance,
                        latest_bike: '',
                        races: [],
                        invites: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newItinerary.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getItineraries: async (_, {username}) => {
            const itineraries = await Itineraries.find() 

            return itineraries
        },
        getItinerary: async (_, {username, shortid}) => {
            const itinerary = await Itineraries.findOne({shortid}) 

            return itinerary
        },
        manageItineraryRace: async (_, {username, id, option, text, speed, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const itinerary = await Itineraries.findOne({shortid: id})

            if (profile && itinerary) {
                if (option === 'create') {

                    let shortid = get_id()

                    itinerary.races = [...itinerary.races, {
                        shortid,
                        name: profile.username,
                        text,
                        speed,
                        image,
                        respect: 0
                    }]

                    itinerary.races = slicer(itinerary.races, 40)

                } else if (option === 'respect') {

                    itinerary.races.map(el => {
                        if (el.shortid === coll_id) {
                            el.respect += 1
                        }
                    })

                } else {

                    itinerary.races = itinerary.races.filter(el => el.shortid !== coll_id)
                }

                await Itineraries.updateOne({shortid: id}, {$set: itinerary})
            
                return 'Success'
            }
        
            return 'Error'
        },
        updateItineraryBike: async (_, {username, id, latest_bike}) => {
            const profile = await Profiles.findOne({username})
            const itinerary = await Itineraries.findOne({shortid: id})

            if (profile && itinerary) {

                itinerary.latest_bike = latest_bike
               
                await Itineraries.updateOne({shortid: id}, {$set: itinerary})
            
                return 'Success'
            }
        
            return 'Error'
        },
        makeItineraryInvite: async (_, {username, id, fullname, category, percent, dateUp}) => {
            const profile = await Profiles.findOne({username})
            const itinerary = await Itineraries.findOne({shortid: id})

            if (profile && itinerary) {

                let shortid = get_id()

                itinerary.invites = [...itinerary.invites, {
                    shortid,
                    name: profile.username,
                    fullname,
                    category,
                    percent,
                    dateUp
                }]

                itinerary.invites = slicer(itinerary.invites, 40)
               
                await Itineraries.updateOne({shortid: id}, {$set: itinerary})
            
                return 'Success'
            }
        
            return 'Error'
        },
        createBike: async (_, {username, id, title, category, speeds, wheel_size, country, phone, cost, image, region, cords}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const bike = await Bikes.findOne({title, category, speeds, wheel_size, cords})
        
            if (profile && !bike) {
                if (profile.account_components.filter(el => el.path === 'bike').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'bike'
                    }]

                    const newBike = new Bikes({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        speeds,
                        wheel_size,
                        country,
                        phone,
                        cost,
                        image,
                        region,
                        cords,
                        isOpen: true,
                        rates: [],
                        details: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newBike.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getBikes: async (_, {username}) => {
            const bikes = await Bikes.find()

            return bikes
        },
        getBike: async (_, {username, shortid}) => {
            const bike = await Bikes.findOne({shortid})

            return bike
        },
        makeBikeRate: async (_, {username, id, msg, cost}) => {
            const profile = await Profiles.findOne({username})
            const bike = await Bikes.findOne({shortid: id})

            if (profile && bike) {

                profile.account_components = [...profile.account_components, {
                    shortid: bike.shortid,
                    title: bike.title,
                    path: 'bike'
                }]

                bike.rates = [...bike.rates, {
                    shortid: profile.account_id,
                    name: profile.username,
                    msg,
                    cost
                }]

                bike.cost = cost

                await Profiles.updateOne({username}, {$set: profile})
                await Bikes.updateOne({shortid: id}, {$set: bike})

                return 'Success'
            }
        
            return 'Error'
        },
        updateBikeImage: async (_, {username, id, image}) => {
            const profile = await Profiles.findOne({username})
            const bike = await Bikes.findOne({shortid: id})

            if (profile && bike) {

                bike.image = image
               
                await Bikes.updateOne({shortid: id}, {$set: bike})

                return 'Success'
            }
        
            return 'Error'
        },
        closeBikeAuction: async (_, {username, id}) => {
            const profile = await Profiles.findOne({username})
            const bike = await Bikes.findOne({shortid: id})

            if (profile && bike) {

                bike.isOpen = false
                
                await Bikes.updateOne({shortid: id}, {$set: bike})

                return 'Success'
            }
        
            return 'Error'
        },
        manageBikeDetail: async (_, {username, id, option, text, category, coll_id, explanation}) => {
            const profile = await Profiles.findOne({username})
            const bike = await Bikes.findOne({shortid: id})

            if (profile && bike) {
                if (option === 'create') {

                    let shortid = get_id()

                    bike.details = [...bike.details, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        explanation: '',
                        likes: 0
                    }]

                    bike.details = slicer(bike.details, 40)

                } else if (option === 'delete') {

                    bike.details = bike.details.filter(el => el.shortid !== coll_id)

                } else {

                    bike.details.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'explain') {
                                el.explanation = explanation
                            } else if (option === 'like') {
                                el.likes += 1
                            }
                        }
                    })
                }

                await Bikes.updateOne({shortid: id}, {$set: bike})

                return 'Success'
            }
        
            return 'Error'
        },
        createTrick: async (_, {username, id, title, category, level, bicycles, max_speed, steps}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const trick = await Tricks.findOne({title})
        
            if (profile && !trick) {
                if (profile.account_components.filter(el => el.path === 'trick').find(el => el.title === title) === undefined) {
                    
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'trick'
                    }]

                    const newTrick = new Tricks({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        level,
                        bicycles,
                        max_speed,
                        steps,
                        stars: 0,
                        locations: [],
                        videos: []
                    })
                
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newTrick.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getTricks: async (_, {username}) => {
            const tricks = await Tricks.find()

            return tricks
        },
        getTrick: async (_, {username, shortid}) => {
            const trick = await Tricks.findOne({shortid})

            return trick
        },
        makeTrickLocation: async (_, {username, id, text, format, image, cords}) => {
            const profile = await Profiles.findOne({username})
            const trick = await Tricks.findOne({shortid: id})

            if (profile && trick) {

                let shortid = get_id()

                trick.locations = [...trick.locations, {
                    shortid,
                    name: profile.username,
                    text,
                    format,
                    image,
                    cords
                }]

                trick.locations = slicer(trick.locations, 40)

                await Tricks.updateOne({shortid: id}, {$set: trick})

                return 'Success'
            }

            return 'Error'
        },
        updateTrickStep: async (_, {username, id, content, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const trick = await Tricks.findOne({shortid: id})

            if (profile && trick) {

                trick.steps.map(el => {
                    if (el.id === coll_id) {
                        el.content = content
                        el.dateUp = dateUp
                    }
                })

                await Tricks.updateOne({shortid: id}, {$set: trick})

                return 'Success'
            }

            return 'Error'
        },
        updateTrickRating: async (_, {username, id, stars}) => {
            const profile = await Profiles.findOne({username})
            const trick = await Tricks.findOne({shortid: id})

            if (profile && trick) {

                trick.stars = stars
               
                await Tricks.updateOne({shortid: id}, {$set: trick})

                return 'Success'
            }

            return 'Error'
        },
        manageTrickVideo: async (_, {username, id, option, title, category, url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const trick = await Tricks.findOne({shortid: id})

            if (profile && trick) {
                if (option === 'create') {

                    let shortid = get_id()

                    trick.videos = [...trick.videos, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        url,
                        likes: 0
                    }]

                    trick.videos = slicer(trick.videos, 40)

                } else if (option === 'like') {

                    trick.videos.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    trick.videos = trick.videos.filter(el => el.shortid !== coll_id)
                }

                await Tricks.updateOne({shortid: id}, {$set: trick})

                return 'Success'
            }

            return 'Error'
        },
        createPlace: async (_, {username, id, title, category, surface, region, cords, image}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const place = await Places.findOne({username, title, category, surface, region, cords})
            
            if (profile && !place) {
                if (profile.account_components.filter(el => el.path === 'place').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'place'
                    }]

                    const newPlace = new Places({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        surface,
                        region,
                        cords,
                        image,
                        questions: [],
                        infrastructures: []
                    })

                    const session = await Profiles.startSession()

                    try {
                        const transaction = await session.withTransaction(async () => {
                            await Profiles.updateOne({username, account_id: id}, {$set: profile})
                            await newPlace.save()
                        }, {readPreference: 'primary', readConcern: {level: 'local'}, writeConcern: {w: 'majority'}})

                        if (transaction) {
                            console.log('Place successfully created...')
                        }

                    } catch (err) {
                        console.log('Transaction was aborted with an error - ', err)
                    } finally {
                        await session.endSession()
                    }                    
                
                    return 'Success'
                }
            }

            return 'Error'
        },
        getPlaces: async (_, {username}) => {
            const places = await Places.find()

            return places
        },
        getPlace: async (_, {username, shortid}) => {
            const place = await Places.findOne({shortid})

            return place
        },
        makePlaceQuestion: async (_, {username, id, text, level, answer}) => {
            const profile = await Profiles.findOne({username})
            const place = await Places.findOne({shortid: id})

            if (profile && place) {
                
                let shortid = get_id()

                place.questions = [...place.questions, {
                    shortid,
                    name: profile.username,
                    text,
                    level,
                    answer
                }]

                place.questions = slicer(place.questions, 40)

                await Places.updateOne({shortid: id}, {$set: place})

                return 'Success'
            }

            return 'Error'
        },
        updatePlacePhoto: async (_, {username, id, image}) => {
            const profile = await Profiles.findOne({username})
            const place = await Places.findOne({shortid: id})

            if (profile && place) {

                place.image = image

                await Places.updateOne({shortid: id}, {$set: place})

                return 'Success'
            }

            return 'Error'   
        },
        managePlaceInfrastructure: async (_, {username, id, option, title, category, distance, rating, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const place = await Places.findOne({shortid: id})

            if (profile && place) {
                if (option === 'create') {

                    let shortid = get_id()

                    place.infrastructures = [...place.infrastructures, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        distance,
                        rating
                    }]

                    place.infrastructures = slicer(place.infrastructures, 40)

                } else if (option === 'update') {

                    place.infrastructures.map(el => {
                        if (el.shortid === coll_id) {
                            el.rating = rating
                        }
                    })

                } else {

                    place.infrastructures = place.infrastructures.filter(el => el.shortid !== coll_id)
                }

                await Places.updateOne({shortid: id}, {$set: place})

                return 'Success'
            }

            return 'Error' 
        },
        createCyclist: async (_, {username, id, fullname, category, sex, country}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const cyclist = await Cyclists.findOne({username, fullname, category, sex, country})
        
            if (profile && !cyclist) {
                if (profile.account_components.filter(el => el.path === 'cyclist').find(el => el.title === fullname) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: 'cyclist'
                    }]

                    const newCyclist = new Cyclists({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        fullname,
                        category,
                        sex,
                        country,
                        rating: 0,
                        competitions: [],
                        facts: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newCyclist.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getCyclists: async (_, {username}) => {
            const cyclists = await Cyclists.find()

            return cyclists
        },
        getCyclist: async (_, {username, shortid}) => {
            const cyclist = await Cyclists.findOne({shortid})

            return cyclist
        },
        manageCyclistCompetition: async (_, {username, id, option, text, category, format, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const cyclist = await Cyclists.findOne({shortid: id})
        
            if (profile && cyclist) {
                if (option === 'create') {

                    let shortid = get_id()

                    cyclist.competitions  = [...cyclist.competitions, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        format,
                        image,
                        likes: 0
                    }]

                    cyclist.competitions = slicer(cyclist.competitions, 40)

                } else if (option === 'like') {

                    cyclist.competitions.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    cyclist.competitions = cyclist.competitions.filter(el => el.shortid !== coll_id)
                }

                await Cyclists.updateOne({shortid: id}, {$set: cyclist})

                return 'Success'
            }

            return 'Error'
        },
        updateCyclistRating: async (_, {username, id, rating}) => {
            const profile = await Profiles.findOne({username})
            const cyclist = await Cyclists.findOne({shortid: id})
        
            if (profile && cyclist) {
                
                cyclist.rating = rating
                
                await Cyclists.updateOne({shortid: id}, {$set: cyclist})

                return 'Success'
            }

            return 'Error'
        },
        makeCyclistFact: async (_, {username, id, content, level, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const cyclist = await Cyclists.findOne({shortid: id})
        
            if (profile && cyclist) {
            
                let shortid = get_id()

                cyclist.facts = [...cyclist.facts, {
                    shortid,
                    name: profile.username,
                    content,
                    level,
                    isTrue
                }]

                cyclist.facts = slicer(cyclist.facts, 40)
                
                await Cyclists.updateOne({shortid: id}, {$set: cyclist})

                return 'Success'
            }

            return 'Error'
        },
        createProduct: async (_, {username, id, title, category, format, country, url, status}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const product = await Products.findOne({username, title, category, format, country, url, status})
        
            if (profile && !product) {
                if (profile.account_components.filter(el => el.path === 'product').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'product'
                    }]

                    const newProduct = new Products({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        format,
                        country,
                        url,
                        status,
                        reviews: [],
                        offers: []
                    })
                
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newProduct.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getProducts: async (_, {username}) => {
            const products = await Products.find()

            return products
        },
        getProduct: async (_, {username, shortid}) => {
            const product = await Products.findOne({shortid})

            return product
        },
        makeProductReview: async (_, {username, id, text, criterion, rating, image}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {
                
                let shortid = get_id()

                product.reviews = [...product.reviews, {
                    shortid,
                    name: profile.username,
                    text,
                    criterion,
                    rating,
                    image
                }]

                product.reviews = slicer(product.reviews, 40)

                await Products.updateOne({shortid: id}, {$set: product})
                
                return 'Success'
            }

            return 'Error'
        },
        updateProductInfo: async (_, {username, id, url, status}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {

                product.url = url
                product.status = status
                
                await Products.updateOne({shortid: id}, {$set: product})
                
                return 'Success'
            }

            return 'Error'
        },
        manageProductOffer: async (_, {username, id, option, marketplace, cost, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const product = await Products.findOne({shortid: id})
        
            if (profile && product) {
                if (option === 'create') {

                    let shortid = get_id()

                    product.offers = [...product.offers, {
                        shortid,
                        name: profile.username,
                        marketplace,
                        cost,
                        cords,
                        likes: 0
                    }]

                    product.offers = slicer(product.offers, 40)

                } else if (option === 'like') {

                    product.offers.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    product.offers = product.offers.filter(el => el.shortid !== coll_id)
                }

                await Products.updateOne({shortid: id}, {$set: product})
                
                return 'Success'
            }

            return 'Error'
        }

        
       



    }
}

apollo_start(typeDefs, resolvers, app)

app.get('/towns', async (req, res) => {
    res.send(towns)
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))