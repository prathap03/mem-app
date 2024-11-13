// Sample JSON data for items
const items = [
    { name: "DIYAS", image: "./public/diyas.png" },
    { name: "SWEETS", image: "./public/sweets.png" },
    { name: "RANGOLI", image: "./public/rangoli.png" },
    { name: "FIRECRACKERS", image: "./public/firecrackers.png" },
    { name: "LANTERN", image: "./public/lantern.png" },
    { name: "LOTUS", image: "./public/lotus.png" },
    { name: "MARIGOLD", image: "./public/marigold.png" },
    { name: "HENNA", image: "./public/henna.png" },
    { name: "POOJA PLATE", image: "./public/poojaplate.png" },
    { name: "DOTHI", image: "./public/dothi.png" },
    { name: "INCENSE", image: "./public/incense.png" },
    { name: "SPARKLERS", image: "./public/sparklers.png" },
    { name: "GIFTS", image: "./public/gifts.png" },
    { name: "KITES", image: "./public/kites.png" },
    { name: "SAREE", image: "./public/saree.png" },
  ];

  var itemNames;
  
  // Shuffle items
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Display items in the grid with names and numbers
  function displayItems() {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = ""; // Clear previous items
  
    // Shuffle and display items with numbered names
    const shuffledItems = shuffle([...items]); // Create a shuffled copy of items
    shuffledItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `<span>${index + 1}. ${item.name}</span><img src="${item.image}" alt="${item.name}">`;
      itemList.appendChild(itemDiv);
    });
  
    // Save the shuffled list names to local storage
    itemNames = shuffledItems.map((item, index) => `${index + 1}. ${item.name}`);
    localStorage.setItem("shuffledItemNames", JSON.stringify(itemNames));
  
   

  }
  
  // Create and offer a text file for download
  function createDownloadFile(itemNames) {
    const blob = new Blob([itemNames.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shuffled_items.txt";
    link.style.display = "none"; // Hide the link element from the view
    document.body.appendChild(link);
    // link.click(); // Automatically trigger the download
    document.body.removeChild(link); // Clean up after download
  }
  
  // Timer countdown with fade-out animation
  function startTimer() {
    let timeLeft = 20;
    const timerDisplay = document.getElementById("timer");
    const countdown = setInterval(() => {
      timerDisplay.textContent = `Time left: ${timeLeft--}s`;
  
      if (timeLeft < 0) {
        clearInterval(countdown);
        endGameAndCapture();
      }
    }, 1000);
  }
  
  // Hide items with fade-out effect and reset timer display
  function hideItems() {
    document.querySelectorAll(".item").forEach((item) => {
      item.style.animation = "fadeOut 0.5s forwards";
    });
    setTimeout(() => {
      document.getElementById("item-list").classList.add("hidden");
      document.getElementById("timer").classList.add("hidden");
      document.querySelector("#download-container").classList.remove("hidden"); // Show download link

    
    }, 500); // Allow fade-out animation to complete
  }
  
  // Reset game to initial state
  function resetGame() {
    setTimeout(() => {
      document.getElementById("game-title").classList.remove("hidden");
      document.getElementById("start-button").classList.remove("hidden");
      document.querySelector("#download-container").classList.add("hidden"); // Show download link
    
      document.getElementById("timer").textContent = ""; // Clear timer text

    }, 500); // Allow fade-out animation to complete
  }
  
  // Initialize game when start button is clicked
  function startGame() {
    document.getElementById("game-title").style.animation = "fadeOut 1s forwards";
    document.getElementById("start-button").style.animation = "fadeOut 1s forwards";
      document.getElementById("download-container").innerHTML = ""; // Clear previous download link

    setTimeout(() => {
      document.getElementById("game-title").classList.add("hidden");
      document.getElementById("start-button").classList.add("hidden");
      document.getElementById("timer").classList.remove("hidden");
      document.getElementById("item-list").classList.remove("hidden");
  
      displayItems();
      startTimer();
    }, 1000); // Allow fade-out of button and title
  }

  // Capture screenshot of the item list and save it
function captureScreenshot() {
    const gameArea = document.getElementById("item-list"); // Change this to your game area element ID

    html2canvas(gameArea).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "game_screenshot.png";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Call this function once the timer ends or at any desired point in the game flow
function endGameAndCapture() {
     // Generate a text file for download
    //  createDownloadFile(itemNames);
    hideItems(); // Call the function to hide items
    // captureScreenshot(); // Capture screenshot after hiding
    resetGame(); // Reset the game state if needed
}

  
  // Attach event to start button
  document.getElementById("start-button").addEventListener("click", startGame);
  