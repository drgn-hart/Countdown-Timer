var timerHandler;

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('startButton');
    link.addEventListener('click', startTimer);
    document.getElementById('stopButton').addEventListener('click', stopTimer);
})

function stopTimer() {
    if(timerHandler !== undefined)
        clearTimeout(timerHandler);
}

function startTimer() {
    var timerValue = document.getElementById("clock").value;

    //timerValue will be hh:mm format 
    var hours = Number(timerValue.split(':')[0]);
    var minutes = Number(timerValue.split(':')[1]);
    var seconds = 0;

    timerHandler = setTimeout(updateTimer, 1000, hours, minutes, seconds);
}

function updateTimer(hours, minutes, seconds) {    
    var displayHours = hours.toString();
    var displayMinutes = minutes.toString();
    var displaySeconds = seconds.toString();    
    
    if(displayHours.length < 2)
        displayHours = "0" + displayHours;
    if(displayMinutes.length < 2)
        displayMinutes = "0" + displayMinutes;
    if(displaySeconds.length < 2)
        displaySeconds = "0" + displaySeconds;

    var time = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    
    chrome.tabs.executeScript(
        {code: 'var currentTime="' + time + '"'},
        function() {
            chrome.tabs.executeScript({
                file: 'updateUI.js'
            });
        }
    );
    
    var updatedSeconds = updateSeconds(seconds);
    var updatedMinutes = updateMinutes(minutes, seconds < updatedSeconds);
    var updatedHours = updateHours(hours, minutes < updatedMinutes);

    if(updatedSeconds !== 0 || updatedMinutes !== 0 || updatedHours !== 0)
        timerHandler = setTimeout(updateTimer, 1000, updatedHours, updatedMinutes, updatedSeconds);
}

function updateSeconds(seconds) {
    return seconds == 0 ? 59 : --seconds;
}

function updateMinutes(minutes, changeMinute) {
    if(changeMinute)
        --minutes;

    return minutes < 0 ? 59 : minutes;
}

function updateHours(hours, changeHour) {
    if(changeHour)
        --hours;
    
    return hours;
}