const totalHearts = 15; // Total number of hearts
const correctHeart = Math.floor(Math.random() * totalHearts) + 1; // Random correct heart

document.addEventListener('DOMContentLoaded', () => {
  const heartsContainer = document.getElementById('hearts-container');
  for (let i = 1; i <= totalHearts; i++) {
    const heart = document.createElement('span');
    const heartStyle = heart.style
    heartStyle.top = '5px';
    heartStyle.left = '5px';
    heart.innerHTML = '❤️';
    heart.onclick = () => checkHeart(i);
    heartsContainer.appendChild(heart);
  }
});

function nextScreen(currentId, nextId) {
  const currentScreen = document.getElementById(currentId);
  const nextScreen = document.getElementById(nextId);

  currentScreen.classList.add('hidden');
  setTimeout(() => {
    currentScreen.style.display = 'none';
    nextScreen.style.display = 'block';
    setTimeout(() => {
      nextScreen.classList.remove('hidden');
    }, 50);
  }, 300);
}

function checkHeart(heartNumber) {
  const resultElement = document.getElementById('result1');

  if (heartNumber === correctHeart) {
    resultElement.textContent = 'Правильно! ❤️';
    resultElement.style.color = 'green';
    setTimeout(() => {
      nextScreen('puzzle1', 'question');
    }, 300);
  } else {
    resultElement.textContent = 'Попробуй ещё раз!';
    resultElement.style.color = 'red';
  }
}
