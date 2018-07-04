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

  intervalId: null,
  seconds: 10,
  right: 0,
  wrong: 0,
  questionIndex: 0,

  getRandomTrivia: function() {
    const randTrivia = this.questionBank[this.questionIndex];
    this.questionIndex++
    return randTrivia;
  },

  getNewQuestion: () => {
    $('.answer-choice').remove();
    const randTrivia = trivia.getRandomTrivia();
    $('#question').text(randTrivia.question);
    console.log(randTrivia)
    for(let i = 0; i < randTrivia.answers.length; i++) {
      const answerChoice = $('<li>')
      $('#answers').append(answerChoice);
      answerChoice.addClass('answer-choice').text(randTrivia.answers[i]);
    }
    trivia.runTimer();
  },

  handleClickAnswer: (randTrivia) => {
    $('#answers').on('click', 'li', function() {
      trivia.getNewQuestion()
      if ($(this).text() === randTrivia.rightAnswer) {
        $('#result').text('Correct!')
      } else {
        $('#result').text('Wrong!')
      }  
    });
  },

  timer: () => {
    trivia.seconds--
    $('#timer').text('0:' + trivia.seconds);
    if(trivia.seconds === 0) {
      trivia.stopTimer();
      trivia.seconds = 10;
      $('#timer').text('0:0' + trivia.seconds);
      $('#result').text('Time is up')
    }
  },

  runTimer: () => {
    clearInterval(trivia.intervalId)
    trivia.intervalId = setInterval(trivia.timer, 1000)
  },

  stopTimer: () => {
    clearInterval(trivia.intervalId)
  },

  removeCard: () => {
    $('.question-card').animate({ left: '150%', top: '-=400px', opacity: '0' }, 'slow');
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
  }

}

$(document).ready(function() {
  trivia.handleClickAnswer();
  trivia.getNewQuestion();
});
