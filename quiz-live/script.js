// QuizPro Application - Complete JavaScript Code

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const loadingScreen = document.getElementById('loading-screen');
const categoriesContainer = document.getElementById('categories-container');
const startQuizBtn = document.getElementById('start-quiz');
const quickStartBtn = document.getElementById('quick-start');
const currentCategoryElement = document.getElementById('current-category');
const timeLeftElement = document.getElementById('time-left');
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const questionNumber = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const questionPoints = document.getElementById('question-points');
const optionsContainer = document.getElementById('options-container');
const nextQuestionBtn = document.getElementById('next-question');
const submitQuizBtn = document.getElementById('submit-quiz');
const quitQuizBtn = document.getElementById('quit-quiz');
const highScoreValueElement = document.getElementById('high-score-value');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');
const finalScoreElement = document.getElementById('final-score');
const percentageElement = document.getElementById('percentage');
const accuracyRate = document.getElementById('accuracy-rate');
const averageTime = document.getElementById('average-time');
const rankElement = document.getElementById('rank');
const resultsListElement = document.getElementById('results-list');
const retryQuizBtn = document.getElementById('retry-quiz');
const reviewQuizBtn = document.getElementById('review-quiz');
const newQuizBtn = document.getElementById('new-quiz');
const resultTitleElement = document.getElementById('result-title');
const resultMessageElement = document.getElementById('result-message');
const resultIconElement = document.getElementById('result-icon');
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const questionCountSlider = document.getElementById('question-count');
const questionCountValue = document.getElementById('question-count-value');
const difficultySelect = document.getElementById('difficulty');
const timePerQuestionSlider = document.getElementById('time-per-question');
const timePerQuestionValue = document.getElementById('time-per-question-value');
const applySettingsBtn = document.getElementById('apply-settings');
const difficultyBadge = document.getElementById('difficulty-badge');
const selectedCategoryInfo = document.getElementById('selected-category-info');
const totalPlayersElement = document.getElementById('total-players');
const hintBtn = document.getElementById('hint-btn');
const hintModal = document.getElementById('hint-modal');
const hintText = document.getElementById('hint-text');
const reviewModal = document.getElementById('review-modal');
const reviewContent = document.getElementById('review-content');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const loadingQuestions = document.getElementById('loading-questions');
const loadingTime = document.getElementById('loading-time');

// Quiz State Variables
let quizData = {
    category: null,
    categoryName: '',
    difficulty: 'medium',
    timePerQuestion: 30,
    totalQuestions: 10,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    timeLeft: 30,
    timerProgress: null,
    userAnswers: [],
    selectedOption: null,
    correctAnswers: 0,
    wrongAnswers: 0,
    startTime: null,
    answerTimes: [],
    settings: {
        questionCount: 10,
        difficulty: 'medium',
        timePerQuestion: 30
    }
};

// Quiz Categories with question counts
const quizCategories = [
    { id: 9, name: "General Knowledge", icon: "fas fa-globe", description: "Test your general knowledge", questionCount: 1000 },
    { id: 10, name: "Books", icon: "fas fa-book", description: "Literature and authors", questionCount: 300 },
    { id: 11, name: "Film", icon: "fas fa-film", description: "Movies and cinema", questionCount: 500 },
    { id: 12, name: "Music", icon: "fas fa-music", description: "Music genres and artists", questionCount: 600 },
    { id: 13, name: "Musicals & Theatres", icon: "fas fa-theater-masks", description: "Stage performances", questionCount: 150 },
    { id: 14, name: "Television", icon: "fas fa-tv", description: "TV shows and series", questionCount: 400 },
    { id: 15, name: "Video Games", icon: "fas fa-gamepad", description: "Gaming world", questionCount: 450 },
    { id: 16, name: "Board Games", icon: "fas fa-chess-board", description: "Tabletop games", questionCount: 200 },
    { id: 17, icon: "fas fa-science", name: "Science & Nature", description: "Science and nature facts", questionCount: 700 },
    { id: 18, icon: "fas fa-desktop", name: "Computers", description: "Technology and computing", questionCount: 400 },
    { id: 19, icon: "fas fa-calculator", name: "Mathematics", description: "Numbers and calculations", questionCount: 350 },
    { id: 20, icon: "fas fa-monument", name: "Mythology", description: "Myths and legends", questionCount: 250 },
    { id: 21, icon: "fas fa-futbol", name: "Sports", description: "Sports and athletes", questionCount: 500 },
    { id: 22, icon: "fas fa-map-marked-alt", name: "Geography", description: "Countries and places", questionCount: 600 },
    { id: 23, icon: "fas fa-history", name: "History", description: "Historical events", questionCount: 550 },
    { id: 24, icon: "fas fa-briefcase", name: "Politics", description: "Government and politics", questionCount: 300 },
    { id: 25, icon: "fas fa-palette", name: "Art", description: "Art and artists", questionCount: 280 },
    { id: 26, icon: "fas fa-plane", name: "Celebrities", description: "Famous personalities", questionCount: 200 },
    { id: 27, icon: "fas fa-robot", name: "Animals", description: "Animal kingdom", questionCount: 400 },
    { id: 28, icon: "fas fa-car", name: "Vehicles", description: "Cars and transportation", questionCount: 180 }
];

