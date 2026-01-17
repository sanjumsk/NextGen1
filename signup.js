const API_URL = "https://script.google.com/macros/s/AKfycbzjvB8qXhwQCub3aCOBJSxOBJyxsrtHvcHIiX44Wg_rZ-KXeuBRsH1y2i932ddNBhcL/exec"; // Apps Script Web App URL

const signupBtn = document.getElementById("signupBtn");
const msg = document.getElementById("msg");

signupBtn.addEventListener("click", signup);

function signup(){
  const userid = document.getElementById("userid").value.trim();
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const city = document.getElementById("city").value.trim();


  msg.textContent = "";
  msg.className = "";

  // 🔎 Basic validation
  if (!userid || !name || !password) {
    msg.textContent = "All fields are required";
    msg.classList.add("error");
    return;
  }

}

  


function sendData(base64Image){
// 📤 Send data to Apps Script
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "signup",
      userid: userid,
      name: name,
      email: email,
      mobile: mobile,
      city: city,
      password: password,
      photo: base64Image
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        msg.textContent = "Signup successful! You can login now.";
        msg.classList.add("success");

        // clear form
        document.getElementById("userid").value = "";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("city").value = "";
        document.getElementById("password").value = "";


      } else if (data.status === "exists") {
        msg.textContent = "User ID already exists";
        msg.classList.add("error");
      } else {
        msg.textContent = "Server error";
        msg.classList.add("error");
      }
    })
    .catch((err) => {
      msg.textContent = "Network / Server problem";
      msg.classList.add("error");
      console.error(err);
    });
}


function goToLogin(){
  window.location.href = "login.html"; // login page file name
}

const photoInput = document.getElementById("photo");
const preview = document.getElementById("preview");

photoInput.addEventListener("change", function(){

  console.log("Photo selencted");
  
  const file = this.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(e){
    preview.src = e.target.result; // base64 image
    preview.style.display = "block";
  };

  reader.readAsDataURL(file);
});

// if(!file.type.startsWith("image/")){
//   alert("Only image allowed");
//   return;
// }

// if(file.size > 1024*1024){
//   alert("Max 1MB allowed");
//   return;
// }

document.getElementById("signupBtn").addEventListener("click", signup);

function signup(){

  const file = document.getElementById("photo").files[0];

  if(!file){
    msg.textContent = "Please upload photo";
    return;
  }

  const reader = new FileReader();

  reader.onload = function(){

    const base64Image = reader.result.split(",")[1]; // remove prefix

    sendData(base64Image);
  };

  reader.readAsDataURL(file);
}


