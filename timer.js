document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('startButton');
    link.addEventListener('click', startTimer);
    document.getElementById('stopButton').addEventListener('click', stopTimer);
});

function startTimer() {
    var timerValue = document.getElementById("clock").value;
    chrome.runtime.sendMessage({action: "start", value: timerValue});
}

function stopTimer() {
    chrome.runtime.sendMessage({action: "stop"});
}