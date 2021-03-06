document.addEventListener("DOMContentLoaded", function() {
  const link = document.getElementById("startButton");
  link.addEventListener("click", startTimer);
  document.getElementById("stopButton").addEventListener("click", stopTimer);
  document.getElementById("pauseButton").addEventListener("click", pauseTimer);
  document.getElementById("resumeButton").addEventListener("click", resumeTimer);
});

/**
 * Function to start timer on screen
 */
function startTimer() {
  const timerValue = document.getElementById("clock").value;

  const hours = Number(timerValue.split(":")[0]);
  const minutes = Number(timerValue.split(":")[1]);

  if (isNaN(hours) || isNaN(minutes)) {
    chrome.runtime.sendMessage({action: "error"});
  } else {
    chrome.runtime.sendMessage(
        {action: "start", hours: hours, minutes: minutes});
  }
}

/**
 * Function to stop timer on screen
*/
function stopTimer() {
  chrome.runtime.sendMessage({action: "stop"});
}

/**
 * Function to pause timer on screen
*/
function pauseTimer(){
  chrome.runtime.sendMessage({action: "pause"});
}

/**
 * Function to resume timer on screen
*/
function resumeTimer(){
  chrome.runtime.sendMessage({action: "resume"});
}