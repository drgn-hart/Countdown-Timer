document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('startButton');
    link.addEventListener('click', startTimer);
})

function startTimer() {
    var timerValue = document.getElementById("clock").value;

    //timerValue will be hh:mm format 
    var hours = Number(timerValue.split(':')[0]);
    var minutes = Number(timerValue.split(':')[1]);
    var seconds = 0;

    setTimeout(updateTimer, 1000, hours, minutes, seconds);
}

function updateTimer(hours, minutes, seconds) {
    console.log(hours + ":" + minutes + ":" + seconds);
    var updatedSeconds = updateSeconds(seconds);
    var updatedMinutes = updateMinutes(minutes, seconds < updatedSeconds);
    var updatedHours = updateHours(hours, minutes < updatedMinutes);

    //console.log(updatedHours + ":" + updatedMinutes + ":" + updatedSeconds);
    if(updatedSeconds !== 0 || updatedMinutes !== 0 || updatedHours !== 0)
        setTimeout(updateTimer, 1000, updatedHours, updatedMinutes, updatedSeconds);
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