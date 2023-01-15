import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Timer from "../components/Timer.jsx"

const Quiz = () => {
  const [user, setUser] = useState("")
  const [quizes, setQuizes] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const alphabetOptions = ["A", "B", "C"]
  
  useEffect(() => {
    //dapatkan data user
    setUser(JSON.parse(localStorage.getItem("YR_QUIZ_APP")))
    
    //dapatkan kuis jika tab tidak sengaja tertutup
    const quizHistory = JSON.parse(localStorage.getItem("YR_QUIZ"))
    if (quizHistory) {
      setQuizes(quizHistory)
    } else {
      getQuiz()
    }
    
    //kembalikan currentQuestion dan score jika browser tertutup
    const currentQuestionHistory = JSON.parse(localStorage.getItem("YR_QUIZ_CURRENT_QUESTION"))
    const scoreHistory = JSON.parse(localStorage.getItem("YR_QUIZ_CURRENT_SCORE"))
    setCurrentQuestion(currentQuestionHistory)
    setScore(scoreHistory)
    
    localStorage.setItem("YR_QUIZ_CURRENT_SCORE", score)
    localStorage.setItem("YR_QUIZ_CURRENT_QUESTION", currentQuestion)
  }, [])
  
  const getQuiz = () => {
    axios.get("https://opentdb.com/api.php?amount=10&category=22&type=multiple")
    .then(res => {
      setQuizes(res.data.results)
      //simpan kuis ke localStorage
      localStorage.setItem("YR_QUIZ", JSON.stringify(res.data.results))
    })
    .catch(err => console.log(err))
  }
  
  const checkAnswer = (answer) => {
    //jika jawaban benar, tambahkan score 10
    let newScore = 0
    if (answer === quizes[currentQuestion].correct_answer) {
      newScore = score + 10
    } else {
      newScore = score
    }
    
    setScore(newScore)
    localStorage.setItem("YR_QUIZ_CURRENT_SCORE", newScore)
    
    const newQuestion = currentQuestion + 1
    
    if (newQuestion < quizes.length) {
      setCurrentQuestion(newQuestion)
      localStorage.setItem("YR_QUIZ_CURRENT_QUESTION", newQuestion)
    } else {
      setRunning(false)
    }
  }
  
  const playAgain = () => {
    localStorage.removeItem("YR_QUIZ_CURRENT_QUESTION")
    localStorage.removeItem("YR_QUIZ")
    localStorage.removeItem("YR_QUIZ_CURRENT_SCORE")
    document.location.reload()
  }
  
  return (
    <main className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-6 bg-white rounded py-4">
        
        {!running ? 
        <section className="text-center">
          Your score is {score}
          <div className="d-grid mt-4">
            <button className="btn btn-primary" onClick={playAgain}>Play again</button>
          </div>
        </section> 
        :
        <section>
          <h1 className="text-center mb-4">Welcome, {user.username}</h1>
          
          <div className="d-flex justify-content-between">
            <p><span style={{ color: "#9e3ce4" }}>{currentQuestion + 1}</span> / {quizes.length}</p>
              <Timer setRunning={setRunning} />
          </div>
          
          {quizes.length > 0 && (
          <div className="mt-4">
            <p><strong>{quizes[currentQuestion].question}</strong></p>
            <div className="mt-3">
              {quizes[currentQuestion].incorrect_answers.map((answer, index) => {
                return (
                  <button className="options" onClick={() => checkAnswer(answer)} key={index}>{alphabetOptions[index]}. {answer}</button>
                 )
              })}
              <button className="options" onClick={() => checkAnswer(quizes[currentQuestion].correct_answer)}>D. {quizes[currentQuestion].correct_answer}</button>
            </div>
          </div>
          )}
          </section>
        }
         
        </div>
      </div>
    </main>
  )
}

export default Quiz