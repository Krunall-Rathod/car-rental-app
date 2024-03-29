const Car = require('../models/Car')
// getallcars
const getallcars = async (req, res) => {

    try {
        const car = await Car.find({}).sort({createdAt : -1})

        if (car.length === 0) return res.status(404).json('No car available')

        res.status(200).json(car)
    } catch (error) {
        res.status(500).json(error)
    }

}


// addcar - Admin
const addcar = async (req, res) => {

    try {
        const car = await Car.create(req.body)

        if (!car) return res.status(403).json('Something Wrong')

        res.status(201).json(car)
    } catch (error) {
        res.status(500).json(error)
    }

}


// editcar - Admin
const editcar = async (req, res) => {

    try {
        const car = await Car.findOne({ _id: req.params.id });
        car.name = req.body.name || car.name;
        car.image = req.body.image || car.image;
        car.fuelType = req.body.fuelType || car.fuelType;
        car.rentPerHour = req.body.rentPerHour || car.rentPerHour
        car.capacity = req.body.capacity || car.capacity

        await car.save();

        res.status(200).json('Car updated successfully')

    } catch (error) {
        res.status(500).json(error)
    }

}


// deletecar - Admin
const deletecar = async (req, res) => {

    try {
        const car = await Car.findByIdAndDelete(req.params.id)

        if (!car) return res.status(404).json('Car Not Found')

        res.status(200).json('Car Deleted Successfuly')
    } catch (error) {
        res.status(500).json(error)
    }

}


// getsinglecar
const getsinglecar = async (req, res) => {

    try {
        const car = await Car.findOne({ _id: req.params.id })

        if (!car) return res.status(404).json('Car Not Found')

        res.status(200).json(car)
    } catch (error) {
        res.status(500).json(error)
    }

}


module.exports = { getallcars, addcar, editcar, deletecar, getsinglecar }

