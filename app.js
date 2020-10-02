/***************EAGLES Quiz Application*************
 * 
 * Written by: Thomas Wallace
 * 
 * /**
 * 
 * 
 *
 * "ISSUES AND BUGS TO FIX!!"
 *            ----- Application runs very well and performs as expected, but i'd like to make it
 *                      look better and refactor with more efficient code.
 * 
 *        1. Button on last question screen is still a 'next question button. i'd like 
 *            it to be a 'See Results' button
 * 
 *        2. CSS can use some tweaking. Text and buttons very small on wider screens until media query is 
 *             hit at 600px
 *          
 *        3. I have multiple render functions, I'd like to only have one
 * 
 * 
 */
'use strict';

const store = {
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  // 5 or more questions are required
  questions: [{
    question: 'Who is the current QB of the Philadelphia Eagles?',
    answers: [
      'Donovan McNabb',
      'Carson Wentz',
      'Nick Foles',
      'Tom Brady'
    ],
    correctAnswer: 'Carson Wentz',
    imageLink: '<img src="images/carson.jpg">'

  },
  {
    question: 'Who did the Eagles beat in their only Super Bowl victory?',
    answers: [
      'Dallas Cowboys',
      'Pittsburgh Steelers',
      'New England Patriots',
      'Oakland Raiders'
    ],
    correctAnswer: 'New England Patriots',
    imageLink: '<img src="images/superbowl.jpg">',
  },
  {
    question: 'Who set an Eagles record by passing for 447 yards in one game?',
    answers: [
      'Randall Cunningham',
      'Carson Wentz',
      'Donovan McNabb',
      'Duce Staley'
    ],
    correctAnswer: 'Randall Cunningham',
    imageLink: '<img src="images/randall.jpg">',
  },
  {
    question: 'What former Eagle was the inspiration for the movie "Invincible"?',
    answers: [
      'Ricky Watters',
      'Reggie White',
      'Brian Dawkins',
      'Vince Papale'
    ],
    correctAnswer: 'Vince Papale',
    imageLink: '<img src="images/vince.jpg">'
  },
  {
    question: 'Where did Eagles great Donovan McNabb attend college?',
    answers: [
      'Penn State',
      'Syracuse',
      'Alabama',
      'Texas'
    ],
    correctAnswer: 'Syracuse',
    imageLink: '<img src="images/mcnabb.jpg">'
  },
  ],
};

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
function welcomeScreen() {
  const template =
    `<div class='welcome-img'><img src ="images/eagleslogo.jpg" alt="eagleslogo"></img></div>
    <div class='welcome-sect'>
      <h2 class='ready-header'>Do you think you bleed green??</h2>
      <div>
        <button class='readyButt yes-butt BUTTON_TWS'><span>Let's Go!!</span></button>
      </div>
    </div>`;
  return template;
}

function questionScreen(counter) {
  let currentQuestion = store.questions[counter].question;
  let questionArr = store.questions.length;
  const template =
    `<div class="question-container"> <h2 class="question-counter">Question #${counter + 1} out of ${questionArr}</h2>
      <h3 class="question-spot">${currentQuestion}</h3>
      <div class="whereAns">
      </div></div>`;
  return template;
}

function answerSection(counter) {
  const template = `
      <div class="answers-section">
        <form id="answers-form">
          ${store.questions[counter].answers
      .map(
        (answer) =>
          `<div class="answer"><label class="answer-selected"><input type="radio" class="answer-input" name="radio" value="${answer}" aria-pressed="false">${answer}</label></div>`
      )
      .join('')}
          <input type="submit" value="Submit" class="submit-button BUTTON_TWS">
        </form>
      </div>
      `;
  // const pressedBool = $('.answer-selected').attr('aria-pressed') === true;
  return template;
}

