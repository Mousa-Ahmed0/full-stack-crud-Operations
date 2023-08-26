const TaskModel = require("../models/task.model");
module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);
}

module.exports.saveTasks = (req, res) => {
    const { task } = req.body;
    TaskModel.create({ task })
        .then((date) => {
            console.log('Saved Successfullt....');
            res.status(201).send(date);
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        })
}

module.exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TaskModel.findByIdAndUpdate(id, { task })
        .then(() => {
            res.statussend("Updateed Successfullt....");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        })
}


module.exports.deleteTask = (req, res) => {
    const { id } = req.params;
    TaskModel.findByIdAndDelete(id)
        .then(() => {
            res.send("Deleted Successfullt....");
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        })
}