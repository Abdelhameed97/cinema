import { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    errEmail: "",
    errPassword: "",
  });

  const handleInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      setErrors({
        ...errors,
        errEmail:
          e.target.value.length === 0
            ? "Email is required"
            : e.target.value.includes("@")
            ? ""
            : "Email is invalid",
      });
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      setErrors({
        ...errors,
        errPassword:
          e.target.value.length === 0
            ? "Password is required"
            : e.target.value.length > 7
            ? ""
            : "Password is too short",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.errEmail || errors.errPassword) {
      return;
    }
    props.history.push("/Movies");
  };

  return (
    <div className='container-fluid bg-light' style={{ minHeight: "100vh" }}>
      <div
        className='row justify-content-center align-items-center'
        style={{ minHeight: "100vh" }}
      >
        <div className='col-md-8 col-sm-10 col-lg-5'>
          <div className='card border-0 shadow-lg rounded-4 overflow-hidden'>
            {/* Animated Gradient Header */}
            <div
              className='card-header bg-gradient-primary text-white py-4'
              style={{
                background: "linear-gradient(45deg, #ff6b6b, #3a86ff, #8338ec)",
                backgroundSize: "300% 300%",
                animation: "gradient 8s ease infinite",
              }}
            >
              <h1 className='text-center mb-0 fw-bold'>
                Login To <span className='text-warning'>CimaCode</span>
              </h1>
            </div>

            <div className='card-body p-4 p-md-5 bg-light'>
              <form onSubmit={handleSubmit}>
                {/* Floating Label Inputs */}
                <div className='form-floating mb-4'>
                  <input
                    type='text'
                    name='email'
                    id='emailInput'
                    value={email}
                    onChange={handleInput}
                    className={`form-control rounded-3 ${
                      errors.errEmail ? "is-invalid" : email ? "is-valid" : ""
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='emailInput' className='text-muted'>
                    <i className='bi bi-envelope-fill me-2'></i>Email Address
                  </label>
                  <div className='invalid-feedback'>{errors.errEmail}</div>
                </div>

                <div className='form-floating mb-4'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    id='passwordInput'
                    value={password}
                    onChange={handleInput}
                    className={`form-control rounded-3 ${
                      errors.errPassword
                        ? "is-invalid"
                        : password
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='passwordInput' className='text-muted'>
                    <i className='bi bi-lock-fill me-2'></i>Password
                  </label>
                  <div className='invalid-feedback'>{errors.errPassword}</div>
                </div>

                <div className='mb-4 form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='rememberCheck'
                  />
                  <label className='form-check-label' htmlFor='rememberCheck'>
                    Remember me
                  </label>
                </div>

                {/* Animated Submit Button */}
                <button
                  type='submit'
                  className='btn btn-primary w-100 py-3 rounded-pill fw-bold fs-5 shadow-sm'
                  style={{
                    background: "linear-gradient(to right, #3a86ff, #8338ec)",
                    border: "none",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 10px 20px rgba(58, 134, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 5px 15px rgba(58, 134, 255, 0.2)";
                  }}
                  disabled={errors.errEmail || errors.errPassword}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>Login</span>
                </button>
              </form>

              {/* Footer Links */}
              <div className='text-center mt-3'>
                <Link
                  to='/forgot-password'
                  className='text-decoration-none'
                  style={{ color: "#3a86ff" }}
                >
                  Forgot password?
                </Link>
                <p className='text-muted mt-2 mb-0'>
                  Don't have an account?{" "}
                  <Link
                    to='/register'
                    className='text-decoration-none fw-bold'
                    style={{ color: "#3a86ff" }}
                  >
                    Register Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your index.html head */}
      <style>
        {`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .form-control.is-valid {
                    border-color: #28a745;
                    background-image: none;
                    padding-right: 12px;
                }
                
                .form-control.is-valid:focus {
                    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
                }
                
                .form-floating label {
                    transition: all 0.2s;
                }
                
                .form-floating > .form-control:focus ~ label,
                .form-floating > .form-control:not(:placeholder-shown) ~ label {
                    transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
                    color: #3a86ff;
                }
                `}
      </style>
    </div>
  );
}

export default Login;
