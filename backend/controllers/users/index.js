const bcrypt = require('bcrypt');
const Car = require('../../models/Car');
const User = require('../../models/User');

module.exports = {

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch {
      res.status(404).json('Wrong id')
    }
  },

  updateUserById: async(req, res, next) => {
    const userId = req.params.userId;
    const user = req.body;
    try {
    user.password = bcrypt.hashSync(req.body.password, 10);
    const update = user.update = await User.findByIdAndUpdate(userId, user);
    res.status(200).json(update);
    } catch(err){
      res.status(404).json('Wrong id')
    }
  },

  addCarToUser: async (req, res) => {
    const userId = req.params.userId;
    const newCar = new Car(req.body);
    try {
      const user = await User.findById(userId);
      newCar.seller = user;
      await newCar.save();
      user.cars.push(newCar);
      const car = await user.save();
      res.status(200).json(car);
    } catch{
      res.status(400).send('Could not add the car')
    }
  },

  getUserCarsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('cars');
      res.status(200).json(user);
    } catch{
      res.status(400).send('Wrong id')
    }
  },

};
