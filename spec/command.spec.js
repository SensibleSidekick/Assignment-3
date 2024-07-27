const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  test("constructor sets command type", function() {
    let move = new Command("MOVE");

    expect(move.commandType).toEqual("MOVE");
  });

  test("constructor sets a value passed in as the 2nd argument", function() {
    let move = new Command("MOVE", 120000);

    expect(move.value).toEqual(120000)
  });

});