var timerHandler;

chrome.runtime.onMessage.addListener(
    function(request) {
        if(request.action == "error")
            alert("Please set correct integer values for the timer");
        if(request.action == "start")
            startTimer(request.hours, request.minutes, 0);
        if(request.action == "stop")
            stopTimer();        
    }
);

function startTimer(hours, minutes, seconds) {
    if(timerHandler === undefined) {
        timerHandler = setTimeout(updateTimer, 1000, hours, minutes, seconds);
    }
}

function stopTimer() {
    //Clear the timeout calls and timer from UI
    if(timerHandler !== undefined) {
        clearTimeout(timerHandler);
        clearTimer();
    }
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
    
    //Stop updating the timer if it reaches 00:00:00
    if(hours == 0 && minutes == 0 && seconds == 0) {
        setTimeout(clearTimer, 1000);
        return;
    }
    
    var updatedSeconds = updateSeconds(seconds);
    var updatedMinutes = updateMinutes(minutes, seconds < updatedSeconds);
    var updatedHours = updateHours(hours, minutes < updatedMinutes);

    timerHandler = setTimeout(updateTimer, 1000, updatedHours, updatedMinutes, updatedSeconds);
}

function clearTimer() {
    timerHandler = undefined;
    chrome.tabs.executeScript({
        file: 'clearUI.js'
    });
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