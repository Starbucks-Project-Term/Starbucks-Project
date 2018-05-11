var userlogin = document.getElementById("userlogin"),
    passwordlogin = document.getElementById("passwordlogin"),
    login = document.getElementById("login"),
    createBtn = document.getElementById("create"),
    loginDiv = document.getElementById("loginout"),
    newuser = document.getElementById("newuser"),
    newpw = document.getElementById("newpw"),
    confirmpw = document.getElementById("confirmpw"),
    acctDiv = document.getElementById("createacc"),
    submitbutton = document.getElementById("submitbutton"),
    cancelBtn = document.getElementById("cancelBtn");


document.getElementById("create").addEventListener("click", function (){
    document.getElementById("createacc").style.display = "block";
    loginFadeOut();
    setTimeout(function(){
        acctFadeIn()}, 1000)
});


document.getElementById("submitbutton").addEventListener("click", function(){
    loginDiv.style.display = "block";
    acctFadeOut();
    setTimeout(function(){
        loginFadeIn()}, 1000)
});

document.getElementById("cancelBtn").addEventListener("click", function(){
    loginDiv.style.display = "block";
    acctFadeOut();
    setTimeout(function(){
        loginFadeIn()}, 1000)
});


function loginFadeIn(){
    userlogin.style.left = "0px";
    userlogin.style.opacity = 1;
    passwordlogin.style.left = "0px";
    passwordlogin.style.opacity = 1;
    login.style.left = "0px";
    login.style.opacity = 1;
    createBtn.style.opacity = 1;
}


function loginFadeOut(){
    userlogin.style.left = "150px";
    userlogin.style.opacity = 0;
    passwordlogin.style.transitionDelay = "0.2s";
    passwordlogin.style.left = "150px";
    passwordlogin.style.opacity = 0;
    login.style.transitionDelay = "0.4s";
    login.style.left = "150px";
    login.style.opacity = 0;
    createBtn.style.opacity = 0;
    setTimeout(function(){
        loginDiv.style.display = "none";}, 1000)
    }


function acctFadeIn(){
    acctDiv.style.display = "block";
    newuser.style.left = "0px";
    newuser.style.opacity = 1;
    newpw.style.transitionDelay = "0.2s"
    newpw.style.left = "0px";
    newpw.style.opacity = 1;
    confirmpw.style.transitionDelay = "0.4s";
    confirmpw.style.left = "0px";
    confirmpw.style.opacity = 1;;
    submitbutton.style.left = "0px";
    submitbutton.style.opacity = 1;
    cancelBtn.style.opacity = 1;
}

function acctFadeOut(){
    newuser.style.left = "-150px";
    newuser.style.opacity = 0;
    newpw.style.left = "-150px";
    newpw.style.opacity = 0;
    confirmpw.style.left = "-150px";
    confirmpw.style.opacity = 0;
    submitbutton.style.left = "-150px";
    submitbutton.style.opacity = 0;
    cancelBtn.style.opacity = 0;
    setTimeout(function(){
        document.getElementById("createacc").style.display = "none";}, 1000)
}


var current = 0,
slides = document.getElementsByClassName("bg");

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  current = (current != slides.length - 1) ? current + 1 : 0;
  slides[current].style.opacity = 1;
}, 5000);



function shortusername(username){
    if(username === 1){
        swal('Username must be 3-12 characters long')
    } else if (username === 2){
        swal('Username already exists')
    } else if (username === 3){
        swal("Incorrect Username or Password")
    } else if (username === 4){
        swal("Passwords do not match")
    } else if (username === 5){
        swal("Password needs to be at least 5 characters")
    } else if (username === 6){
        swal("Username may not contain spaces or special characters")
    } else if (username === 0){
        swal('Congratulations you have successfully created an account')
    }
};


// var saveList = (location) => {
// 	var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("POST","/storeuserdata", true);
//     xmlhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
//     xmlhttp.onreadystatechange = () =>{
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             console.log(xmlhttp.responseText)
//         }
//     };
//     xmlhttp.send(`location=${location}`);
// };





//document.getElementById("x").addEventListener("click",function(){
//    document.getElementById("mainpage").style.display = "none";
//    document.getElementById("mainpage2").style.display = "none";
//})


// var LoginInput = document.getElementById('usertxt'),
//     PassInput = document.getElementById('passwordtxt'),
//     //NEED TO MAKE PASSWORD <input type='password'>
//     LoginBut = document.getElementById('login'),
//     MakeUsrBut = document.getElementById('submit'),

//     NewUsrInput = document.getElementById('newuser'),
//     NewUsrPass = document.getElementById('newpw'),
//     ConfirmPass = document.getElementById('confirmpw')

