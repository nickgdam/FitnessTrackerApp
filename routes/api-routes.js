const db = require("../models");
const router = require("express").Router();

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(data => {
                data.forEach(workout => {
                    let total = 0;
                    workout.exercises.forEach(e => {
                        total += e.duration;
                    });
                    workout.totalDuration = total;
                });
                res.json(data);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(data => {
            console.log(data, "ALL DATA");
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create({})
            .then(data => {
                res.json(data);
                console.log(data, "Added Workout")
            }).catch(err => {
                res.status(400).json(err)
            });
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(
            params.id, 
            {
                $inc: {totalDuration: body.duration },
                $push: { exercises: body }
            },
            {
                new: true
            }).then(data => {
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
    });

}
