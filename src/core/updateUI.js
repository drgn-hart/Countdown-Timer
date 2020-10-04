let timerDiv = document.getElementById("countdownTimer");

// Create timer on the page if it is not present
// Update the timer if it is already present
if (timerDiv === null) {
  timerDiv = document.createElement("div");
  timerDiv.id = "countdownTimer";
  timerDiv.innerText = currentTime;
  timerDiv.style.backgroundColor = color;
  document.body.appendChild(timerDiv);
} else {
  timerDiv.innerText = currentTime;
  timerDiv.style.backgroundColor = color;
}
