let timerHandler;

chrome.runtime.onMessage.addListener(
    function(request) {
      if (request.action == "error") {
        alert("Please set correct integer values for the timer");
      }
      if (request.action == "start") {
        startTimer(request.hours, request.minutes, 0);
      }
      if (request.action == "stop") {
        stopTimer();
      }
    },
);

/**
 * Starts timer for the given time in the clock
 * Time is mentioned in hours,minutes and seconds
 * @param {Number} hours - hours for which timer should run
 * @param {Number} minutes - minutes for which timer should run
 * @param {Number} seconds - seconds for which timer should run
*/
function startTimer(hours, minutes, seconds) {
  chrome.tabs.insertCSS({
    file: "core/timer.css",
  });
  if (timerHandler === undefined) {
    timerHandler = setTimeout(updateTimer, 1000, hours, minutes, seconds);
  }
}

/**
 * Stop the timer
 * This clears the timerHandler so that timer can be reset
 */
function stopTimer() {
  // Clear the timeout calls and timer from UI
  if (timerHandler !== undefined) {
    clearTimeout(timerHandler);
    clearTimer();
  }
}

/**
 * Update the display timer each second
 * Timer is displayed in the format hh:mm:ss
 * @param {Number} hours - hours to be displayed
 * @param {Number} minutes - minutes to be displayed
 * @param {Number} seconds - seconds to be displayed
 */
function updateTimer(hours, minutes, seconds) {
  let displayHours = hours.toString();
  let displayMinutes = minutes.toString();
  let displaySeconds = seconds.toString();

  if (displayHours.length < 2) {
    displayHours = "0" + displayHours;
  }
  if (displayMinutes.length < 2) {
    displayMinutes = "0" + displayMinutes;
  }
  if (displaySeconds.length < 2) {
    displaySeconds = "0" + displaySeconds;
  }

  const time = displayHours + ":" + displayMinutes + ":" + displaySeconds;

  const color = getColor(hours, minutes);

  chrome.tabs.executeScript(
      {code: "var currentTime=\"" + time + "\"; var color=\"" + color + "\""},
      function() {
        chrome.tabs.executeScript({
          file: "core/updateUI.js",
        });
      },
  );

  // Stop updating the timer if it reaches 00:00:00
  if (hours == 0 && minutes == 0 && seconds == 0) {
    setTimeout(clearTimer, 1000);
    return;
  }

  const updatedSeconds = updateSeconds(seconds);
  const updatedMinutes = updateMinutes(minutes, seconds < updatedSeconds);
  const updatedHours = updateHours(hours, minutes < updatedMinutes);

  timerHandler = setTimeout(updateTimer, 1000,
      updatedHours, updatedMinutes, updatedSeconds);
}

/**
 * Select the background color for timer based on remaining time
 * @param {Number} hours - remaining hours in timer
 * @param {Number} minutes - remaining minutes in timer
 * @return {string} - background color
 */
function getColor(hours, minutes) {
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes >= 10) {
    return "green";
  } else if (totalMinutes >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

/**
 * Clear the timer from the UI
 */
function clearTimer() {
  timerHandler = undefined;
  chrome.tabs.executeScript({
    file: "core/clearUI.js",
  });
}

/**
 * Calculates the next second to be displayed
 * @param {Number} seconds - seconds to be updated
 * @return {Number} - next second
 */
function updateSeconds(seconds) {
  return seconds == 0 ? 59 : --seconds;
}

/**
 * Calculates the next minute to be displayed
 * Minutes will be updated every 60 seconds
 * @param {Number} minutes - minutes to be updated
 * @param {Boolean} changeMinute - Should minute be updated
 * @return {Number} - next minute
 */
function updateMinutes(minutes, changeMinute) {
  if (changeMinute) {
    --minutes;
  }

  return minutes < 0 ? 59 : minutes;
}

/**
 * Calculates the next hour to be displayed
 * Hours will be updated every 60 minutes
 * @param {Number} hours - hours to be updated
 * @param {Boolean} changeHour - should hour be updated
 * @return {Number} - next hour
 */
function updateHours(hours, changeHour) {
  if (changeHour) {
    --hours;
  }

  return hours;
}
