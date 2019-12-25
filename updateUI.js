var timerDiv = document.getElementById("challengeTimer");
if(timerDiv === null) {
    timerDiv = document.createElement("div");
    timerDiv.id = "challengeTimer";
    timerDiv.innerText = currentTime;
    timerDiv.style.zIndex = 2147483638;     //max val so that it stays on top of all web pages
    timerDiv.style.top = "0px";
    timerDiv.style.left = "0px";
    timerDiv.style.width = window.innerWidth;
    timerDiv.style.position = 'absolute';
    document.body.appendChild(timerDiv);
} else {
    timerDiv.innerText = currentTime;
}