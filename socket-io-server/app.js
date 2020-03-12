const express = require("express");
const brain = require("brain.js");
const http = require("http");
const socketIo = require("socket.io");
const fs = require('fs');
const stringSimilarity = require('string-similarity');



const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

var listings = [{"title":"Laptop","desc":"We want a good laptop","users":50,"offer":[{"title":"Test Lising","desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]},
                {"title":"Chair","desc":"We want a good chair","users":500,"offer":[]},
                {"title":"Ticket","desc":"We want a good ticket","users":156,"offer":[]},
                {"title":"Fork","desc":"We want a good fork","users":999,"offer":[]}
              ];



              var net = new brain.recurrent.LSTM();
              // net.train([
              //   {input: "This is a scam.", output: "fraud"},
              //   {input: "100% real offer, not a scam", output: "fraud"},
              //   {input: "We just need your card details and mothers maiden name.", output: "fraud"},
              //   {input: "we are going to scam you", output: "fraud"},
              //   {input: "Tickets for sale, scalped tickets!", output: "fraud"},
              //   //added for less overfitting
              //   {input: "great product, great reviews", output: "notfraud"},
              //   {input: "we are an industry leader", output: "notfraud"},
              //   {input: "we have great customer support", output: "notfraud"},
              //   {input: "This product is well reviewed", output: "notfraud"},
              //   {input: "Fantastic Product, are customers love it!", output: "notfraud"},
              // ],{
              //   // Defaults values --> expected validation
              //   iterations: 40000, // the maximum times to iterate the training data --> number greater than 0
              //   errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
              //   log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
              //   logPeriod: 10, // iterations between logging out --> number greater than 0
              //   learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
              //   momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
              //   callback: null, // a periodic call back that can be triggered while training --> null or function
              //   callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
              //   timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
              // });


              // const json = net.toJSON()

              // var jsonContent = JSON.stringify(json);
              // fs.writeFile('myModel2.json', jsonContent, 'utf8', function succ(err,data){
              //   console.log("file correct")
              // });

              var model = fs.readFileSync('myModel.json');
              let json = JSON.parse(model);
              net.fromJSON(json)

              // var inputString = "this is my input string tick3ts s0ftware"
              // checkStringForBannedWords(inputString);




function checkStringForBannedWords(data){

  var bannedWords = ["ticket", "software","blacks"];
  var words = data.split(" ");
  var match = false;

  //for each word
  for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
    //for each banned word
    for (let j = 0; j < bannedWords.length; j++) {
      const bWord = bannedWords[j];
      
      if(isMatch(word,bWord) == true){
        console.log("MATCH");
        console.log(word+" "+bWord);
        match = true;
      }
    }
  }

  return match;
}


//get percentage similarity, return true if 50% match 
function isMatch(word1,word2){
    var score = stringSimilarity.compareTwoStrings(word1, word2);
    if(score >= 0.5){
      return true;
    }
    else{
      return false;
    }
}



io.on("connection", socket => {

  console.log("New client connected");


  socket.on("disconnect", () => console.log("Client disconnected"));

  socket.emit("test", listings);


  socket.on("sendEntry",(data) => approveOffer(data));

  socket.on("report received",(data) => saveReportedListing(data));


  function saveReportedListing(data){
    console.log(data);

    var json = JSON.parse(fs.readFileSync('reports.json', 'utf8'));
    console.log("Offer Reported!")

    json.reports.push(data);

    fs.writeFile('reports.json', JSON.stringify(json), 'utf8', function(){

      console.log("Written to file!")

    });

  }

  //Neural net functionality will go here
  function approveOffer(offer){

    var offerTitle = net.run(offer.title);
    var offerDesc  = net.run(offer.desc);

    var match = false;


    //test for duplicate title
    if(listings[offer.selectedIndex].offer.length > 0){

      for (let index = 0; index < listings[offer.selectedIndex].offer.length; index++) {

        if(listings[offer.selectedIndex].offer[index].title == offer.title){
          match = true;
        }   
      }
    }

    if(offer.trustedSeller == true){
      console.log("Approved! [TRUSTED SELLER]");
      listings[offer.selectedIndex].offer.push({"title":offer.title,"desc":offer.desc,"trustedSeller":true});
      
    }else if(checkStringForBannedWords(offer.title) == true || checkStringForBannedWords(offer.desc) == true){
      console.log("Rejected! [BLOCKED PHRASE]")
    }else if(offerTitle == "fraud" || offerDesc == "fraud" || match == true){
      console.log("Rejected! [FRAUD DETECTED]")
    }else{
      console.log("Approved! [NO FRAUD DETECTED]");
      listings[offer.selectedIndex].offer.push({"title":offer.title,"desc":offer.desc,"trustedSeller":false});
      io.sockets.emit("test", listings);
    }
  }





});




server.listen(port, () => console.log(`Listening on port ${port}`));