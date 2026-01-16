// 🔥 SAME API URL that you used for signup
const API_URL = "https://script.google.com/macros/s/AKfycby09ZLbXDCp3ZjU1BS2c0sLWaHJnXKt16DKtih2N-kIJ5qrAVEfo6fhXbPvHkQGWDg9/exec"; // Apps Script Web App URL


const msg = document.getElementById("msg");
document.getElementById("loginBtn").addEventListener("click", login);

function login(){

  const userid = document.getElementById("userid").value.trim();
  const password = document.getElementById("password").value.trim();

  msg.textContent = "";
  msg.className = "";

  if(!userid || !password){
    msg.textContent = "Enter User ID and Password";
    msg.classList.add("error");
    return;
  }

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      action: "login",      // 🔥 IMPORTANT
      userid: userid,
      password: password
    })
  })
  .then(res => res.json())
  .then(data => {

    if(data.status === "success"){

      // ✅ Save session
      localStorage.setItem("user", JSON.stringify(data));

      msg.textContent = "Login Successful";
      msg.classList.add("success");

      // 👉 redirect to dashboard
      // location.href = "dashboard.html";

    }else{
      msg.textContent = "Invalid User ID or Password";
      msg.classList.add("error");
    }

  })
  .catch(err => {
    msg.textContent = "Server error";
    msg.classList.add("error");
    console.error(err);
  });

}
