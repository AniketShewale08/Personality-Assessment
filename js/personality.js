// Fetching data from the HTML page
const agreeButton = document.getElementById('agree');
const disagreeButton = document.getElementById('disagree');
const buttons = document.getElementsByClassName('dot');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const questionElement = document.getElementById('quest');
const resultElement = document.getElementById('result');
const showResultButton = document.getElementById('showResult');

// Questions are stored in an array of objects
const questions = [
    { number: 1, question: 'I prefer reading printed books than listening to audiobooks or podcasts.', agree: 0, disagree: 0 },
    { number: 2, question: 'I like to write or type my thoughts.', agree: 0, disagree: 0 },
    { number: 3, question: 'I like to try new things when I see them.', agree: 0, disagree: 0 },
    { number: 4, question: 'You can learn to be more intelligent.', agree: 0, disagree: 0 },
    { number: 5, question: 'I hate surprises. I prefer to learn before writing an exam.', agree: 0, disagree: 0 },
    { number: 6, question: 'I will never be good in some subjects.', agree: 0, disagree: 0 },
    { number: 7, question: 'If the party is cancelled, I will make plans with other people right away.', agree: 0, disagree: 0 },
    { number: 8, question: 'I prefer words to illustrations.', agree: 0, disagree: 0 },
    { number: 9, question: 'I don\'t really see why keeping a diary will be fun.', agree: 0, disagree: 0 },
    { number: 10, question: 'I always run out of time to finish my homework because I didn\'t start soon enough.', agree: 0, disagree: 0 }
];

let questionIndex = 0;

// Function to update the question and button colors
function updateQuestion() {
    const currentQuestion = questions[questionIndex];
    questionElement.innerHTML = `<b>${currentQuestion.number}. ${currentQuestion.question}</b>`;
    agreeButton.style.backgroundColor = 'gray';
    disagreeButton.style.backgroundColor = 'gray';
}

// ... (Rest of the code remains unchanged)


// Function to handle agree button click
function handleAgreeClick() {
    const currentQuestion = questions[questionIndex];
    currentQuestion.agree = 1;
    currentQuestion.disagree = 0;
    agreeButton.style.backgroundColor = 'blue';
    disagreeButton.style.backgroundColor = 'gray';
}

// Function to handle disagree button click
function handleDisagreeClick() {
    const currentQuestion = questions[questionIndex];
    currentQuestion.disagree = 1;
    currentQuestion.agree = 0;
    disagreeButton.style.backgroundColor = 'blue';
    agreeButton.style.backgroundColor = 'gray';
}

// Function to handle next button click
function handleNextClick() {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
    if (questionIndex >= questions.length - 1) {
        nextButton.disabled = true;
        prevButton.disabled = false;
    }
    updateQuestion();
}

// Function to handle previous button click
function handlePrevClick() {
    if (questionIndex > 0) {
        questionIndex--;
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
    if (questionIndex <= 0) {
        questionIndex = 0;
        prevButton.disabled = true;
        nextButton.disabled = false;
    }
    updateQuestion();
}

// Function to calculate and display the result
function showResult() {
    const learningCount = questions.slice(0, questions.length / 2).filter(q => q.agree === 1).length;
    const personalCount = questions.slice(questions.length / 2).filter(q => q.agree === 1).length;
    const totalQuestions = questions.length / 2;
    
    let learningPercentage = ((learningCount / totalQuestions) * 100).toFixed(2);
    let personalPercentage = ((personalCount / totalQuestions) * 100).toFixed(2);
    
    if (learningPercentage === '100.00' && personalPercentage === '100.00') {
        resultElement.innerHTML = 'The person has both Learning and Personal characteristics (100% each)';
    } else if (learningPercentage > personalPercentage) {
        const diff = learningPercentage - personalPercentage;
        if (diff > 100) {
            learningPercentage = '100.00';
            personalPercentage = '0.00';
        } else {
            learningPercentage = (100 - diff).toFixed(2);
            personalPercentage = diff.toFixed(2);
        }
        resultElement.innerHTML = `The person is Learning type (${learningPercentage}%) and Personal type (${personalPercentage}%)`;
    } else if (learningPercentage === personalPercentage) {
        resultElement.innerHTML = 'Neutral';
    } else {
        resultElement.innerHTML = `The person is Personal type (${personalPercentage}%)`;
    }
}



// Event listeners for button clicks
agreeButton.addEventListener('click', handleAgreeClick);
disagreeButton.addEventListener('click', handleDisagreeClick);
nextButton.addEventListener('click', handleNextClick);
prevButton.addEventListener('click', handlePrevClick);
showResultButton.addEventListener('click', showResult);

// Initial question update
updateQuestion();
