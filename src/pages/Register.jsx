import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const registerProcess = (e) => {
    e.preventDefault()
    const user = {
      username,
      password
    }
    localStorage.setItem("YR_QUIZ_APP", JSON.stringify(user))
    navigate("/login")
  }
  
  return (
    <main className="container" style={ { minHeight: "100vh" }}>
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-6">
          <div className="card p-3">
            <img src="https://cdn-icons-png.flaticon.com/512/3408/3408506.png" width="60px" className="d-block mx-auto" />
            <h3 className="text-center my-4">Register</h3>
            <form className="mt-3" onSubmit={registerProcess}>
              <div className="mb-3">
                <label>Username</label>
                <input type="text" className="form-control mt-1" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control mt-1" required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-grid">
                <button className="btn btn-primary">Register</button>
              </div>
              <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register