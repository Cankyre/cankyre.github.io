const input = document.getElementById("goto-input");

input.addEventListener("keyup", async (ev) => {
  if (ev.key == "Enter" && input.value) {
    const textjson = await (
      await fetch(
        "https://central-api.thatcookie.repl.co/goto/" + encodeURI(input.value)
      )
    ).json();
    console.log(textjson);
    if (textjson[0]["url"]) {
      window.location.href = textjson[0]["url"];
    }
  }
});
