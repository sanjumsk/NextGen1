const API_URL = "https://script.google.com/macros/s/AKfycby09ZLbXDCp3ZjU1BS2c0sLWaHJnXKt16DKtih2N-kIJ5qrAVEfo6fhXbPvHkQGWDg9/exec"; // Apps Script Web App URL

const signupBtn = document.getElementById('signupBtn');
const msg = document.getElementById('msg');

signupBtn.addEventListener('click', signup);

function signup(){
  const userid = document.getElementById('userid').value.trim();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  msg.textContent = "";
  msg.className = "";

  if(!userid || !name || !password){
    msg.textContent = "All fields are required";
    msg.classList.add('error');
    return;
  }

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      userid: userid,
      name: name,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === "success"){
      msg.textContent = "Signup successful!";
      msg.classList.add('success');

      document.getElementById('userid').value = "";
      document.getElementById('name').value = "";
      document.getElementById('password').value = "";
    }
    else if(data.status === "exists"){
      msg.textContent = "User already exists";
      msg.classList.add('error');
    }
    else{
      msg.textContent = "Something went wrong";
      msg.classList.add('error');
    }
  })
  .catch(() => {
    msg.textContent = "Server error";
    msg.classList.add('error');
  });
}
