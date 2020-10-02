document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('startButton');
    link.addEventListener('click', startTimer);
    document.getElementById('stopButton').addEventListener('click', stopTimer);
});

function startTimer() {
    var timerValue = document.getElementById("clock").value;

    var hours = Number(timerValue.split(':')[0]);
    var minutes = Number(timerValue.split(':')[1]);

    if(isNaN(hours) || isNaN(minutes))
        chrome.runtime.sendMessage({action: "error"});
    else
        chrome.runtime.sendMessage({action: "start", hours: hours, minutes: minutes});
}

function stopTimer() {
    chrome.runtime.sendMessage({action: "stop"});
}