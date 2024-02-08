let startTime;
let timerInterval;

function setTimer() {
    const duration = getTimerDurationFromPrompt();
    if (duration > 0) {
        startTime = Date.now() + duration;
        updateTimer();
    } else {
        alert("Введіть коректний час!");
    }
}

function getTimerDurationFromPrompt() {
    let userInput = prompt("Введіть час в форматі хвилини:секунди (наприклад, 05:00):");

    if (userInput === null) {
        return 0; // Користувач натиснув "Відміна", повертаємо 0
    }

    const inputArray = userInput.split(":");
    const minutes = parseInt(inputArray[0], 10) || 0;
    const seconds = parseInt(inputArray[1], 10) || 0;

    return minutes * 60 * 1000 + seconds * 1000;
}

function stopTimer() {
    clearInterval(timerInterval);
    // Оновлюємо startTime для відображення поточного часу на сторінці
    startTime = Date.now();
    updateTimer();
}

function startTimer() {
    if (startTime > 0) {
        // Запускаємо інтервал, якщо він ще не запущений
        if (!timerInterval) {
            timerInterval = setInterval(updateTimer, 1000);
        }
    } else {
        alert("Спочатку введіть час за допомогою кнопки 'Задати час'");
    }
}


function updateTimer() {
    const currentTime = Date.now();
    const remainingTime = startTime - currentTime;

    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    const formattedTime = padNumber(minutes) + ":" + padNumber(seconds);

    document.getElementById("timer").innerText = formattedTime;

    if (remainingTime <= 0) {
        stopTimer();
        document.getElementById("timer").innerText = "Час вийшов!";
    }
}

function padNumber(number) {
    return (number < 10 ? "0" : "") + number;
}
