//this is for seeding the data so to work on project
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/Three-point");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[rand].city},${cities[rand].state}`,
      title: `${sample(places)} ${sample(descriptors)}`,
    });
    await camp.save();
  }
};
seedDb().then(() => {
  mongoose.connection.close();
});
