const popup = document.querySelector(".popup"),
  wifiIcon = document.querySelector(".icon iconify-icon");
  popupTitle = document.querySelector(".popup .title"),
  popupDesc = document.querySelector(".desc"),
  reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
    console.log(response);
  } catch (error) {
    isOnline = false; //if there is an error, the connection is considered offline
  }
  // console.log(isOnline);
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};
// handlePop(status): causes the alert box to appear when status==isOnline is false and when it is true the the alert box disappears


const handlePopup = (status) => {
  if (status) {
    //when/if status==isOnline is true
    //update icon, title, and description accordingly
    //----changing the content of the popup box
    popup.classList.add("online");
    wifiIcon.attributes = "material-symbols:wifi";
    popupTitle.innerText = "Restored Connection";
    popupDesc.innerHTML =
      "Your device is now successfully connected to the internet.";
      //---end of changing the content of the popup box
      return setTimeout(()=> popup.classList.remove("show", "online"), 2000);
    }
    //Else when/if status==isOnline is false
    //update icon, title, and description accordingly
    //----changing the content of the popup box
    wifiIcon.className = "uil:wifi-slash";
  popupTitle.innerText = "Lost Connection";
  popupDesc.innerHTML =
  "Your network is unvailavble. We will attempt to reconnect you in <b>10</b> seconds.";
  popup.className = "popup show";
  
  //---end of changing the content of the popup box

  //---if false end


  //This is to set the timer on the popup to decrease every one second
  intervalId = setInterval(() => {
    timer--;
    //if the timer gets to zero , check the connection again
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};
//only if the isOnline is true, check the connection status every three seconds the.
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click",checkConnection);
