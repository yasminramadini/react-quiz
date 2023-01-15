import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = localStorage.getItem("YR_QUIZ_APP")
    if (user) {
      navigate("/")
    }
  }, [])
  
  const loginProcess = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("YR_QUIZ_APP"))
    
    if (!user) {
      setError("An account has not been registered")
    }
    
    if (username === user.username) {
      if (password === user.password) {
        navigate("/")
      } else {
        setError("Incorret username or password")
      }
    } else {
      setError("Incorret username or password")
    }
  }
  
  return (
    <main className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-6">
          <div className="card p-3">
            <img src="https://cdn-icons-png.flaticon.com/512/3408/3408506.png" width="60px" className="d-block mx-auto" />
            <h3 className="text-center my-4">Login</h3>
            
            {error && <div className="alert alert-danger my-3">{error}</div>}
            
            <form className="mt-3" onSubmit={loginProcess}>
              <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control mt-1" onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control mt-1" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Login</button>
              </div>
              <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login