// results for right and wrong answer in two functions below
function rightAnswer() {
  // add to score for correct answer
  store.score += 1;
  const correctAnswer =
    `<div class="result-section">
    <h1>CORRECT!!</h1>
    <h2>FLY EAGLES FLY!!</h2>
    <div class="ques-result-image">${store.questions[store.questionNumber - 1].imageLink}</div>
    <h2>Your current score is ${store.score} out of ${store.questionNumber}!</h2>
    <button class="next-question-butt BUTTON_TWS"><span>Next Question</span></button>
  </div>
`;

  return correctAnswer;
}

function wrongAnswer() {
  console.log(store.questions)
  console.log(store.questionNumber)
  const wrongAnswer =
    `<div class="result-section">
    <h1>WRONG!!</h1>
    <h2>Correct answer is: ${store.questions[store.questionNumber - 1].correctAnswer}</h2>
    <div class="ques-result-image">${store.questions[store.questionNumber - 1].imageLink}</div>
    <h2>Your current score is ${store.score} out of ${store.questionNumber}!</h2>
    <button class="next-question-butt BUTTON_TWS"><span>Next Question</span></button>
  </div>`;

  return wrongAnswer;
}

function checkAnswer(correctinput) {
  let userAnswer = $('input[name="radio"]:checked').val();
  console.log('User Answer: ' + userAnswer);
  store.questionNumber += 1;
  if (userAnswer == correctinput) {
    return rightAnswer();
  } else {
    return wrongAnswer();
  }
}






function readyButtonPress() {
  $('.welcome-sect').on('click', '.readyButt', function () {
    console.log('Ready button');
    store.quizStarted = true;
    render();
  });
  $('.welcome-sect');
}

function subButt() {
  $('body').submit('#answers-form', function (event) {
    event.preventDefault();
    //console.log(store.questionNumber)
    let correctans = store.questions[store.questionNumber].correctAnswer;
    let userAnswer = $('input[name="radio"]:checked').val();
    console.log('Correct answer: ' + `${correctans}`);
    console.log('Submit button press');
    if (!userAnswer) {
      alert('Please select an answer');
    } else {
      renderResults()
    }
  });
}

function nextQuestionButton() {
  $('.result-section').on('click', '.next-question-butt', function () {
    console.log('Next question button');
    // if this question was the last question, next question button will take us to results screen
    if (store.questionNumber === store.questions.length) {
      console.log('question number is equal to total number of questions');
      renderEndPage();
    } else {
      store.quizStarted = true;
      render();
    }
  });
}

function endPage() {
  const endpage = `<div><img src ="images/bleedgreen.jpg" alt="bleedgreen"></img></div>
  <div class="end"><h2>End of quiz!!</h2>
  <h2>Your score is: ${store.score} out of ${store.questions.length}</h2></div><div><h1 class='flyeaglesfly'>FLY EAGLES FLY!!!</h1></div>
  <div class="end-page-button"><button class="restart-button BUTTON_TWS">Restart?</button></div>
  `;
  return endpage;
}

function restartButton() {
  $('.end-page-button').on('click', '.restart-button', function () {
    console.log('Restart Button Pressed!');
    store.quizStarted = true;
    store.questionNumber = 0;
    render();
  });
}
/********** RENDER FUNCTION(S) **********/
function render() {
  let page = '';
  if (store.quizStarted === false) {
    page += welcomeScreen();
  }
  if (store.quizStarted === true) {
    page += questionScreen(store.questionNumber) + answerSection(store.questionNumber);
  }
  $('main').html(page);
}

function renderResults() {
  let page = '';
  let correctans = store.questions[store.questionNumber].correctAnswer;
  page += checkAnswer(correctans);
  $('main').html(page);
  nextQuestionButton();
}

function renderEndPage() {
  let page = '';
  // sets page to endpage template
  page += endPage();
  $('main').html(page);
  // resets score
  store.score = 0
  // adds restart button
  restartButton();
}
// This function conditionally replaces the contents of the <main> tag based on the state of the store
/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
function main() {
  render();
  readyButtonPress();
  subButt();
  nextQuestionButton();
}
$(main);