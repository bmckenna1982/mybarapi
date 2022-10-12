const express = require("express");

const path = require("path");
const InventoryService = require("./inventory-service");
// const { requireAuth } = require("../middleware/jwt-auth");

const inventoryRouter = express.Router();
const bodyParser = express.json();

// inventoryRouter
    // .route("/")
    // .get((req, res) => {
    //     InventoryService.getAllBottles(req.app.get('db'))
    //         .then(bottles => {
    //             res.json({success: true, bottles: bottles});
    //         });
    // })
    // .post(bodyParser, (req, res) => {
    //     //category is sent as number from drop down list selection
    //     const { upc } = req.body;

    //     if( !upc ) {
    //         return res.status(400).send('Each bottle must include a UPC identification')
    //     }

    //     InventoryService.insertBottle(req.app.get('db'), req.body)
    //         .then(bottle => {
    //             res
    //                 .status(201)
    //                 .json(bottle)
    //         });
        
    // })

inventoryRouter
    .route("/:userId")
    // .all(requireAuth)
    .get((req, res) => {        
        InventoryService.getById(req.app.get('db'), req.params.userId)
            .then(inventory => {
                if(!inventory) {
                    return res.status(400).send('No user inventory found')
                }

                res.json({inventory})
            })
    })

module.exports = inventoryRouter