// Initialize the application
function initApp() {
    console.log('QuizPro initialized');
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load high score from localStorage
    loadHighScore();
    
    // Load settings from localStorage
    loadSettings();
    
    // Update settings UI
    updateSettingsUI();
    
    // Render categories
    renderCategories();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initially disable start button
    startQuizBtn.disabled = true;
    
    // Update total players (simulated)
    updateTotalPlayers();
    
    console.log('App initialized successfully');
}

// Load high score from localStorage
function loadHighScore() {
    const highScore = localStorage.getItem('quizProHighScore') || 0;
    highScoreValueElement.textContent = highScore;
    console.log('High score loaded:', highScore);
}

// Save high score to localStorage
function saveHighScore(score) {
    const currentHighScore = parseInt(localStorage.getItem('quizProHighScore') || 0);
    if (score > currentHighScore) {
        localStorage.setItem('quizProHighScore', score);
        highScoreValueElement.textContent = score;
        showNotification('🎉 New High Score! You set a new record!');
        console.log('New high score saved:', score);
    }
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('quizProSettings');
    if (savedSettings) {
        quizData.settings = JSON.parse(savedSettings);
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('quizProSettings', JSON.stringify(quizData.settings));
}

// Update settings UI
function updateSettingsUI() {
    questionCountSlider.value = quizData.settings.questionCount;
    questionCountValue.textContent = quizData.settings.questionCount;
    difficultySelect.value = quizData.settings.difficulty;
    timePerQuestionSlider.value = quizData.settings.timePerQuestion;
    timePerQuestionValue.textContent = quizData.settings.timePerQuestion + 's';
}

// Update total players (simulated)
function updateTotalPlayers() {
    const storedPlayers = localStorage.getItem('quizProTotalPlayers') || '1000';
    let players = parseInt(storedPlayers);
    // Simulate player growth
    players += Math.floor(Math.random() * 10);
    localStorage.setItem('quizProTotalPlayers', players);
    totalPlayersElement.textContent = players.toLocaleString() + '+';
}

// Render quiz categories
function renderCategories() {
    console.log('Rendering categories...');
    categoriesContainer.innerHTML = '';
    
    quizCategories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.dataset.id = category.id;
        
        categoryCard.innerHTML = `
            <i class="${category.icon}"></i>
            <h4>${category.name}</h4>
            <p>${category.description}</p>
            <div class="question-count">${category.questionCount}</div>
        `;
        
        categoryCard.addEventListener('click', function() {
            console.log('Category clicked:', category.name);
            selectCategory(category.id, category.name, this);
        });
        
        categoriesContainer.appendChild(categoryCard);
    });
    console.log('Categories rendered successfully');
}

// Select a quiz category
function selectCategory(id, name, cardElement) {
    console.log('Selecting category:', name, 'ID:', id);
    
    // Remove active class from all category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected category
    cardElement.classList.add('active');
    
    // Set quiz category
    quizData.category = id;
    quizData.categoryName = name;
    
    // Update selected category info
    selectedCategoryInfo.textContent = name;
    
    // Enable start button
    startQuizBtn.disabled = false;
    startQuizBtn.style.opacity = '1';
    startQuizBtn.style.cursor = 'pointer';
    
    console.log('Category selected. Start button enabled.');
}

