const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    test("throws an error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function() { new Message();}).toThrow(new Error("Name is required"));
    });

    test("constructor sets name", function() {
       
         let message = new Message("Cy"); 
    
        expect(message).toBeInstanceOf(Message);
        expect(message.name).toEqual("Cy");
    });

    test("contains a command array passed into the constructor as the 2nd argument", function() {
        let command1 = new Command("Say hello", 2);
        let command2 = new Command("Say goodbye", 1); 
        let commands = [command1, command2];
        let message = new Message("Manners", commands);

        expect(message).toBeInstanceOf(Message);
        expect(message.commands).toEqual([command1, command2]);
    })

});
