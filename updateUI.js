var timerDiv = document.getElementById("countdownTimer");
if(timerDiv === null) {
    timerDiv = document.createElement("div");
    timerDiv.id = "countdownTimer";
    timerDiv.innerText = currentTime;
    timerDiv.style.zIndex = 2147483638;     //max val so that it stays on top of all web pages
    timerDiv.style.top = "0px";
    timerDiv.style.width = "100%";
    timerDiv.style.position = 'fixed';
    timerDiv.style.backgroundColor = color;
    timerDiv.style.height = "40px";
    timerDiv.style.textAlign = "center";
    timerDiv.style.fontSize = "x-large";
    document.body.appendChild(timerDiv);
} else {
    timerDiv.innerText = currentTime;
    timerDiv.style.backgroundColor = color;
}