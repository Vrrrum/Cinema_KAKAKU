$(function () {
  $.post("/getSession", (data) => {
    const username = data;
    console.log(username);
    if (typeof username == "string")
      $(".login").html(`${username}, <a href="/logout" >wyloguj</a>`);
    else
      $(".login").html(`<a
    href="/login"
  >LOGIN</a`);
  });
});
