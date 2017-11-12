import Inferno from 'inferno'
import Component from 'inferno-component'

import { PlaceholderWrapper } from '../ReactPlaceholder/index'
import './style.css'

const picture = 'https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/10600443_819056058115805_259656599366344695_n.jpg?oh=9ee69bdca22c5975f5cc37794ee373ed&oe=5A29C67E'

const questions = {
  1: {
    id: 1,
    msg: 'Hi, how are you doing?',
    answers: { 0: 1, 1: 2 }
  },
  2: {
    id: 2,
    msg: 'Shit... why are you sad?',
    answers: { 0: 3, 1: 4 }
  },
  3: {
    id: 3,
    msg: 'Great! Why are you that happy?',
    answers: { 0: 3, 1: 4 }
  },
  4: {
    id: 4,
    msg: 'I see...',
    answers: { 0: 3, 1: 4 }
  },
  5: {
    id: 5,
    msg: 'No problem... I can call a psychologist',
    answers: { 0: 3, 1: 4 }
  }
}

const answers = {
  1: {
    id: 1,
    msg: 'Im really bad',
    next: 2,
  },
  2: {
    id: 2,
    msg: 'Im great. Thanks',
    next: 3,
  },
  3: {
    id: 3,
    msg: 'I dont want to talk about it',
    next: 5,
  }, 
  4: {
    id: 4,
    msg: 'I woke up like that...',
    next: 4,
  }
}

 
let countdownGenerator = function *() {
    let i = 10;
    while ( i > 0 ) yield --i;
}
 
let lampGenerator = function *() {
    yield 'red';
    yield 'green';
}
 
let countdownThenLampGenerator = function *() {
  let data = yield false

  for (let key of Object.keys(questions)) {
    const answerId = questions[data.question].answers[data.answer]
    console.log(data)
    yield questions[answers[answerId].next]
  }
}
 
  const getMessages = (data = { question: questions[1].id }) => {
    console.log(data)
    for (let key of Object.keys(questions)) {
      const answerId = questions[data.question].answers[data.answer]
      
      return questions[answers[answerId].next]
    }
  }

const placeholder = {
  lines: [
    { height: 7, intervals: [[0, 95]]},
    { height: 7 },
    { height: 7, intervals: [[0, 75]]},
  ]
}

const LoadingMessage = () => (
  <MyMessage style={{ width: '380px' }}><PlaceholderWrapper {...placeholder}/></MyMessage>
)
const MyMessage = ({ children, style }) => (
  <div style={style} className="chat-bot__message-me">
    <div className="chat-bot__message-avatar">
      <img src={picture} />
    </div>
    <p>{children}</p>
  </div>
)

const VisitorMessage = ({ children }) => (
  <div className="chat-bot__message-user">
   <p>{children}</p>
  </div>
)

class ChatBox extends Component {
  state = {
    messages: [],
    currentQuestion: questions[1],
    loadingNewMessage: true,
  }

  componentDidMount() {
    const lastMsg  =document.getElementById('answers');
    lastMsg.focus();

    setTimeout(() => {
      this.setState({
        loadingNewMessage: false,
        messages: [...this.state.messages, { ...questions[1], me: true }]
      })
    }, 800)
  }

  getAnswers = () => {
    const { messages, currentQuestion } = this.state
    
    const _answers = {
      0: answers[currentQuestion.answers[0]],
      1: answers[currentQuestion.answers[1]],
    }
    return _answers
  }

  setAnswer = (answer) => {
    
    const nextQuestion = questions[answer.next]
    console.log(nextQuestion)
    const scrollTo = this.state.messages.length * 80
  /*  const scrollTo = this.state.messages.length * 40

    console.log(scrollTo)
      window.scrollTo(0, scrollTo)*/
/*      var element = document.getElementById("chat-bot");
      console.log(element.scrollHeight)
    element.scrollTop = scrollTo*/
/*    var element = document.getElementById("chat-bot")
    console.log( element.scrollHeight)
    element.scrollTop = 0*/
/*
    document.getElementById("target").scrollIntoView();*/
    setTimeout(() => {
      this.setState({
      messages: [{ ...nextQuestion, me: true }, ...this.state.messages],
      loadingNewMessage: false,
      })
    }, 800)

    this.setState({
      messages: [{ ...answer, me: false },...this.state.messages],
      currentQuestion: nextQuestion,
      loadingNewMessage: true,
    })
  }

  render() {
    const { messages, answers, loadingNewMessage } = this.state
    console.log(messages)
    const currentAnswers = this.getAnswers()
    console.log(currentAnswers)
    return (
      <div id="chat-bot" className="chat-bot">
        <div id="style-4" className="chat-bot__messages">

          {loadingNewMessage ? <LoadingMessage /> : ''}
          { messages.map(question => 
            question.me ? <MyMessage>{question.msg}</MyMessage> : <VisitorMessage>{question.msg}</VisitorMessage>
          )}
        </div>
       
        {currentAnswers[0] && <div id="answers" className="chat-bot__answers">
          <button onClick={() => this.setAnswer(currentAnswers[0])}>{currentAnswers[0].msg}</button>
          <button onClick={() => this.setAnswer(currentAnswers[1])}>{currentAnswers[1].msg}</button>
        </div>}
      </div>
    )
  }
}

export default ChatBox
