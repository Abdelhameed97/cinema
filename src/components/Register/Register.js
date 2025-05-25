import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    errName: "",
    errEmail: "",
    errUsername: "",
    errPassword: "",
    errConfirmPassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        setErrors({
          ...errors,
          errName:
            value.length === 0
              ? "Name is required"
              : value.length < 3
              ? "Name must be at least 3 characters"
              : "",
        });
        break;
      case "email":
        setEmail(value);
        setErrors({
          ...errors,
          errEmail:
            value.length === 0
              ? "Email is required"
              : value.includes("@")
              ? ""
              : "Email is invalid",
        });
        break;
      case "username":
        setUsername(value);
        setErrors({
          ...errors,
          errUsername:
            value.length === 0
              ? "Username is required"
              : value.includes(" ")
              ? "Username must not contain spaces"
              : value.length < 3
              ? "Username must be at least 3 characters"
              : "",
        });
        break;
      case "password":
        setPassword(value);
        setErrors({
          ...errors,
          errPassword:
            value.length === 0
              ? "Password is required"
              : value.length >= 8
              ? ""
              : "Password must be at least 8 characters",
        });
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrors({
          ...errors,
          errConfirmPassword:
            value !== password ? "Passwords do not match" : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    if (
      errors.errName ||
      errors.errEmail ||
      errors.errUsername ||
      errors.errPassword ||
      errors.errConfirmPassword
    ) {
      e.preventDefault();
    } else {
      console.log("Registered successfully");
      props.history.push("/Movies");
    }
  };

  return (
    <div className='container-fluid bg-light' style={{ minHeight: "100vh" }}>
      <div
        className='row justify-content-center align-items-center'
        style={{ minHeight: "100vh" }}
      >
        <div className='col-md-8  col-sm-10 col-lg-5'>
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
                Register To <span className='text-warning'>CimaCode</span>
              </h1>
            </div>

            <div className='card-body p-4 p-md-5 bg-light'>
              <form onSubmit={handleSubmit}>
                {/* Floating Label Inputs */}
                <div className='form-floating mb-4'>
                  <input
                    type='text'
                    name='name'
                    id='nameInput'
                    value={name}
                    onChange={handleInput}
                    className={`form-control rounded-3 ${
                      errors.errName ? "is-invalid" : name ? "is-valid" : ""
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='nameInput' className='text-muted'>
                    <i className='bi bi-person-fill me-2'></i>Full Name
                  </label>
                  <div className='invalid-feedback'>{errors.errName}</div>
                </div>

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
                    type='text'
                    name='username'
                    id='usernameInput'
                    value={username}
                    onChange={handleInput}
                    className={`form-control rounded-3 ${
                      errors.errUsername
                        ? "is-invalid"
                        : username
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='usernameInput' className='text-muted'>
                    <i className='bi bi-person-badge-fill me-2'></i>Username
                  </label>
                  <div className='invalid-feedback'>{errors.errUsername}</div>
                </div>

                <div className='form-floating mb-4'>
                  <input
                    type='password'
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

                <div className='form-floating mb-4'>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPasswordInput'
                    value={confirmPassword}
                    onChange={handleInput}
                    className={`form-control rounded-3 ${
                      errors.errConfirmPassword
                        ? "is-invalid"
                        : confirmPassword
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='confirmPasswordInput' className='text-muted'>
                    <i className='bi bi-shield-lock-fill me-2'></i>Confirm
                    Password
                  </label>
                  <div className='invalid-feedback'>
                    {errors.errConfirmPassword}
                  </div>
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
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    Register Now
                  </span>
                </button>
              </form>

              {/* Footer Link */}
              <div className='text-center mt-4'>
                <p className='text-muted mb-0'>
                  Already have an account?
                  <Link
                    to='/login'
                    className='text-decoration-none ms-2 fw-bold'
                    style={{ color: "#3a86ff" }}
                  >
                    Login Here
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

export default Register;
