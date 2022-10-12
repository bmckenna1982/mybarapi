const express = require("express");
const BottleService = require("./bottle-service");
const path = require("path");
// const { requireAuth } = require("../middleware/jwt-auth");

const bottleRouter = express.Router();
const bodyParser = express.json();

bottleRouter
    .route("/")
    .get((req, res) => {
        BottleService.getAllBottles(req.app.get('db'))
            .then(bottles => {
                res.json({success: true, bottles: bottles});
            });
    })
    .post(bodyParser, (req, res) => {
        //category is sent as number from drop down list selection
        const { upc, brand, category } = req.body;

        if(!upc || !brand || !category ) {
            return res.status(400).send('Each bottle must include UPC, brand, and a category')
        }

        BottleService.insertBottle(req.app.get('db'), req.body)
            .then(bottle => {
                res
                    .status(201)
                    .json(bottle)
            });
        
    })

bottleRouter
    .route("/:bottleId")
    // .all(requireAuth)
    .get((req, res) => {
        BottleService.getById(req.app.get('db'), req.params.bottleId)
            .then(bottle => {
                if(!bottle) {
                    return res.status(400).send('Bottle not found')
                }

                res.json({bottle})
            })
    })

module.exports = bottleRouter