import { useNavigate } from "react-router-dom"

const Score = ({ score }) => {
  const navigate = useNavigate()
  
  const playAgain = () => {
    localStorage.removeItem("YR_QUIZ_CURRENT_QUESTION")
    localStorage.removeItem("YR_QUIZ")
    localStorage.removeItem("YR_QUIZ_CURRENT_SCORE")
    document.location.reload()
   }
   
   const logout = () => {
     localStorage.removeItem("YR_QUIZ_APP")
     localStorage.removeItem("YR_QUIZ")
     localStorage.removeItem("YR_QUIZ_CURRENT_SCORE")
     localStorage.removeItem("YR_QUIZ_CURRENT_QUESTION")
     navigate("/login")
   }
   
   return (
    <section className="text-center">
          Your score is {score}
      <div className="row mt-4 gap-3">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={playAgain}>Play again</button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
        </div>
      </div>
     </section> 
   )
}

export default Score