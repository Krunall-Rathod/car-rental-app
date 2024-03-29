const mongoode = require('mongoose')

const carSchema = new mongoode.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    bookedTimeSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true },
        },
    ],

    rentPerHour: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const Car = mongoode.model("Car", carSchema)
module.exports = Car    