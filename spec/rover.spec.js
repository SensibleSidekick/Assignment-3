const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  test("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(983049);

    expect(rover).toBeInstanceOf(Rover);
    expect(rover.position).toEqual(983049);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  test("response returned by receiveMessage contains the name of the message", function() {
    let command1 = new Command("MOVE", 12345);
    let command2 = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Hello", [command1, command2]);
    let rover = new Rover(802096);
    response = rover.receiveMessage(message);

    expect(response.message).toEqual("Hello");
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let command1 = new Command("MOVE", 12345);
    let command2 = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Hello", [command1, command2]);
    let rover = new Rover(802096);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true}, {completed: true}]);

  });

  test("responds correctly to the status check command", function() {
    let statusCommand = new Command("STATUS_CHECK");
    let message = new Message("Status Check", [statusCommand]);
    let rover = new Rover(802096);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true, roverStatus: {mode:'NORMAL', generatorWatts: 110, position: 802096}}]);
  })

  test("responds correctly to the mode change command", function() {
    let modeCommand = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("Mode Change", [modeCommand]);
    let rover = new Rover(802096);
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: true}]);
    expect(rover.mode).toEqual("LOW_POWER");
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let moveCommand = new Command("MOVE", 12201990);
    let message = new Message("Move please", [moveCommand]);
    let rover = new Rover(802096);
    rover.mode = "LOW_POWER";
    let response = rover.receiveMessage(message);

    expect(response.results).toEqual([{completed: false}]);
    expect(rover.position).toEqual(802096);
  })

  test("responds with the position for the move command", function() {
  let moveCommand = new Command("MOVE", 12201990);
  let message = new Message("Move please", [moveCommand]);
  let rover = new Rover(802096);
  let response = rover.receiveMessage(message);

  expect(response.results).toEqual([{completed: true}]);
  expect(rover.position).toEqual(12201990);
})
});
