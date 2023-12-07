const jokeArea = document.querySelector("#joke-area");
const jokeButton = document.querySelector("#joke-button");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit";

jokeButton.addEventListener("click", (e) => {
  jokeArea.classList.add("loading");
  loadingTimeout();
  generateJokes();
});

async function generateJokes() {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch jokes');
      }
      const data = await res.json();
      jokeArea.innerText = "";
      let joke = "";
      if (data.joke == undefined) {
        joke = `${data.setup} ${data.delivery}`;
      } else {
        joke = data.joke;
      }
      jokeArea.innerText = joke;
    } catch (error) {
      console.error(error);
      jokeArea.innerText = "Failed to fetch jokes. Please try again later.";
    }
  }

function loadingTimeout() {
  setTimeout(() => {
    jokeArea.classList.remove("loading");
    jokeArea.style.color = "black";
  }, 3000);
}
