const secretCode = "LOVE";
let collectedLetters = "";
let currentStage = 1;
let currentQuestion = 0;
let correctAnswers = 0;

const numberOfHearts = 2; // Поменя на свое значение. Количество сердец на первом шаге
const secondStepWords = ["Тепло", "Дизайн", "Радость"]; // Массив слов для второго шага

const quizQuestions = [ // Массив вопросов для третьего шага
  {
    question: "Какое время года ассоциируется с теплом, зеленью и жизнью?",
    options: ["Зима", "Весна", "Лето", "Осень"],
    correctAnswer: "Весна"
  },
  {
    question: "Какой цвет ассоциируется у нас с Днём святого Валентина?",
    options: ["Красный", "Розовый", "Белый", "Зеленый"],
    correctAnswer: "Розовый"
  },
  {
    question: "Как называется боязнь прихода Санта-Клауса?",
    options: ["ДЕДАфобия", "МОРОЗАфобия", "ПОДАРКОфобия", "КЛАУСтрофобия"],
    correctAnswer: "КЛАУСтрофобия"
  }
];

const valentinText = "Это персональная валентинка для самого прекрасного дизайнера, которого я знаю, для Валентины в уникальном и единичном экземпляре! </br> 🎫🎫 два билетами на выставку в вс" // Текст для финального шага


function startQuest() {
  document.getElementById('welcome-screen').classList.add('hidden');
  setupStage1();
}

function setupStage1() {
  const heartsContainer = document.getElementById('hearts-container');
  heartsContainer.innerHTML = '';

  const correctHeartIndex = Math.floor(Math.random() * numberOfHearts);
  const hearts = [];

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.addEventListener('click', () => checkHeart(i, correctHeartIndex));

    // Set random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    heart.style.left = `${left}%`;
    heart.style.top = `${top}%`;

    heartsContainer.appendChild(heart);
    hearts.push(heart);
  }

  document.getElementById('stage1').classList.remove('hidden');
}

function makeNotification(elementId, message) {
  const messageContainer = document.getElementById(elementId);
  messageContainer.classList.remove('hidden');
  messageContainer.textContent = message;
  setTimeout(() => {
    messageContainer.classList.add('hidden');
  }, 700);
}

function checkHeart(index, correctHeartIndex) {
  if (index === correctHeartIndex) {

    makeNotification('stage1-message', "Отлично! Вы нашли ключ.");
    collectedLetters += secretCode[0];
    document.getElementById('key1').classList.add('found');

    // Hide all other hearts
    const hearts = document.querySelectorAll('#hearts-container .heart');
    hearts.forEach((heart, i) => {
      if (i !== index) {
        heart.style.opacity = '0';
        heart.style.transition = 'opacity 0.5s';
      }
    });

    setTimeout(() => {
      document.getElementById('stage1').classList.add('hidden');
      setupStage2();
    }, 1500);
  } else {
    makeNotification('stage1-message', "Попробуй снова.");
    const clickedHeart = document.querySelectorAll('#hearts-container .heart')[index];
    clickedHeart.style.opacity = '0';
    clickedHeart.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      clickedHeart.style.visibility = 'hidden';
    }, 500)
  }
}


function setupStage2() {

  function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }

  let i = Math.floor(Math.random() * secondStepWords.length);

  const correctDecryption = secondStepWords[i];

  const encryptedMessage = shuffleString(correctDecryption);

  document.getElementById('encrypted-message').textContent = encryptedMessage;
  document.getElementById('stage2').classList.remove('hidden');

  document.getElementById('decrypted-input').value = '';
  document.getElementById('decrypted-input').addEventListener('keydown', step2Submit);
  document.getElementById('stage2-message').textContent = '';

  function checkDecryption() {
    const userInput = document.getElementById('decrypted-input').value;
    if (userInput.toLowerCase() === correctDecryption.toLowerCase()) {
      makeNotification('stage2-message', "Правильно! Вы нашли еще один ключ.");
      collectedLetters += secretCode[1];
      document.getElementById('key2').classList.add('found');
      setTimeout(() => {
        document.getElementById('stage2').classList.add('hidden');
        setupStage3();
      }, 1000);
    } else {
      makeNotification('stage2-message', "Неправильно, попробуйте снова.");
    }
  }

  window.checkDecryption = checkDecryption;
}

function setupStage3() {
  document.getElementById('stage3').classList.remove('hidden');
  showQuestion(currentQuestion);
}

function showQuestion(index) {
  const quizContainer = document.getElementById('quiz-container');
  const question = quizQuestions[index];

  let optionsHtml = '';
  question.options.forEach((option, i) => {
    optionsHtml += `<div class="quiz-option" onclick="checkAnswer('${option}')">${option}</div>`;
  });

  quizContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">${optionsHtml}</div>
        <div class="quiz-progress">
            ${Array(3).fill('').map((_, i) =>
    `<div class="progress-dot${i < correctAnswers ? ' correct' : ''}"></div>`
  ).join('')}
        </div>
    `;
}

function checkAnswer(selectedAnswer) {
  const currentQuiz = quizQuestions[currentQuestion];
  if (selectedAnswer === currentQuiz.correctAnswer) {
    correctAnswers++;
    makeNotification('stage3-message', "Правильно!");

    if (correctAnswers === 3) {
      collectedLetters += secretCode.slice(2);
      document.getElementById('key3').classList.add('found');
      document.getElementById('fireworks').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('stage3').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('fireworks').classList.add('hidden');
        }, 3000);
      }, 2000);
    } else {
      currentQuestion++;
      setTimeout(() => showQuestion(currentQuestion), 700);
    }
  } else {
    makeNotification('stage3-message', "Попробуй еще раз!");
  }
}

function showFullscreenHeart() {
  collectedLetters += secretCode.slice(2);
  document.getElementById('key3').classList.add('found');
  document.getElementById('stage3').classList.add('hidden');
  document.getElementById('final-screen').classList.remove('hidden');
}

function step2Submit(e) {
  if (e.keyCode === 13) {
    checkDecryption();
  }
}

function finalHeart() {

  const heart = document.getElementById('final-heart');
  heart.classList.remove('pulsating');
  heart.classList.add('growing');

  const valentinTextElement = document.getElementById('valentintext');
  setTimeout(() => {
    valentinTextElement.classList.remove('hidden');
    valentinTextElement.innerHTML = valentinText;
  }, 1000);

}