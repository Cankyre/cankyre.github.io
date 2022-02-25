async function getStatuses() {
  return await (
    await fetch("https://central-api.thatcookie.repl.co/status/get")
  ).json();
}

getStatuses().then(createChart);

function createChart(datasets) {
  let obj1 = [];
  for (i in datasets) {
    obj1.push({
      x: Date.parse(datasets[i].created_at),
      y: !["Offline", "Major outage"].includes(
        JSON.parse(datasets[i].status).pbot
          ? JSON.parse(datasets[i].status).pbot[1]
          : 0
      )
        ? JSON.parse(datasets[i].status).pbot
          ? JSON.parse(datasets[i].status).pbot[1]
          : 0
        : 0,
    });
  }
  let obj2 = [];
  for (i in datasets) {
    obj2.push({
      x: Date.parse(datasets[i].created_at),
      y: !["Offline", "Major outage"].includes(
        JSON.parse(datasets[i].status)["pbot-api"]
          ? JSON.parse(datasets[i].status)["pbot-api"][1]
          : 0
      )
        ? JSON.parse(datasets[i].status)["pbot-api"]
          ? JSON.parse(datasets[i].status)["pbot-api"][1]
          : 0
        : 0,
    });
  }
  const data = {
    labels: obj1.map(
      (i) =>
        new Date(i.x).getHours() +
        "h" +
        (new Date(i.x).getMinutes().toString().length > 1
          ? new Date(i.x).getMinutes()
          : "0" + new Date(i.x).getMinutes())
    ),
    datasets: [
      {
        label: "ParpaingBot",
        backgroundColor: "#f14668",
        borderColor: "#f14668",
        data: obj1,
      },
      {
        label: "ParpaingBot API",
        backgroundColor: "#3e8ed0",
        borderColor: "#3e8ed0",
        data: obj2,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
  };
  new Chart(document.getElementById("chart"), config);
}
