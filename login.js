let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
let reUpperCase = /[A-Z]/;
let reLowerCase = /[a-z]/;
let reDigit = /\d/;
let numErrors = 0;

// let fullName;
// let email;
// let password;
// let passwordConfirm;

// let usernameClass = document.querySelector('#username');
// let emailClass = document.querySelector('#email');
// let passwordClass = document.querySelector('#password');
// let passwordConfirmClass = document.querySelector('#passwordConfirm');
// let formErrors = document.getElementById('formErrors');

function checkForm(){
   numErrors = 0; 

      //Form input Debug 
      if(document.querySelector("#username").value == null) {
         formErrors.innerHTML += "<li>Username is null.</li>"
      } else {
         username = document.querySelector("#username").value;
      }

      if(document.querySelector("#password").value == null) {
         formErrors.innerHTML += "<li>Password is null.</li>"
      } else {
         password = document.querySelector("#password").value;
      }

      //End form input debug


      //Check for Username
      if(username.length < 1) {   
         numErrors++;
         document.getElementById('usernameError').setAttribute("class", "error");
      } else {
         document.getElementById('usernameError').setAttribute("class", "hidden");
      }
      
      //Check password min and max length
      if(password.length < 1) {
         document.getElementById('passwordLengthError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('passwordLengthError').setAttribute("class", "hidden");
      }

      //Check for form errors: successful form submission if yes
      if(numErrors > 0){
         document.getElementById('formErrors').setAttribute("class", "error");
         document.getElementById('submit').disabled = true;
      } else {
         document.getElementById('formErrors').setAttribute("class", "hidden");
         let userinfo = document.querySelector('#username').value
         localStorage.setItem('username', userinfo);
         document.getElementById('submit').disabled = false;
      }
      // let xhr = new XMLHttpRequest();
      // xhr.open("GET", 'http://localhost:3000/hasError', true);
   }

document.querySelector("form").addEventListener("input", ()=> {
   document.getElementById('formErrors').setAttribute("class", "hide");
   checkForm();

  event.preventDefault();
});

//Debug tools
function printAll() {
   console.log(fullNameClass);
   console.log(emailClass);
   console.log(passwordClass);
   console.log(passwordConfirm);
   console.log(formErrors);
   console.log(numErrors);
}

function changeClass() {
   document.getElementById('formErrors').setAttribute("class", null);
}