// Quick start - random category
function quickStart() {
    console.log('Quick start initiated');
    
    // Get random category
    const randomIndex = Math.floor(Math.random() * quizCategories.length);
    const randomCategory = quizCategories[randomIndex];
    
    // Find and click the category card
    const categoryCard = document.querySelector(`.category-card[data-id="${randomCategory.id}"]`);
    if (categoryCard) {
        selectCategory(randomCategory.id, randomCategory.name, categoryCard);
        
        // Start quiz after a short delay
        setTimeout(() => {
            fetchQuizQuestions();
        }, 500);
        
        showNotification('🎲 Random category selected: ' + randomCategory.name);
    }
}

// Fetch quiz questions from OpenTDB API
async function fetchQuizQuestions() {
    console.log('Fetching questions for category:', quizData.category);
    console.log('Settings:', quizData.settings);
    
    // Update loading screen info
    loadingQuestions.textContent = quizData.settings.questionCount;
    loadingTime.textContent = quizData.settings.timePerQuestion;
    
    showLoadingScreen();
    
    try {
        const apiUrl = `https://opentdb.com/api.php?amount=${quizData.settings.questionCount}&category=${quizData.category}&difficulty=${quizData.settings.difficulty}&type=multiple`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quiz questions');
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.response_code !== 0) {
            throw new Error('Failed to load quiz questions. Please try again.');
        }
        
        // Process and randomize questions
        quizData.questions = data.results.map(question => {
            // Decode HTML entities in question and answers
            const parser = new DOMParser();
            const decodedQuestion = parser.parseFromString(question.question, 'text/html').body.textContent;
            
            // Combine correct and incorrect answers
            const allAnswers = [
                ...question.incorrect_answers.map(answer => 
                    parser.parseFromString(answer, 'text/html').body.textContent
                ),
                parser.parseFromString(question.correct_answer, 'text/html').body.textContent
            ];
            
            // Shuffle answers
            const shuffledAnswers = shuffleArray([...allAnswers]);
            
            return {
                question: decodedQuestion,
                correctAnswer: parser.parseFromString(question.correct_answer, 'text/html').body.textContent,
                answers: shuffledAnswers,
                difficulty: question.difficulty
            };
        });
        
        // Reset quiz state
        quizData.currentQuestionIndex = 0;
        quizData.score = 0;
        quizData.userAnswers = [];
        quizData.correctAnswers = 0;
        quizData.wrongAnswers = 0;
        quizData.answerTimes = [];
        quizData.startTime = Date.now();
        
        // Set quiz parameters
        quizData.difficulty = quizData.settings.difficulty;
        quizData.timePerQuestion = quizData.settings.timePerQuestion;
        quizData.totalQuestions = quizData.settings.questionCount;
        
        console.log('Questions loaded successfully:', quizData.questions.length);
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            hideLoadingScreen();
            startQuiz();
        }, 1500);
        
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        hideLoadingScreen();
        showNotification('❌ ' + error.message);
    }
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Start the quiz
function startQuiz() {
    console.log('Starting quiz...');
    
    // Set current category name
    currentCategoryElement.textContent = quizData.categoryName;
    
    // Set difficulty badge
    difficultyBadge.innerHTML = `<i class="fas fa-chart-line"></i><span>${quizData.difficulty.charAt(0).toUpperCase() + quizData.difficulty.slice(1)}</span>`;
    
    // Set total questions
    totalQuestionsElement.textContent = quizData.totalQuestions;
    
    // Switch to quiz screen with animation
    switchScreen('quiz-screen');
    
    // Load the first question
    loadQuestion();
    
    console.log('Quiz started successfully');
}

