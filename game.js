const trivia = {
  questionBank: [
    {
    question: 'Tom Hanks won an Oscar for which film in 1994?', 
    answers: ['A. Cast Away', 'B. Forest Gump', 'C. Joe vs. the Volcano', 'D. Sleepless in Seatle'],
    rightAnswer: 'B. Forest Gump'
    },
    {
      question: "The following film was based on Michael Crichton's best-selling novel", 
      answers: ['A. Titanic', 'B. Men in Black', 'C. Jurassic Park', 'D. The Lion King'],
      rightAnswer: 'C. Jurassic Park'

    },
    {
    question: 'Which film made extensive use of 3D film technology?', 
    answers: ['A. Avatar', 'B. Antz', 'C. Transformers (2007)', 'D. UP'],
    rightAnswer: 'A. Avatar'
    }
  ],

  seconds: 0,
  right: 0,
  wrong: 0,
  questionIndex: 0,

  getRandomTrivia: function() {
    const randTrivia = this.questionBank[this.questionIndex];
    this.questionIndex++
    console.log(randTrivia)
    return randTrivia;
  },

  displayQuestion: (randTrivia) => {
    if(trivia.questionIndex === 4) {
      trivia.gameOver();
    } else {
    $('.question-card').animate({ left: 0, opacity: 1 })
    $('#result').css('display', 'none')
    $('#question').text(randTrivia.question);
    for(let i = 0; i < randTrivia.answers.length; i++) {
      const answerChoice = $('<li>')
      $('#answers').append(answerChoice);
      answerChoice.addClass('answer-choice').attr('value', i).text(randTrivia.answers[i]);
    }
    //display timer
    $('#timer').text('0:20');
    trivia.seconds = 20;
    intervalId = setInterval(trivia.timer, 1000);
    }  
  },

  pickAnswer: (randTrivia) => {
    $('body').one('click', 'li', function() {
      if ($(this).text() == randTrivia.rightAnswer) {
        $('#result').text('Correct!').css('color', 'rgba(144, 237, 144, 0.9').fadeIn();
        trivia.removeCard();
        trivia.right++;
        $('#right').text(trivia.right);
        trivia.getNewQuestion();
        clearInterval(intervalId);
      } else {
        $('#result').text('Wrong...').css('color', 'rgba(255, 99, 71, 0.9)').fadeIn();
        trivia.removeCard();
        trivia.wrong++;
        $('#wrong').text(trivia.wrong);
        trivia.getNewQuestion();
        clearInterval(intervalId);
      }
    });
  },

  getNewQuestion: () => {
    const randTrivia = trivia.getRandomTrivia();  
      setTimeout(() => {
        $('.answer-choice').remove();
        trivia.displayQuestion(randTrivia);
        trivia.pickAnswer(randTrivia);
      }, 3000);
  },

  timer: () => {
    trivia.seconds--
    $('#timer').text('0:' + trivia.seconds);
    if(trivia.seconds === 0) {
      $('#timer').text('0:0' + trivia.seconds);
      trivia.timeIsUp();
    } else if(trivia.seconds < 10) {
      $('#timer').text('0:0' + trivia.seconds);
    }
  },

  timeIsUp: () => {
      $('#result').text('Time is up!').css('color', 'rgba(255, 99, 71, 0.9)').fadeIn();
      trivia.removeCard();
      trivia.wrong++;
      $('#wrong').text(trivia.wrong);
      clearInterval(intervalId);
  },

  removeCard: () => {
    $('.question-card').animate({ left: '150%', opacity: '0' }, 'slow');
  },

  gameOver: () => {
    $('#result').css({color: '#fff', fontSize: '28px', lineHeight: '42px'})
                .html(`<p style="margin-bottom: 26px;">You've completed Movie Trivia!</p> 
                       <p>Score: ${Math.round(trivia.right/trivia.questionBank.length * 100)} %</p>
                       <button id="restart">Restart</button>`)
    $('body').one('click', '#restart', function() {
      trivia.resetGame();
    })                   
  },

  resetGame: function () {
    this.right = 0;
    this.wrong = 0;
    this.questionIndex = 0;
    $('#right, #wrong').text('0');
    $('#result').css('fontSize', '42px');
    const randTrivia = this.getRandomTrivia();  
    this.displayQuestion(randTrivia);
    this.pickAnswer(randTrivia);
  },

}

$(document).ready(function() {
  let intervalId;
  let randTrivia = trivia.getRandomTrivia();
  
  trivia.displayQuestion(randTrivia);
  trivia.pickAnswer(randTrivia);
});
