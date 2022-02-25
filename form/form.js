const submitBtn = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");
const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");

function checkRadio(l) {
  for (let i = 0; i < l.children.length; i++) {
    if (l.children[i].children[0].checked) {
      return l.children[i].innerText;
    }
  }
  return 0;
}

document.getElementById("home").addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.href = "https://cankyre.github.io";
});

submitBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();
  q1r = document.getElementById("q1").value;
  q2r = checkRadio(q2);
  document.getElementById("q1-outer").style.borderColor =
    q1.value.length > 0 ? "rgb(239;239,239)" : "red";
  document.getElementById("q2-outer").style.borderColor = q2r
    ? "rgb(239;239,239)"
    : "red";
  document.getElementById("q3-outer").style.borderColor =
    q3.value.length > 0 ? "rgb(239;239,239)" : "red";

  if (q1r && q2r && q3.value.length > 0) {
    const lastTicket = localStorage.getItem("cankyre_report_form");
    if (lastTicket && parseInt(lastTicket) + 300000 > Date.now()) {
      document.getElementById("q1-outer").style.borderColor = "red";
      document.getElementById("q2-outer").style.borderColor = "red";
      document.getElementById("q3-outer").style.borderColor = "red";
      return;
    }
    const res = await fetch(
      `https://central-api.thatcookie.repl.co/tickets?q1=${encodeURIComponent(
        q1r
      )}&q2=${encodeURIComponent(q2r)}&q3=${encodeURIComponent(q3.value)}`,
      {
        method: "POST",
      }
    );
    const text = await res.text();
    console.log(text);
    localStorage.setItem("cankyre_report_form", Date.now().toString());
    if (text == "OK-") {
      localStorage.setItem("cankyre_report_form", 0);
    }
    if (text.startsWith("OK")) {
      document.getElementById("q1-outer").style.borderColor = "#90EE90";
      document.getElementById("q2-outer").style.borderColor = "#90EE90";
      document.getElementById("q3-outer").style.borderColor = "#90EE90";
    } else if (text == "500") {
      document.getElementById("q1-outer").style.borderColor = "red";
      document.getElementById("q2-outer").style.borderColor = "red";
      document.getElementById("q3-outer").style.borderColor = "red";
    } else {
      document.getElementById("q1-outer").style.borderColor = "yellow";
      document.getElementById("q2-outer").style.borderColor = "yellow";
      document.getElementById("q3-outer").style.borderColor = "yellow";
    }
  }
});
