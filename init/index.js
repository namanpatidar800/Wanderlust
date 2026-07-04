const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
require("dotenv").config({ path: "../.env" });
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

main()
    .then(() =>
    {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main()
{
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () =>
{
    await Listing.deleteMany({});
    const listings = [];
    for (let obj of initData.data) 
    {
        let response = await geocodingClient
            .forwardGeocode({
                query: `${obj.location}, ${obj.country}`,
                limit: 1,
            })
            .send();
        obj.owner = "6a33b9e44dfe4e3cb644b774";
        obj.geometry = response.body.features[0].geometry;
        listings.push(obj);
    }
    await Listing.insertMany(listings);
    console.log("Data was initialized");
};

initDB();