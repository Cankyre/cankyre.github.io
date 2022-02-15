const input = document.getElementById("goto-input");

input.addEventListener("keyup", async (ev) => {
  if (ev.key == "Enter" && input.value) {
    const text = await (
      await fetch(
        "https://thingproxy.freeboard.io/fetch/https://rentry.co/cankyre_goto/raw"
      )
    ).text();
    let textjson = {};
    for (let i in text.split(";")) {
      textjson[text.split(";")[i].split(":")[0]] = text
        .split(";")
        [i].split(":")[1];
    }
    if (textjson[input.value]) {
      window.location.href = "https://" + textjson[input.value];
    }
  }
});
