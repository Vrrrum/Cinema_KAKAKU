const datePicker = $("#datePicker");
const cinema = $("#cinema");
const container = $("#schedule-container");
let date = datePicker.val();
let city = cinema.val();

const getMovies = async () => {
  try {
    date = datePicker.val();
    city = cinema.val();
    let schedule = {};
    await $.get(
      `/schedule`,
      { date: date, city: city },
      function (data, status) {
        schedule = data;
      }
    );

    return schedule.schedule;
  } catch (e) {
    console.log(e);
  }
};

const movieComponent = (schedule) => {
  console.log(schedule);
  if (schedule == null) {
    const component = "";
    return component;
  }

  const component = schedule.movies.map((val) => {
    return `
    <section class="row pb-5">
        <div class="col-2 poster">
          <a href="#">
            <img class="w-100" src="img/posters/${
              val.movieId.imgSrc
            }" alt="Plakat" />
          </a>
        </div>
        <div class="col info">
          <h3>${val.movieId.title}</h3>
          <p>${val.movieId.description}</p>
        </div>
        <div class="col schedule">
        ${val.time
          .map((timeVal) => {
            return `<div class="border rounded text-center mb-3">${timeVal}</div>`;
          })
          .join("")}
          <form action="/buy-ticket?movie=${
            val.movieId._id
          }&date=${date}&city=${city}"><button type="submit" class="btn buy-ticket">KUP BILET</button></form>
        </div>
      </section>
    `;
  });
  return component;
};

datePicker.on("change", () => {
  getMovies().then((res) => {
    container.html(movieComponent(res));
  });
});
cinema.on("change", () => {
  getMovies().then((res) => {
    container.html(movieComponent(res));
  });
});

getMovies().then((res) => {
  container.html(movieComponent(res));
});
