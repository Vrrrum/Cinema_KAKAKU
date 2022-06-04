const datePicker = $("#datePicker");
const cinema = $("#cinema");

const getMovies = () => {
  const date = datePicker.val();
  const city = cinema.val();

  $.get(`/schedule?date=${date}&city=${city}`, function (data, ststus) {
    alert("Data: " + data.schedule);
    console.log("Dane pobrane: ", data);
  });
};

datePicker.on("change", () => {
  getMovies();
});
cinema.on("change", () => {
  getMovies();
});
