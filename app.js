// Слайдер
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

// Обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

// Инициализация слайдера
updateSlider();

// Функции для открытия и закрытия изображения в полноэкранном режиме
function openFullscreenImage(element) {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    fullscreenImage.src = element.src;
    fullscreenContainer.style.display = 'block';
}

function closeFullscreenImage() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.style.display = 'none';
}

// Плавная прокрутка страницы и отображение кнопки «Наверх»
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('scrollToTopButton').style.display = 'block';
    } else {
        document.getElementById('scrollToTopButton').style.display = 'none';
    }
}

// Плавный скроллинг при клике на кнопку "Наверх"
document.getElementById('scrollToTopButton').addEventListener('click', function() {
    scrollToTop();
});

function scrollToTop() {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// Автоматическое переключение слайдов каждые 5 секунд
setInterval(showNextSlide, 5000);

// Викторина про чихуахуа
const quizData = [
    {
        question: "Откуда родом порода чихуахуа?",
        options: ["Мексика", "Китай", "Франция", "Россия"],
        correctAnswer: 0,
        explanation: "Чихуахуа родом из Мексики, штата Чиуауа (Chihuahua), в честь которого и названа порода."
    },
    {
        question: "Какой максимальный вес у чихуахуа по стандарту породы?",
        options: ["1 кг", "3 кг", "5 кг", "10 кг"],
        correctAnswer: 1,
        explanation: "Идеальный вес чихуахуа - от 1,5 до 3 кг. Собаки весом более 3 кг дисквалифицируются."
    },
    {
        question: "Какая у чихуахуа продолжительность жизни?",
        options: ["5-8 лет", "8-12 лет", "12-20 лет", "20-25 лет"],
        correctAnswer: 2,
        explanation: "Чихуахуа - долгожители среди собак. При хорошем уходе они живут 12-20 лет."
    },
    {
        question: "Какого окраса не бывает у чихуахуа?",
        options: ["Черный", "Белый", "Тигровый", "Мерль"],
        correctAnswer: 3,
        explanation: "Окрас мерль не допускается у чихуахуа, так как связан с генетическими заболеваниями."
    },
    {
        question: "Чихуахуа бывают двух типов по шерсти. Каких?",
        options: ["Длинношерстные и гладкошерстные", "Кудрявые и прямые", "Жесткошерстные и мягкошерстные", "Пушистые и лысые"],
        correctAnswer: 0,
        explanation: "Чихуахуа бывают двух типов: длинношерстные и гладкошерстные."
    },
    {
        question: "Почему чихуахуа часто дрожат?",
        options: ["Им всегда холодно", "Это признак болезни", "Особенность нервной системы", "Они злятся"],
        correctAnswer: 2,
        explanation: "Дрожь у чихуахуа - особенность их нервной системы, может быть вызвана стрессом, волнением или холодом."
    },
    {
        question: "Какой характер обычно у чихуахуа?",
        options: ["Трусливый и запуганный", "Агрессивный и злой", "Смелый и преданный", "Ленивый и апатичный"],
        correctAnswer: 2,
        explanation: "Чихуахуа очень смелые, преданные и самоуверенные собаки, несмотря на свои миниатюрные размеры."
    }
];

let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null);
let quizCompleted = false;

// Элементы викторины
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('optionsContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const prevButtonQuiz = document.getElementById('prevButton');
const nextButtonQuiz = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const resultContainer = document.getElementById('resultContainer');
const questionContainer = document.getElementById('questionContainer');
const scoreElement = document.getElementById('score');
const resultMessageElement = document.getElementById('resultMessage');
const resultDetailsElement = document.getElementById('resultDetails');
const restartButton = document.getElementById('restartButton');

// Инициализация викторины
function initQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizData.length).fill(null);
    quizCompleted = false;
    
    loadQuestion();
    updateProgress();
    updateButtons();
    
    resultContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
}

// Загрузка вопроса
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    
    questionElement.textContent = currentQuizData.question;
    optionsContainer.innerHTML = '';
    
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        optionElement.textContent = option;
        
        // Проверка выбранного ответа
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        // Проверка правильного ответа (если викторина завершена)
        if (quizCompleted && index === currentQuizData.correctAnswer) {
            optionElement.classList.add('correct');
        } else if (quizCompleted && userAnswers[currentQuestion] === index && 
                   userAnswers[currentQuestion] !== currentQuizData.correctAnswer) {
            optionElement.classList.add('incorrect');
        }
        
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
}

// Выбор варианта ответа
function selectOption(index) {
    if (quizCompleted) return;
    
    userAnswers[currentQuestion] = index;
    loadQuestion();
    updateButtons();
}

// Обновление прогресса
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${quizData.length}`;
}

// Обновление кнопок навигации
function updateButtons() {
    prevButtonQuiz.disabled = currentQuestion === 0;
    
    if (currentQuestion === quizData.length - 1) {
        nextButtonQuiz.style.display = 'none';
        submitButton.style.display = 'block';
    } else {
        nextButtonQuiz.style.display = 'block';
        submitButton.style.display = 'none';
    }
    
    nextButtonQuiz.disabled = userAnswers[currentQuestion] === null;
}

// Переход к следующему вопросу
nextButtonQuiz.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateProgress();
        updateButtons();
    }
});

// Переход к предыдущему вопросу
prevButtonQuiz.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateProgress();
        updateButtons();
    }
});

// Завершение викторины
submitButton.addEventListener('click', () => {
    quizCompleted = true;
    showResults();
});

// Показ результатов
function showResults() {
    let score = 0;
    let resultDetailsHTML = '';
    
    quizData.forEach((quizItem, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === quizItem.correctAnswer;
        
        if (isCorrect) score++;
        
        resultDetailsHTML += `
            <div class="result-item">
                <div class="result-question">${index + 1}. ${quizItem.question}</div>
                <div class="result-answer">
                    <strong>Ваш ответ:</strong> ${quizItem.options[userAnswer] || "Нет ответа"}<br>
                    ${isCorrect ? 
                        '<span class="result-correct">✓ Правильно!</span>' : 
                        `<span class="result-incorrect">✗ Неправильно</span>`
                    }<br>
                    <strong>Правильный ответ:</strong> ${quizItem.options[quizItem.correctAnswer]}<br>
                    <em>${quizItem.explanation}</em>
                </div>
            </div>
        `;
    });
    
    scoreElement.textContent = score;
    resultDetailsElement.innerHTML = resultDetailsHTML;
    
    // Определение сообщения в зависимости от результата
    let message = "";
    if (score === 7) {
        message = "Потрясающе! Вы настоящий эксперт по чихуахуа! Ася гордится вами! 🎉";
    } else if (score >= 5) {
        message = "Отличный результат! Вы хорошо знаете породу чихуахуа! 🐾";
    } else if (score >= 3) {
        message = "Хорошо! Но есть что улучшить в знаниях о чихуахуа!";
    } else {
        message = "Не расстраивайтесь! Больше общайтесь с Асей и узнаете всё о чихуахуа!";
    }
    
    resultMessageElement.textContent = message;
    
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

// Перезапуск викторины
restartButton.addEventListener('click', initQuiz);

// Инициализация викторины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});