let currentType = "random";
let jokeHistory = [];

async function fetchJoke(type = "random") {
  const res = await fetch(`/api/joke/${type}`);
  const joke = await res.json();
  displayJoke(joke);
}

async function fetchJokeTypes() {
  const res = await fetch("/api/joketypes");
  const types = await res.json();
  const container = document.getElementById("joke-types");
  container.innerHTML = "";
  types.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "type-btn";
    btn.dataset.type = t;
    btn.innerText = t;
    btn.onclick = () => {
      document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = t;
      fetchJoke(t);
      updateStatus();
    };
    container.appendChild(btn);
  });
}

function displayJoke(joke) {
  document.getElementById("setup").innerText = joke.setup;
  document.getElementById("punchline").innerText = joke.punchline;
  document.getElementById("joke-type").innerText = joke.type;
  jokeHistory.unshift(joke);
  updateHistory();
  updateStatus();
}

function updateHistory() {
  const container = document.getElementById("history");
  container.innerHTML = "";
  jokeHistory.slice(0, 5).forEach(j => {
    const div = document.createElement("div");
    div.innerText = j.setup.slice(0, 30) + "...";
    div.style.fontSize = "0.8rem";
    div.onclick = () => displayJoke(j);
    container.appendChild(div);
  });
}

function updateStatus() {
  document.getElementById("total-jokes").innerText = `📊 Total Jokes: ${jokeHistory.length}`;
  document.getElementById("current-type").innerText = `🎭 Current Type: ${currentType}`;
}

document.getElementById("new-joke").onclick = () => fetchJoke(currentType);

fetchJoke();
fetchJokeTypes();
