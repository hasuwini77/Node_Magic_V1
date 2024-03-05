function updateCurrentTime() {
    const currentDateElement = document.querySelector('.date');
    const currentTimeElement = document.querySelector('.time');

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    currentDateElement.innerText = currentDate.toLocaleDateString();
    currentTimeElement.innerText = currentDate.toLocaleTimeString();

    // Set styles dynamically
     currentDateElement.style.color = '#fefbfd'; 
    currentTimeElement.style.color = '#036a38'; 
}

// Update the time initially
updateCurrentTime();

// Update the time every second (1000 milliseconds)
setInterval(updateCurrentTime, 1000);
