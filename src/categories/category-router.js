const express = require("express");
const CategoryService = require("./category-service");
const path = require("path");
// const { requireAuth } = require("../middleware/jwt-auth");

const categoryRouter = express.Router();
const bodyParser = express.json();

categoryRouter
    .route("/")
    .get((req, res) => {
        CategoryService.getAll(req.app.get('db'))
            .then(categories => {
                res.json({success: true, categories: categories});
            });
    })
    .post(bodyParser, (req, res) => {
        //category is sent as number from drop down list selection
        const { category } = req.body;

        if( !category ) {
            return res.status(400).send('Must have a category name to add a category')
        }

        CategoryService.insertCategory(req.app.get('db'), req.body)
            .then(bottle => {
                res
                    .status(201)
                    .json(bottle)
            });
        
    })

categoryRouter
    .route("/:categoryId")
    // .all(requireAuth)
    .get((req, res) => {
        CategoryService.getById(req.app.get('db'), req.params.categoryId)
            .then(category => {
                if(!category) {
                    return res.status(400).send('category not found')
                }

                res.json({category})
            })
    })

module.exports = categoryRouter