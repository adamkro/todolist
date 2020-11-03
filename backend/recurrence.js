const schedule = require("node-schedule");

// let probsRec = schedule.scheduleJob(
//   { hour: 13, minute: 2, dayOfWeek: 2 },
//   function () {
//     console.log("watch");
//   }
// );
console.log("run");

var j = schedule.scheduleJob("6 13 * * 2 ", function () {
  console.log("The answer to life, the universe, and everything!");
});
