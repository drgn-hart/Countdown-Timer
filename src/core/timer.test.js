const chrome = require("sinon-chrome");
window.chrome = chrome;
const timer = require("./timer");


test("updates 1 second to 0", () => {
  expect(timer.updateSeconds(1)).toBe(0);
});
