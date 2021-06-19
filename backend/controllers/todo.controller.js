const db = require("../models");
const Todo = db.todos;

exports.create = (req, res) => {
  // return res.send(req.body);
  console.log(req.body);
  if (!req.body.name) {
    res
      .status(404)
      .send({ success: "false", message: "Name cannot be empty", data: [] });
    return;
  }

  const todo = new Todo({
    name: req.body.name,
    completed: req.body.completed ? req.body.completed : false,
  });

  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something occurred while processing your request",
      });
    });
};

// Retrieve all todos from the database.
exports.findAll = (req, res) => {
  Todo.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something occurred while processing your request",
      });
    });
};

// Find a single Tutorial with an id
exports.find = (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something occurred while processing your request",
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Data to update cannot be empty!" });
  }
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, {useFindAndModify: true})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something occurred while processing your request",
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something occurred while processing your request",
      });
    });
};

// Delete all todos from the database.
exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all todos.",
      });
    });
};

// Find all published todos
exports.findAllCompleted = (req, res) => {
  Todo.find({ completed: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};
