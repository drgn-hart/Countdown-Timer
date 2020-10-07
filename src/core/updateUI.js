// Create timer on the page if it is not present
// Update the timer if it is already present
if (document.getElementById("countdownTimer") === null) {
  const timerDiv = document.createElement("div");
  timerDiv.id = "countdownTimer";
  timerDiv.innerText = currentTime;
  timerDiv.style.backgroundColor = color;
  if (color == "yellow"){
    timerDiv.style.color = "black";
  }
  document.body.appendChild(timerDiv);
} else {
  document.getElementById("countdownTimer").innerText = currentTime;
  document.getElementById("countdownTimer").style.backgroundColor = color;
  if (color == "yellow"){
    document.getElementById("countdownTimer").style.color = "black";
  }
  
}
