const video = document.querySelector('video');
window.addEventListener('onload', function () {
    video.play();

})
const SignUp=document.getElementById('SignUp_Section')
const Login_Up=document.getElementById('Login_Section')
const Password=document.getElementById('Or_Pass')
const ConformPass=document.getElementById('Dup_Pass')
// document.addEventListener("DOMContentLoaded", function () {
//     const header = document.getElementById("Header-Section");
//     header.style.opacity = "1"; // Fade in slowly
//   });

//   document.addEventListener("DOMContentLoaded", function () {
//     const infoPart = document.querySelector(".Info-Part");
//     infoPart.style.opacity='1'
//   });

// // Add this JavaScript code to your existing JavaScript file (Landing_Page.js)
// document.addEventListener("DOMContentLoaded", function () {
//     const signupsection = document.getElementById("SignUp_Section");
//     signupsection.style.left = "116px"; // Slide in from the left
//   });




function SignUP(){
    
    SignUp.style.display='block'
    Login_Up.style.display='none'
    // document.body.style.display='none'
}
function Login(){
    SignUp.style.display='none'
    Login_Up.style.display='block'
    
}

function ValidateForm() {
  let passwordInput = document.getElementById("Or_Pass");
  let Email=document.getElementById('Form_mail')
  let confirmPasswordInput = document.getElementById("Dup_Pass");
  passwordInput.style.borderColor = '';
  confirmPasswordInput.style.borderColor = '';

  
  if(!passwordInput.value)
  {
    passwordInput.style.borderColor='red'
    return false
    }
  else if (passwordInput.value === confirmPasswordInput.value) {

      return true
  } else {
        confirmPasswordInput.style.borderColor='red' 
      return false
    }
}


// Define an array of image sources
const imageSources = [
  "./Images/undraw_access_account_re_8spm.svg",
  "./Images/MyPassword.png", 
  "./Images/Projection-Image.png",
  "./Images/MobileLogin.png",
  // Add the path to your second image
  // Add more image paths as needed
];

const imageElement = document.getElementById("image");
let currentIndex = 0;
    if(currentIndex>imageSources.length){
      currentIndex=0
    }
// Function to change the image with a fade-out effect
function changeImageWithAnimation() {
  currentIndex = (currentIndex + 1) % imageSources.length;
  imageElement.style.opacity = 0; // Fade out the current image
  setTimeout(() => {
      imageElement.src = imageSources[currentIndex];
      imageElement.style.opacity = 1; // Fade in the new image
  }, 1000); // Change the image source after 1 second (adjust as needed)
}

// Initial image change after 5 seconds
setTimeout(changeImageWithAnimation, 5000);

// Set up a repeating interval to change the image every 5 seconds
setInterval(changeImageWithAnimation, 5000);
