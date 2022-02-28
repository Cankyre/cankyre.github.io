fetch("https://central-api.thatcookie.repl.co").catch(() => {
  document.getElementById("api-outage-message").style.display = "block";
});
