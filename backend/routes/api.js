const express = require("express");
const router = express.Router();

//const User = require("../models/user.model.js");
const Task = require("../models/task.model.js");
const ToDoLists = require("../models/todolists.model.js");
const Archive = require("../models/archive.model.js");

const { listEvents, key } = require("../google");
const hardcodedUser = "adam"; //To be changed if added more users

//ROUTES

// get all tasks by todolist title
router.get("/tasks/:title", (req, res) => {
  Task.find({ todolist: req.params.title })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

// get todo listnames of user *adam
router.get("/lists", async (req, res) => {
  ToDoLists.findOne({ username: hardcodedUser })
    .then((data) => {
      res.json(data.lists);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

//ADD TASK
router.post("/addtask", (req, res) => {
  const data = {
    username: hardcodedUser,
    todolist: req.body.todolist,
    text: req.body.text,
    done: false,
  };
  const newTask = new Task(data);
  newTask.save((error) => {
    if (error) {
      console.log("error saving new task: ", error);
    } else {
      console.log(`task: ${data.text} was added`);
      res.send(newTask.id);
    }
  });
});

//UPDATE TASK
router.put("/updatetask/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const { text, done } = req.body;
    task.text = text;
    task.done = done;
    task.save((error) => {
      if (error) {
        console.log("error saving new task: ", error);
      } else {
        console.log(`task: ${task.text} was updated`);
      }
    });
  } catch (err) {
    console.log("error finding task: ", err);
  }
});

//Update to do lists of a user - remove or add
router.put("/updatelists/:username", async (req, res) => {
  try {
    const userLists = await ToDoLists.findOne({
      username: req.params.username,
    });
    const { title } = req.body;
    if (userLists.lists.includes(title)) {
      // remove request
      userLists.lists = userLists.lists.filter(
        (listName) => listName !== title
      );
    } else {
      // add new list request
      userLists.lists.push(title);
    }
    userLists.save((error) => {
      if (error) {
        console.log("error updating lists: ", error);
      } else {
        console.log(`updated todolists: ${userLists.lists}`);
      }
    });
  } catch (err) {
    console.log("error finding user ! ", err);
  }
});

router.put("/archive", async (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    //data isn't empty (find {} will archive all)
    try {
      const tasks = await Task.find(req.body);
      tasks.forEach((task) => {
        let { username, todolist, text, done } = task;
        const archivedTask = new Archive({ username, todolist, text, done });
        archivedTask.save((error) => {
          if (error) {
            console.log("error saving archived task: ", error);
          } else {
            //SUCCESS
            Task.deleteOne({ _id: task._id }, function (err) {
              if (err) console.log(err);
              console.log(`task ${task.text} deleted successfuly`);
            });
            console.log(`task: ${text} was archived`);
          }
        });
      });
    } catch (err) {
      console.log("error archiving tasks ! ", err);
    }
  } else {
    res.send("Empty query params passed");
  }
});

//GOOGLE CALENDAR DATA
router.get("/events/:calId", (req, res) => {
  listEvents(req.params.calId, (events) => res.json(events));
});

//GOOGLE API KEY
router.get("/gapi_key", (req, res) => {
  res.send(key);
});

module.exports = router;

// router.get("/users", (req, res) => {
//   User.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// });

// router.get("/todolists", (req, res) => {
//   ToDoLists.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// });
//

// router.get("/tasks", (req, res) => {
//   Task.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       console.log("error: ", error);
//     });
// });

// router.put("/archive/:id", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     let { username, todolist, text, done } = task;
//     const archivedTask = new Archive({ username, todolist, text, done });
//     archivedTask.save((error) => {
//       if (error) {
//         console.log("error saving archived task: ", error);
//       } else {
//         //SUCCESS
//         Task.deleteOne({ _id: task._id }, function (err) {
//           if (err) console.log(err);
//           console.log("deleted successfuly");
//         });
//         console.log(`task: ${text} was archived`);
//       }
//     });
//   } catch (err) {
//     console.log("error archiving task ! ", err);
//   }
// });

//Delete a to do lists
// router.put("/deletelist/:user", async (req, res) => {
//   try {
//     const userLists = await ToDoLists.findOne({ username: req.params.user });
//     const { title } = req.body;
//     userLists.lists = userLists.lists.filter((listName) => listName !== title);
//     userLists.save((error) => {
//       if (error) {
//         console.log("error removing list: ", error);
//       } else {
//         console.log(`list ${title} removed`);
//       }
//     });
//   } catch (err) {
//     console.log("error finding user ! ", err);
//   }
// });
