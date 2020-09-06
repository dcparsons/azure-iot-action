//Basis for the IOT Hub code taken from: https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-c2d 
//GitHub Actions boilerplate taken from: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action 
'use strict';

var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;

const core = require('@actions/core');
const github = require('@actions/github');

var connectionString = core.getInput('iot-hub-connection-string');
var targetDevice = core.getInput('device-id');


var serviceClient = Client.fromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
      if (err) console.log(op + ' error: ' + err.toString());
      if (res) console.log(op + ' status: ' + res.constructor.name);
    };
  }

  function receiveFeedback(err, receiver){
    receiver.on('message', function (msg) {
      console.log('Feedback message:')
      console.log(msg.getData().toString('utf-8'));
    });
  }

  try{
    serviceClient.open(function (err) {
        if (err) {
          core.setFailed('Could not connect: ' + err.message);
        } else {
          console.log('Service client connected');
          serviceClient.getFeedbackReceiver(receiveFeedback);
          var message = new Message(core.getInput('message'));
          message.ack = 'full';
          message.messageId = "My Message ID";
          console.log('Sending message: ' + message.getData());
          serviceClient.send(targetDevice, message, printResultFor('send'));
        }
      });
  }
  catch(ex){
    core.setFailed('An error occured during the Service client open: ' + error.message);
  }
  