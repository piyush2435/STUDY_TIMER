// 🔥 Replace this config with your Firebase project config!
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  let seconds = 0;
  let interval = null;
  const userId = prompt("Enter your username (e.g. piyush)");
  
  function formatTime(s) {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  }
  
  function updateMyDisplay() {
    document.getElementById("my-timer").textContent = formatTime(seconds);
    db.ref("timers/" + userId).set({ time: seconds });
  }
  
  function startTimer() {
    if (!interval) {
      interval = setInterval(() => {
        seconds++;
        updateMyDisplay();
      }, 1000);
    }
  }
  
  function pauseTimer() {
    clearInterval(interval);
    interval = null;
  }
  
  // 🔁 Listen for your friend’s timer
  const friendId = userId === "user1" ? "user2" : "user1";
  db.ref("timers/" + friendId).on("value", (snapshot) => {
    const val = snapshot.val();
    if (val && val.time !== undefined) {
      document.getElementById("friend-timer").textContent = formatTime(val.time);
    }
  });
  