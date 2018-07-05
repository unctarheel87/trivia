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
    },
    {
    question: 'With twelve Oscar nominations and three wins, who is the most nominated male actor in Academy Awards history?',  
    answers: ['A. Marlon Brando', 'B. Brad Pitt', 'C. Robert De Niro', 'D. Jack Nicholson'],
    rightAnswer: 'D. Jack Nicholson'
    },
    {
    question: 'Which actor played a FedEX employee that became marooned on an island in the 2000 drama film Cast Away?',  
    answers: ['A. Harrison Ford', 'B. Edward Norton', 'C. Tom Hanks', 'D. Pierce Bronsman'],
    rightAnswer: 'C. Tom Hanks'
    },
    {
    question: 'Who played the female lead in the dystopian political thriller “V for Vendetta”?',  
    answers: ['A. Natalie Portman', 'B. Demi Moore', 'C. Catherine Zeta-Jones', 'D. Scarlett Johansson'],
    rightAnswer: 'A. Natalie Portman'
    },
    {
    question: 'Who played the female lead role in the 1986 sci-fi movie “Aliens”?',  
    answers: ['A. Lea Thompson', 'B. Winona Ryder', 'C. Sigourney Weaver', 'D. Meryl Streep'],
    rightAnswer: 'C. Sigourney Weaver'
    },
    {
    question: 'What sunglasses did Tom Cruise wear in the 1986 movie “Top Gun”?',  
    answers: ['A. Armani Exchange', 'B. Ray Ban Aviator', 'C. Ray Ban Wayfarer', 'D. Oakley Conductor'],
    rightAnswer: 'B. Ray Ban Aviator'
    },
    {
    question: 'Robin Williams won an Academy Award for best supporting actor in which 1997 film about a South Boston janitor?',  
    answers: ['A. The Town', 'B. Dead Poets Society', 'C. As Good as it Gets', 'D. Good Will Hunting'],
    rightAnswer: 'D. Good Will Hunting'
    },
    {
    question: 'Superman is a fictional superhero from what fictional planet?',  
    answers: ['A. Krypton', 'B. Kal-El', 'C. Thoron', 'D. Rokyn'],
    rightAnswer: 'A. Krypton'
    },
  ],
  
  intervalId: null,
  seconds: 20,
  right: 0,
  wrong: 0,
  questionIndex: 0,

  getNextTrivia: function() {
    const nextTrivia = this.questionBank[this.questionIndex];
    this.questionIndex++
    return nextTrivia;
  },

  setTimer: () => {
    trivia.seconds = 20;
    $('#timer').text('0:20');
    trivia.intervalId = setInterval(trivia.timer, 1000);
  },

  stopTimer: () => {
    clearInterval(trivia.intervalId)
  },

  getNewQuestion: () => {
    $('.answer-choice').remove();
    const nextTrivia = trivia.getNextTrivia();
    if(!nextTrivia) {
      trivia.gameOver();
    } else {
      $('.question-card').animate({ left: 0, top: 0, opacity: 1 });
      $('#result').css('display', 'none');
      $('#question').text(nextTrivia.question);
      for(let i = 0; i < nextTrivia.answers.length; i++) {
        const answerChoice = $('<li>')
        $('#answers').append(answerChoice);
        answerChoice.addClass('answer-choice').text(nextTrivia.answers[i]);
      }
      trivia.setTimer();
    }  
  },

  setQuestionTimeOut: () => {
    setTimeout(trivia.getNewQuestion, 3000);
  },

  handleClickAnswer: () => {
    $('#answers').on('click', 'li', function() {
      if ($(this).text() === trivia.questionBank[trivia.questionIndex - 1].rightAnswer) {
        $('#result').css('color', 'rgba(144, 237, 144, 0.9')
                    .html('<iframe src="https://78.media.tumblr.com/616fc86dfc24f4b5a0c8524f19e27ea4/tumblr_nrc7tcjyW21rzarwio1_540.gif" width="400" height="280" frameBorder="0"></iframe><h2>Correct!</h2>')
                    .fadeIn();
        trivia.removeCard();
        trivia.right++;
        $('#right').text(trivia.right);
        trivia.setQuestionTimeOut();
        trivia.stopTimer();
      } else {
        $('#result').css('color', 'rgba(255, 99, 71, 0.9)')
                    .html('<iframe src="https://thumbs.gfycat.com/SparklingWeightyLangur-size_restricted.gif" width="400" height="280" frameBorder="0"></iframe><h2>Wrong...</h2>')
                    .fadeIn();
        trivia.removeCard();
        trivia.wrong++;
        $('#wrong').text(trivia.wrong);
        trivia.setQuestionTimeOut();
        trivia.stopTimer();
      }
    });
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
    trivia.stopTimer();
    $('#result').css('color', 'rgba(255, 99, 71, 0.9)')
                .html('<iframe src="https://thumbs.gfycat.com/AngelicAlertArizonaalligatorlizard-size_restricted.gif" width="420" height="280" frameBorder="0"></iframe><h2>Time is up!</h2>')            
                .fadeIn();
    trivia.removeCard();
    trivia.wrong++;
    $('#wrong').text(trivia.wrong);
    trivia.setQuestionTimeOut()
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
    this.getNewQuestion();
  }

}

$(document).ready(function() {
  $('.question-card').css('opacity', '0');
  if(trivia.questionIndex === 0) {
    $('#start').on('click', function() {
      trivia.getNewQuestion();
      trivia.handleClickAnswer();
      $('#start').remove();
    })
  }
});
