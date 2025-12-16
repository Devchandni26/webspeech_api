const aboutSection = document.getElementById("about");
const projectSection = document.getElementById("projects");
const contactSection = document.getElementById("contact");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("start-btn");


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition not supported in your browser.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    statusText.textContent = "Status: Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    statusText.textContent = `Heard: "${transcript}"`;

    if (transcript.includes("about")) {
      showSection("about");
    } else if (transcript.includes("projects")) {
      showSection("projects");
    } else if (transcript.includes("contact")) {
      showSection("contact");
    } else {
      statusText.textContent = "Unrecognized command.";
    }
  };

  recognition.onerror = () => {
    statusText.textContent = "Error or no permission.";
  };

  recognition.onend = () => {
    statusText.textContent += " | Tap 'Start Listening' to try again.";
  };

  startBtn.addEventListener("click", () => {
    recognition.start();
  });
}

function showSection(section) {
  aboutSection.classList.remove("active");
  projectSection.classList.remove("active");
  contactSection.classList.remove("active");

  if (section === "about") aboutSection.classList.add("active");
  if (section === "projects") projectSection.classList.add("active");
  if (section === "contact") contactSection.classList.add("active");
}