// Load a question
function loadQuestion() {
    console.log('Loading question:', quizData.currentQuestionIndex + 1);
    
    // Reset selected option
    quizData.selectedOption = null;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Get current question
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    
    // Update question text
    questionTextElement.textContent = currentQuestion.question;
    
    // Update question number
    questionNumber.textContent = quizData.currentQuestionIndex + 1;
    currentQuestionElement.textContent = quizData.currentQuestionIndex + 1;
    
    // Update progress bar and percentage
    const progress = ((quizData.currentQuestionIndex + 1) / quizData.totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    
    // Update question points based on difficulty
    let points = 10;
    if (quizData.difficulty === 'hard') points = 15;
    if (quizData.difficulty === 'easy') points = 5;
    questionPoints.textContent = points;
    
    // Create answer options
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    currentQuestion.answers.forEach((answer, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.index = index;
        
        optionElement.innerHTML = `
            <div class="option-letter">${optionLetters[index]}</div>
            <div class="option-text">${answer}</div>
        `;
        
        optionElement.addEventListener('click', function() {
            console.log('Option clicked:', answer);
            selectOption(this, index, answer);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update button states
    nextQuestionBtn.disabled = true;
    submitQuizBtn.disabled = true;
    
    // Enable submit button if we're on the last question
    if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
        submitQuizBtn.disabled = false;
        nextQuestionBtn.style.display = 'none';
    } else {
        nextQuestionBtn.style.display = 'flex';
    }
    
    // Start the timer
    startTimer();
    
    // Record start time for this question
    quizData.currentQuestionStartTime = Date.now();
    
    console.log('Question loaded successfully');
}

// Select an answer option
function selectOption(optionElement, index, answer) {
    console.log('Selecting option:', index, answer);
    
    // Clear previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark selected option
    optionElement.classList.add('selected');
    quizData.selectedOption = { index, answer };
    
    // Enable next button
    nextQuestionBtn.disabled = false;
    
    // Calculate time taken for this question
    const timeTaken = Math.round((Date.now() - quizData.currentQuestionStartTime) / 1000);
    quizData.answerTimes.push(timeTaken);
    
    console.log('Option selected. Next button enabled. Time taken:', timeTaken + 's');
}

// Start the timer for current question
function startTimer() {
    console.log('Timer started');
    
    // Reset timer
    clearInterval(quizData.timer);
    clearInterval(quizData.timerProgress);
    
    quizData.timeLeft = quizData.timePerQuestion;
    timeLeftElement.textContent = quizData.timeLeft;
    
    // Reset timer progress circle
    const timerCircle = document.querySelector('.timer-circle-progress');
    const circumference = 2 * Math.PI * 27;
    const offset = circumference - (0 / quizData.timePerQuestion) * circumference;
    timerCircle.style.strokeDashoffset = offset;
    
    // Start countdown
    quizData.timer = setInterval(() => {
        quizData.timeLeft--;
        timeLeftElement.textContent = quizData.timeLeft;
        
        // Update progress circle
        const progress = ((quizData.timePerQuestion - quizData.timeLeft) / quizData.timePerQuestion) * circumference;
        timerCircle.style.strokeDashoffset = circumference - progress;
        
        // Change color when time is running out
        if (quizData.timeLeft <= 10) {
            timeLeftElement.style.color = '#ef4444';
            timerCircle.style.stroke = '#ef4444';
        }
        
        // Time's up
        if (quizData.timeLeft <= 0) {
            clearInterval(quizData.timer);
            console.log('Time is up!');
            handleTimeout();
        }
    }, 1000);
}

// Handle timeout (user didn't answer in time)
function handleTimeout() {
    console.log('Handling timeout for question:', quizData.currentQuestionIndex + 1);
    
    // Record timeout
    quizData.answerTimes.push(quizData.timePerQuestion);
    
    // Mark as wrong answer
    quizData.userAnswers.push({
        questionIndex: quizData.currentQuestionIndex,
        selectedAnswer: null,
        correctAnswer: quizData.questions[quizData.currentQuestionIndex].correctAnswer,
        isCorrect: false,
        timedOut: true,
        timeTaken: quizData.timePerQuestion
    });
    
    // Move to next question or finish quiz
    nextQuestionOrFinish();
}

// Move to next question or finish quiz
function nextQuestionOrFinish() {
    console.log('Moving to next question or finishing...');
    
    // If user selected an option, check if it's correct
    if (quizData.selectedOption !== null) {
        const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
        const isCorrect = quizData.selectedOption.answer === currentQuestion.correctAnswer;
        
        console.log('Answer is correct?', isCorrect);
        
        // Calculate points based on difficulty and time taken
        const timeTaken = quizData.answerTimes[quizData.answerTimes.length - 1];
        let points = 10;
        if (quizData.difficulty === 'hard') points = 15;
        if (quizData.difficulty === 'easy') points = 5;
        
        // Bonus points for quick answers
        if (timeTaken < 5 && isCorrect) {
            points += 5;
        }
        
        // Store user answer
        quizData.userAnswers.push({
            questionIndex: quizData.currentQuestionIndex,
            selectedAnswer: quizData.selectedOption.answer,
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect: isCorrect,
            timedOut: false,
            timeTaken: timeTaken,
            pointsEarned: isCorrect ? points : 0
        });
        
        // Update score
        if (isCorrect) {
            quizData.score += points;
            quizData.correctAnswers++;
            console.log('Correct! Score:', quizData.score, 'Points:', points);
        } else {
            quizData.wrongAnswers++;
            console.log('Wrong!');
        }
    } else {
        // No answer selected (timeout)
        quizData.wrongAnswers++;
        console.log('No answer selected (timeout)');
    }
    
    // Check if there are more questions
    if (quizData.currentQuestionIndex < quizData.questions.length - 1) {
        quizData.currentQuestionIndex++;
        console.log('Moving to next question:', quizData.currentQuestionIndex + 1);
        loadQuestion();
    } else {
        console.log('Quiz finished. Final score:', quizData.score);
        finishQuiz();
    }
}

// Finish the quiz and show results
function finishQuiz() {
    console.log('Finishing quiz...');
    
    // Clear the timer
    clearInterval(quizData.timer);
    clearInterval(quizData.timerProgress);
    
    // Calculate statistics
    const percentage = Math.round((quizData.correctAnswers / quizData.questions.length) * 100);
    const averageTimeTaken = Math.round(quizData.answerTimes.reduce((a, b) => a + b, 0) / quizData.answerTimes.length);
    const accuracy = Math.round((quizData.correctAnswers / quizData.questions.length) * 100);
    
    // Determine rank
    let rank = 'Beginner';
    if (percentage >= 90) rank = 'Expert';
    else if (percentage >= 75) rank = 'Advanced';
    else if (percentage >= 60) rank = 'Intermediate';
    else if (percentage >= 40) rank = 'Novice';
    
    // Update result screen
    correctCountElement.textContent = quizData.correctAnswers;
    wrongCountElement.textContent = quizData.wrongAnswers;
    finalScoreElement.textContent = quizData.score;
    percentageElement.textContent = `${percentage}%`;
    accuracyRate.textContent = `${accuracy}%`;
    averageTime.textContent = `${averageTimeTaken}s`;
    rankElement.textContent = rank;
    
    // Update progress circle
    const scoreCircle = document.querySelector('.score-circle-progress');
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 500);
    
    // Set result title and message based on performance
    if (percentage >= 90) {
        resultTitleElement.textContent = "Outstanding! 🎉";
        resultMessageElement.textContent = "You're a true quiz master! Exceptional performance!";
        resultIconElement.innerHTML = '<i class="fas fa-crown"></i>';
        resultIconElement.style.background = "linear-gradient(135deg, #FFD700, #FFA500)";
        createConfetti();
    } else if (percentage >= 75) {
        resultTitleElement.textContent = "Excellent Work! 👍";
        resultMessageElement.textContent = "You've demonstrated great knowledge! Keep it up!";
        resultIconElement.innerHTML = '<i class="fas fa-medal"></i>';
        resultIconElement.style.background = "linear-gradient(135deg, #C0C0C0, #A9A9A9)";
        createConfetti();
    } else if (percentage >= 60) {
        resultTitleElement.textContent = "Good Job! 👏";
        resultMessageElement.textContent = "You did well! With a bit more practice, you'll excel!";
        resultIconElement.innerHTML = '<i class="fas fa-star"></i>';
    } else if (percentage >= 40) {
        resultTitleElement.textContent = "Keep Practicing! 💪";
        resultMessageElement.textContent = "You're on the right track! Review the answers to improve!";
        resultIconElement.innerHTML = '<i class="fas fa-redo"></i>';
    } else {
        resultTitleElement.textContent = "Try Again! 📚";
        resultMessageElement.textContent = "Don't give up! Review the material and try again!";
        resultIconElement.innerHTML = '<i class="fas fa-book"></i>';
    }
    
    // Render detailed results
    renderDetailedResults();
    
    // Save high score if applicable
    saveHighScore(quizData.score);
    
    // Save quiz attempt to history
    saveQuizHistory(percentage);
    
    // Switch to result screen
    switchScreen('result-screen');
    console.log('Result screen shown');
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'absolute';
        confetti.style.top = '-20px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        
        confettiContainer.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Save quiz history
function saveQuizHistory(percentage) {
    const history = JSON.parse(localStorage.getItem('quizProHistory') || '[]');
    history.unshift({
        date: new Date().toISOString(),
        category: quizData.categoryName,
        score: quizData.score,
        percentage: percentage,
        correct: quizData.correctAnswers,
        total: quizData.totalQuestions
    });
    
    // Keep only last 10 attempts
    if (history.length > 10) history.pop();
    
    localStorage.setItem('quizProHistory', JSON.stringify(history));
}

// Render detailed results
function renderDetailedResults() {
    console.log('Rendering detailed results...');
    resultsListElement.innerHTML = '';
    
    quizData.userAnswers.forEach((userAnswer, index) => {
        const question = quizData.questions[index].question;
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${userAnswer.isCorrect ? 'correct' : 'wrong'}`;
        
        let answerStatus = '';
        if (userAnswer.timedOut) {
            answerStatus = '<span class="your-answer wrong">Timed Out</span>';
        } else if (userAnswer.isCorrect) {
            answerStatus = `<span class="your-answer correct">Your Answer: ${userAnswer.selectedAnswer}</span>`;
        } else {
            answerStatus = `<span class="your-answer wrong">Your Answer: ${userAnswer.selectedAnswer}</span>`;
        }
        
        resultItem.innerHTML = `
            <div class="result-question">${index + 1}. ${question}</div>
            <div class="result-answer">
                ${answerStatus}
                <span class="correct-answer">Correct: ${userAnswer.correctAnswer}</span>
                ${userAnswer.pointsEarned ? `<span class="points-earned">+${userAnswer.pointsEarned} pts</span>` : ''}
                ${userAnswer.timeTaken ? `<span class="time-taken">${userAnswer.timeTaken}s</span>` : ''}
            </div>
        `;
        
        resultsListElement.appendChild(resultItem);
    });
    console.log('Detailed results rendered');
}

// Render review content
function renderReviewContent() {
    reviewContent.innerHTML = '';
    
    quizData.userAnswers.forEach((userAnswer, index) => {
        const question = quizData.questions[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <h4>Question ${index + 1}</h4>
            <p class="review-question">${question.question}</p>
            <div class="review-answers">
                <div class="review-answer ${userAnswer.selectedAnswer === question.correctAnswer ? 'correct' : ''}">
                    <strong>Your Answer:</strong> ${userAnswer.selectedAnswer || 'No answer'}
                    ${userAnswer.isCorrect ? ' ✅' : ' ❌'}
                </div>
                <div class="review-answer correct">
                    <strong>Correct Answer:</strong> ${question.correctAnswer}
                </div>
            </div>
            <div class="review-stats">
                <span>Time: ${userAnswer.timeTaken || quizData.timePerQuestion}s</span>
                <span>Points: ${userAnswer.pointsEarned || 0}</span>
            </div>
            <hr>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

// Switch between screens
function switchScreen(screenId) {
    console.log('Switching to screen:', screenId);
    
    // Hide all screens
    welcomeScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    
    // Remove animation classes
    welcomeScreen.classList.remove('animate__fadeIn');
    quizScreen.classList.remove('animate__fadeIn');
    resultScreen.classList.remove('animate__fadeIn');
    
    // Show selected screen with animation
    const targetScreen = document.getElementById(screenId);
    targetScreen.classList.add('active');
    targetScreen.classList.add('animate__fadeIn');
}

// Show loading screen
function showLoadingScreen() {
    console.log('Showing loading screen');
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.add('animate__fadeIn');
}

// Hide loading screen
function hideLoadingScreen() {
    console.log('Hiding loading screen');
    loadingScreen.style.display = 'none';
}

// Show notification
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Show modal
function showModal(modal) {
    modal.classList.add('active');
}

// Hide modal
function hideModal(modal) {
    modal.classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Start quiz button
    startQuizBtn.addEventListener('click', function() {
        console.log('Start Quiz button clicked');
        fetchQuizQuestions();
    });
    
    // Quick start button
    quickStartBtn.addEventListener('click', function() {
        console.log('Quick Start button clicked');
        quickStart();
    });
    
    // Next question button
    nextQuestionBtn.addEventListener('click', function() {
        console.log('Next Question button clicked');
        nextQuestionOrFinish();
    });
    
    // Submit quiz button
    submitQuizBtn.addEventListener('click', function() {
        console.log('Submit Quiz button clicked');
        finishQuiz();
    });
    
    // Quit quiz button
    quitQuizBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
            switchScreen('welcome-screen');
            startQuizBtn.disabled = true;
            selectedCategoryInfo.textContent = 'None selected';
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });
        }
    });
    
    // Retry quiz button
    retryQuizBtn.addEventListener('click', function() {
        console.log('Retry Quiz button clicked');
        fetchQuizQuestions();
    });
    
    // Review quiz button
    reviewQuizBtn.addEventListener('click', function() {
        console.log('Review Quiz button clicked');
        renderReviewContent();
        showModal(reviewModal);
    });
    
    // New quiz button
    newQuizBtn.addEventListener('click', function() {
        console.log('New Quiz button clicked');
        switchScreen('welcome-screen');
        startQuizBtn.disabled = true;
        selectedCategoryInfo.textContent = 'None selected';
        
        // Clear active category
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('active');
        });
    });
    
    // Settings toggle
    settingsToggle.addEventListener('click', function() {
        settingsPanel.classList.toggle('active');
    });
    
    // Close settings
    closeSettings.addEventListener('click', function() {
        settingsPanel.classList.remove('active');
    });
    
    // Settings sliders
    questionCountSlider.addEventListener('input', function() {
        questionCountValue.textContent = this.value;
    });
    
    timePerQuestionSlider.addEventListener('input', function() {
        timePerQuestionValue.textContent = this.value + 's';
    });
    
    // Apply settings
    applySettingsBtn.addEventListener('click', function() {
        quizData.settings.questionCount = parseInt(questionCountSlider.value);
        quizData.settings.difficulty = difficultySelect.value;
        quizData.settings.timePerQuestion = parseInt(timePerQuestionSlider.value);
        
        saveSettings();
        settingsPanel.classList.remove('active');
        showNotification('✅ Settings saved successfully!');
        
        console.log('Settings applied:', quizData.settings);
    });
    
    // Hint button
    hintBtn.addEventListener('click', function() {
        if (quizData.currentQuestionIndex < quizData.questions.length) {
            const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
            const correctAnswer = currentQuestion.correctAnswer;
            
            // Create a hint (remove one wrong answer)
            const wrongAnswers = currentQuestion.answers.filter(answer => answer !== correctAnswer);
            const hint = `One of these answers is definitely wrong: ${wrongAnswers[0]}`;
            
            hintText.textContent = hint;
            showModal(hintModal);
        }
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this);
            }
        });
    });
    
    // Download results
    document.getElementById('download-results').addEventListener('click', function() {
        const results = {
            category: quizData.categoryName,
            score: quizData.score,
            percentage: Math.round((quizData.correctAnswers / quizData.questions.length) * 100),
            correct: quizData.correctAnswers,
            wrong: quizData.wrongAnswers,
            total: quizData.totalQuestions,
            date: new Date().toLocaleString()
        };
        
        const dataStr = JSON.stringify(results, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `quizpro-results-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showNotification('📥 Results downloaded successfully!');
    });
    
    // Share results
    document.getElementById('share-results').addEventListener('click', function() {
        const shareText = `I scored ${quizData.score} points (${quizData.correctAnswers}/${quizData.totalQuestions} correct) on QuizPro! Try it out!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My QuizPro Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('📋 Results copied to clipboard!');
            });
        }
    });
    
    // Close settings when clicking outside
    document.addEventListener('click', function(e) {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });
    
    console.log('Event listeners set up successfully');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    initApp();
});

// Fallback initialization
window.onload = function() {
    console.log('Window loaded');
    if (typeof initApp === 'function') {
        initApp();
    }
};