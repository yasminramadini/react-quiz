import { useState, useEffect, useMemo } from "react"
import axios from "axios"

const Quiz = () => {
  const [user, setUser] = useState("")
  const [quizes, setQuizes] = useState([])
  const [totalQuizes, setTotalQuizes] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("YR_QUIZ_APP")))
    
    //get quiz 
    axios.get("https://opentdb.com/api.php?amount=10&category=22&type=multiple")
    .then(res => {
      setQuizes(res.data.results)
      setTotalQuizes([...Array(res.data.results.length).keys()])
    })
    .catch(err => console.log(err))
  }, [])
  
  const previous = (e) => {
    e.target.classList.remove("disabled")
    if (currentQuestion > 1) {
      setCurrentQuestion(value => value - 1)
    } else {
      e.target.classList.add("disabled")
    }
  }
  
  const next = (e) => {
    e.target.classList.remove("disabled")
    if (currentQuestion < quizes.length) {
      setCurrentQuestion(value => value + 1)
    } else {
      e.target.classList.add("disabled")
    }
  }
  
  return (
    <main className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-6 bg-white rounded py-4">
          <h1 className="text-center mb-4">Welcome, {user.username}</h1>
          
          <div className="indicator" style={{ overflowX: "auto"}}>
            <div className="d-flex gap-3 mb-4">
              {totalQuizes.map((number, i) => {
                return <p key={i}>{number+1}</p>
              })}
            </div>
          </div>
         
         {quizes.length > 0 && (
              <div className="tab mb-3">
                <p><strong>{quizes[currentQuestion].question}</strong></p>
                {quizes[currentQuestion].incorrect_answers.map((answer, index) => {
                  return (
                    <div className="d-flex align-items-center gap-1" key={index}>
                      <input type="radio" name={`answer-${currentQuestion}`} value={answer} className="form-check" /> 
                      <label>{answer}</label>
                    </div>)
                  })}
                <div className="d-flex align-items-center gap-1">
                  <input type="radio" name={`answer-${currentQuestion}`} value={quizes[currentQuestion].correct_answer} /> 
                  <label>{quizes[currentQuestion].correct_answer}</label>
                </div>
              </div> 
              )}
          
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={previous}>Previous</button>
            <button onClick={next} className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Quiz