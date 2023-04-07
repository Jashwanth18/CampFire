const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(
  'mongodb://localhost:27017/yelp-camp',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const stock_img = [
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680321038/CampFire/mafrwbu4ptadbp6l5gri.jpg",
    filename: "CampFire/mafrwbu4ptadbp6l5gri",
  },
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680140271/CampFire/ntaw74usljyfqtsx60q7.jpg",
    filename: "Campfire/ntaw74usljyfqtsx60q7",
  },
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680321056/CampFire/ywdjhiqnhwlqcinme45a.jpg",
    filename: "CampFire/ywdjhiqnhwlqcinme45a",
  },
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680411296/CampFire/ros5tedif1pb51sxcxir.jpg",
    filename: "CampFire/ros5tedif1pb51sxcxir",
  },
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680411311/CampFire/j2mwuuffyqbubt8mia2j.jpg",
    filename: "CampFire/j2mwuuffyqbubt8mia2j",
  },
  {
    url: "https://res.cloudinary.com/dniu6qfly/image/upload/v1680411367/CampFire/uzu2tmy5eqh0qkxoymze.jpg",
    filename: "CampFire/uzu2tmy5eqh0qkxoymze",
  },
];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    //let random1000 = Math.floor(Math.random() * 1000);
    let random18 = Math.floor(Math.random() * 18);
    let random6 = Math.floor(Math.random() * 5);
    let price = Math.floor(Math.random() * 1500) + 300;
    const newCamp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random18].city}, ${cities[random18].state}`,
      description:
        "Perched atop a quaint hill, This Campground is surrounded by some spectacular landscapes. Here, time moves unhurriedly, slowly painting the sky a different hue each passing hour. The eco-friendly constructed tree and mud cottages reflect barefoot luxury, helping you stay rooted to Earth but still be close to Heaven.",
      price: price,
      images: [
        {
          url: stock_img[random6].url,
          filename: stock_img[random6].filename,
        },
        {
          url: stock_img[random6 + 1].url,
          filename: stock_img[random6 + 1].filename,
        },
      ],
      author: "642fdb7060fe23003469f72b",
      geometry: {
        type: "Point",
        coordinates: [cities[random18].longitude, cities[random18].latitude],
      },
    });
    await newCamp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
