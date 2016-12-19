var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://phipa2:1234qwer@ds133158.mlab.com:33158/mern', ['events']);

// Get All Tasks
router.get('/events', function(req, res, next){
    db.events.find(function(err, events){
        if(err){
            res.send(err);
        }
        res.json(events);
    });
});
//
// Get Single Task
router.get('/event/:id', function(req, res, next){
    db.events.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, event){
        if(err){
            res.send(err);
        }
        res.json(event);
    });
});

//Save Task
router.post('/event', function(req, res, next){
    console.log(req)
    var event = req.body;
    if(!event.title){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.events.save(event, function(err, event){
            if(err){
                res.send(err);
            }
            res.json(event);
        });
    }
});

// Delete Task
router.delete('/event/:id', function(req, res, next){
    db.events.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// // Update Task
router.put('/event/:id', function(req, res, next){
    var event = req.body;
    var updEvent = {};

    if(event.isDone){
        updEvent.isDone = event.isDone;
    }

    if(event.title){
        updEvent.title = event.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updEvent, {}, function(err, event){
        if(err){
            res.send(err);
        }
        res.json(event);
    });
    }
});

module.exports = router;
