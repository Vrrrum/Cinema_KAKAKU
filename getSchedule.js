const Schedule = require("./models/Schedule");
const Movies = require("./models/Movies");

const getSchedule = async (city, date) => {
  try {
    const scheduleDate = new Date(date);
    const day = scheduleDate.getDay();
    const schedule = await Schedule.findOne({
      city: city,
      dayOfWeek: day,
    })
      .populate("movies.movieId")
      .exec();
    return schedule;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getSchedule;
