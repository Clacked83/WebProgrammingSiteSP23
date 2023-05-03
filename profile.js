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
      if(document.querySelector("#newName").value == null) {
         formErrors.innerHTML += "<li>Username is null.</li>"
      } else {
        newName = document.querySelector("#newName").value;
      }

      // if(document.querySelector("#profilePic").value == null) {
      //    formErrors.innerHTML += "<li>Profile picture is null.</li>"
      // } else {
      //   newName = document.querySelector("#profile-pic").value;
      // }

      if(document.querySelector("#email").value == null) {
         formErrors.innerHTML += "<li>Email is null.</li>"
      } else {
         email = document.querySelector("#email").value;
      }

      if(document.querySelector("#oldPass").value == null) {
        formErrors.innerHTML += "<li>Password is null.</li>"
      } else {
        oldPass = document.querySelector("#oldPass").value;
      }

      if(document.querySelector("#newPass").value == null) {
        formErrors.innerHTML += "<li>Password is null.</li>"
     } else {
        newPass = document.querySelector("#newPass").value;
     }

      if(document.querySelector("#passwordConfirm").value == undefined) {
         formErrors.innerHTML += "<li>Password is undefined.</li>"
      } else {
         passwordConfirm = document.querySelector("#passwordConfirm").value;
      }
      //End form input debug


      //Check for new Username
      if(newName.length < 1) {   
         numErrors++;
         document.getElementById('usernameError').setAttribute("class", "error");
      } else {
         document.getElementById('usernameError').setAttribute("class", "hidden");
      }

      //Check valid email format
      if(regex.test(email) == false){       
         document.getElementById('emailError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('emailError').setAttribute("class", "hidden");
      }
      
      //Check password min and max length
      if([...newPass].length < 10 || [...newPass].length > 20) {
         document.getElementById('passwordLengthError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('passwordLengthError').setAttribute("class", "hidden");
      }

      //Check for at least one uppercase character
      if(reLowerCase.test(newPass) == false) {
         document.getElementById('lowerCaseError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('lowerCaseError').setAttribute("class", "hidden");
      }

      //Check for at least one lowercase character
      if(reUpperCase.test(newPass) == false) {
         document.getElementById('upperCaseError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('upperCaseError').setAttribute("class", "hidden");
      }
      
      //Check for at least one digit
      if(reDigit.test(newPass) == false) {
         document.getElementById('digitError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('digitError').setAttribute("class", "hidden");
      }

        //Check to see whether new password and old password match
        if(newPass == oldPass) {
            document.getElementById('matchError').setAttribute("class", "error");
            numErrors++;
        } else {
            document.getElementById('matchError').setAttribute("class", "hidden");
        }
      
      //Check to see whether password and password confirm match
      if(newPass != passwordConfirm) {
         document.getElementById('passwordConfirmError').setAttribute("class", "error");
         numErrors++;
      } else {
         document.getElementById('passwordConfirmError').setAttribute("class", "hidden");
      }

      //Check for form errors: successful form submission if yes
      if(numErrors > 0){
         document.getElementById('formErrors').setAttribute("class", "error");
         document.getElementById('submit').disabled = true;
      } else {
         document.getElementById('formErrors').setAttribute("class", "hidden");
         let newName = document.querySelector('#newName').value
         localStorage.setItem('username', newName);
         document.getElementById('submit').disabled = false;
      }
      // let xhr = new XMLHttpRequest();
      // xhr.open("GET", 'http://localhost:3000/hasError', true);
   }

document.querySelector('form').addEventListener("input", ()=> {
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