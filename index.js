var Alexa = require('alexa-sdk');

exports.handler = function index(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
 alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Indian Railways is here to help you with Train Seat availability, PNR status, Train Fare and many more, How can I help you? ', 'How can I help you?');
  },
  'Live': function() {
    //var stateSlot = this.event.request.intent.slots.state.value;
    this.emit(':tell','live status' );
},
'pnr': function() {
  this.emit(':tell','This is pnr status');
},
'routemap': function() {
  this.emit(':tell', 'this is route map' );
},
'stationseat': function() {
  this.emit(':tell', 'this is station seat' );
},
'Trainseat': function() {
var obj = this.event.request.intent;
var filledSlots = delegateSlotCollection.call(this);
var  date = obj.slots.trains.value;
  this.emit(':tell', 'this is train seat on' + date.toString());
},
'Unhandled': function () {
  this.emit(':tell', 'Sorry, I don\'t know what to do');
},
'AMAZON.HelpIntent': function () {
    this.emit(':ask', "I can help you with PNR status, Seat availability, Train fare and many more?", "Indian Railway service is at you service, How can we help you?");
},
'AMAZON.CancelIntent': function () {
    this.emit(':tell', "Okay!");
},
'AMAZON.StopIntent': function () {
    this.emit(':tell', "Goodbye!");

}
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}
