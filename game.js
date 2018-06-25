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

  seconds: 30,

  getRandomTrivia: function() {
    const randIndex = Math.floor(Math.random() * this.questionBank.length);
    const randTrivia = this.questionBank[randIndex];
    return randTrivia;
  },

  displayQuestion: (randTrivia) => {
    $('#question').text(randTrivia.question);
    for(let i = 0; i < randTrivia.answers.length; i++) {
      const answerChoice = $('<li>')
      $('#answers').append(answerChoice);
      $('#result').text(' ');
      answerChoice.addClass('answer-choice').attr('value', i).text(randTrivia.answers[i]);
    }
    //display timer
    $('#timer').text('0:30');
    trivia.seconds = 30;
    intervalId = setInterval(trivia.timer, 1000);  
  },

  pickAnswer: (randTrivia) => {
    $('body').one('click', 'li', function() {
      if ($(this).text() == randTrivia.rightAnswer) {
        $('#result').text('Correct!');
        trivia.getNewQuestion();
        clearInterval(intervalId);
      } else {
        $('#result').text('Wrong...')
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
    console.log(trivia.seconds)
    $('#timer').text('0:' + trivia.seconds);
    if(trivia.seconds === 0) {
      $('#timer').text('0:0' + trivia.seconds);
      trivia.timeIsUp();
    } else if(trivia.seconds < 10) {
      $('#timer').text('0:0' + trivia.seconds);
    }
  },

  timeIsUp: () => {
      $('#result').text('Time is up!')
      trivia.getNewQuestion();
      clearInterval(intervalId);
    }

}

$(document).ready(function() {
  let intervalId;
  let randTrivia = trivia.getRandomTrivia();
  
  trivia.displayQuestion(randTrivia);
  trivia.pickAnswer(randTrivia);

});
