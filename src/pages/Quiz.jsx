import { useState, useEffect } from "react"
import axios from "axios"
import Timer from "../components/Timer.jsx"
import Score from "../components/Score.jsx"
import { useNavigate } from "react-router-dom"

const Quiz = () => {
  const [user, setUser] = useState("")
  const [quizes, setQuizes] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const alphabetOptions = ["A", "B", "C"]
  const navigate = useNavigate()
  
  useEffect(() => {
    //dapatkan data user
    const user = JSON.parse(localStorage.getItem("YR_QUIZ_APP"))
    if (!user) {
      navigate("/login")
    } else {
      setUser(user)
    }
    
    //dapatkan kuis jika tab tidak sengaja tertutup
    const quizHistory = JSON.parse(localStorage.getItem("YR_QUIZ"))
    if (quizHistory) {
      setQuizes(quizHistory)
    } else {
      getQuiz()
    }
    
    //kembalikan currentQuestion dan score jika browser tertutup
    const currentQuestionHistory = JSON.parse(localStorage.getItem("YR_QUIZ_CURRENT_QUESTION"))
    if (currentQuestionHistory) {
      setCurrentQuestion(currentQuestionHistory)
    }
    
    const scoreHistory = JSON.parse(localStorage.getItem("YR_QUIZ_CURRENT_SCORE"))
    if (scoreHistory) {
      setScore(scoreHistory)
    }
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
  
  return (
    <main className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-6 bg-white rounded py-4">
        
        {!running ? 
          <Score score={score} />
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