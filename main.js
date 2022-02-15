const input = document.getElementById("goto-input");

input.addEventListener("keyup", async (ev) => {
  if (ev.key == "Enter" && input.value) {
    const textjson = await (
      await fetch(
        "https://parpaing-bot.thatcookie.repl.co/goto"
      )
    ).json();
    if (textjson[input.value]) {
      window.location.href = textjson[input.value];
    }
  }
});
