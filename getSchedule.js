const Schedule = require("./models/Schedule");

const getSchedule = async (city, date) => {
  try {
    const day = new Date(date).getDay;
    const schedule = await Schedule.find({ city: city, dayOfWeek: day });
    return schedule;
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = getSchedule;
