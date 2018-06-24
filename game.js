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

  getRandomTrivia: function() {
    const randIndex = Math.round(Math.random() * this.questionBank.length);
    const randTrivia = this.questionBank[randIndex];
    return randTrivia;
  },

  displayQuestion: (randTrivia) => {
    $('#question').text(randTrivia.question);
    for(let i = 0; i < randTrivia.answers.length; i++) {
      const answerChoice = $('<li>')
      $('#answers').append(answerChoice)
      answerChoice.addClass('answer-choice').attr('value', i).text(randTrivia.answers[i]);
    }  
  },

  pickAnswer: (randTrivia) => {
    $('body').on('click', 'li', function() {
      if ($(this).text() == randTrivia.rightAnswer) {
        $('#result').text('Correct!')
        result = true;
      } else {
        $('#result').text('Wrong...')
      }
    });
  }
}

$(document).ready(function() {

  let randTrivia = trivia.getRandomTrivia();
  trivia.displayQuestion(randTrivia);
  trivia.pickAnswer(randTrivia);

});
