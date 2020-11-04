import axios from "axios";
const hardcodedUser = "adam";

// auto-add lectures task 9am
const lessons = require("./lessons_data");
const schedule = require("node-schedule");
console.log(lessons);
lessons.forEach((lesson) => {
  schedule.scheduleJob(`0 9 * * ${lesson.day} `, () =>
    addTaskDB(lesson.name, "Uni Lectures")
  );
});

async function getTasksByTDL(title) {
  const { data } = await axios.get(`http://localhost:5000/tasks/${title}`);
  return data
    .map(({ _id, text, done }) => ({
      id: _id,
      text,
      done,
    }))
    .reverse();
}

async function getListsTitles() {
  const { data } = await axios.get(`http://localhost:5000/lists`);
  return data;
}

// Ido: all comments are unnecessary

// archive done tasks created more than 30 days ago
function archiveOldDoneTasks() {
  const oldDate = new Date().setDate(new Date().getDate() - 30); // 30 days ago
  axios
    .put(`http://localhost:5000/archive`, {
      done: true,
      createdAt: { $lt: oldDate },
    })
    .then(() => {
      console.log("Auto-archive request sent");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

// returns a list of todolists
export async function getFilteredLists() {
  archiveOldDoneTasks();
  const titles = await getListsTitles();
  const FilteredLists = Promise.all(
    titles.map(async (title) => ({
      title,
      tasks: await getTasksByTDL(title),
    }))
  );
  return FilteredLists;
}

// ADD NEW TASK
export async function addTaskDB(text, todolist) {
  try {
    const id = await axios.post("http://localhost:5000/addtask", {
      text,
      todolist,
    });
    return id.data;
  } catch {
    console.log("error getting id from db");
  }
}

// UPDATE TASK
export function updateTaskDb(id, text, done) {
  axios
    .put(`http://localhost:5000/updatetask/${id}`, { text, done })
    .then(() => {
      console.log("Data sent to server");
    })
    .catch((err) => {
      console.log("Error updating task: ", err);
    });
}

// add a new title to todolists doc of a user
export function addToDoListDB(title) {
  if (title !== "") {
    axios
      .put(`http://localhost:5000/updatelists/${hardcodedUser}`, { title })
      .then(() => {
        console.log("Data sent to server");
      })
      .catch(() => {
        console.log("Error sending new list to server");
      });
  }
}

// move all tasks with listname to archive collection
function archiveTasksByListName(listName) {
  axios
    .put(`http://localhost:5000/archive`, { todolist: listName })
    .then(() => {
      console.log("Archive request sent");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

// remove title from user's todolists
export function DeleteListDB(title) {
  axios
    .put(`http://localhost:5000/updatelists/${hardcodedUser}`, { title })
    .then(() => {
      console.log("Data sent to server");
    })
    .catch(() => {
      console.log("Error sending delete request to server");
    });
  archiveTasksByListName(title);
}

//
// export function archiveTask(id) {
//   axios
//     .put(`http://localhost:5000/archive/${id}`)
//     .then(() => {
//       console.log("archive request sent for id: ", id);
//     })
//     .catch((err) => {
//       console.log("Error updating task: ", err);
//     });
// }

// export async function getTasks() {
//   const { data } = await axios.get("http://localhost:5000/tasks");
//   return data.map(({ _id, text, done }) => ({
//     id: _id,
//     text,
//     done,
//   }));
// }
