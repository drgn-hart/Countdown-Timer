var timerDiv = document.getElementById("countdownTimer");
if(timerDiv === null) {
    timerDiv = document.createElement("div");
    timerDiv.id = "countdownTimer";
    timerDiv.innerText = currentTime;    
    timerDiv.style.backgroundColor = color;
    document.body.appendChild(timerDiv);
} else {
    timerDiv.innerText = currentTime;
    timerDiv.style.backgroundColor = color;
}