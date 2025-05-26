import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  FaFilm,
  FaTv,
  FaHome,
  FaUser,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useState } from "react";
import { FaLanguage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../Redux/Action";


function NavBar() {
  const mylang = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const handelLanguage = () => {
    // Implement language change logic here
    dispatch(changeLanguage(mylang == "EN" ? "AR" : "EN"));
    console.log("change language");
    // languageOptions.language = "en" ? "ar" : "en";
  };
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // Get active link from URL
  const activeLink = location.pathname.split("/")[1] || "home";

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const navLinks = [
    { path: "/", icon: <FaHome className='me-1' />, label: "Home", id: "home" },
    {
      path: "/movies",
      icon: <FaFilm className='me-1' />,
      label: "Movies",
      id: "movies",
    },
    {
      path: "/tv-shows",
      icon: <FaTv className='me-1' />,
      label: "TV Shows",
      id: "tv",
    },
  ];

  return (
    <Navbar
      expand='lg'
      className='sticky-top'
      style={{
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid rgba(255, 190, 11, 0.2)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container fluid>
        <Link
          className='navbar-brand d-flex align-items-center'
          to='/'
          style={{
            transition: "all 0.3s ease",
            transform: activeLink === "home" ? "scale(1.05)" : "scale(1)",
            color: "#ffbe0b",
          }}
          aria-label='CimaCode Home'
        >
          <FaFilm
            className='me-2'
            style={{
              animation: "pulse 2s infinite",
            }}
          />
          <span className='fw-bold'>Cima</span>
          <span className='fw-bold text-white'>Code</span>
        </Link>

        <Navbar.Toggle
          aria-controls='main-navbar'
          className='text-white border-0'
          style={{ transition: "all 0.3s ease" }}
        />

        <Navbar.Collapse id='main-navbar'>
          <Nav className='me-auto'>
            {navLinks.map((link) => (
              <Nav.Item key={link.id}>
                <Link
                  className={`nav-link d-flex align-items-center ${
                    activeLink === link.id ? "active-link" : "text-white"
                  }`}
                  to={link.path}
                  style={{
                    transition: "all 0.3s ease",
                    transform:
                      activeLink === link.id ? "translateY(-2px)" : "none",
                  }}
                  aria-current={activeLink === link.id ? "page" : undefined}
                >
                  {link.icon} {link.label}
                </Link>
              </Nav.Item>
            ))}
          </Nav>

          <div className='d-flex align-items-center'>
            <button
              className='btn btn-link me-3 p-0 text-white text-decoration-none'
              aria-label='Language'
              onClick={()=>handelLanguage()}
            >
              <FaLanguage className='me-1' size={30}/>
              <span className='d-none d-lg-inline'>{mylang}</span>
            </button>
            <button
              className='btn btn-link me-3 p-0'
              onClick={toggleHeart}
              style={{
                transition: "all 0.3s ease",
                transform: isHeartFilled ? "scale(1.2)" : "scale(1)",
              }}
              aria-label={
                isHeartFilled ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isHeartFilled ? (
                <FaHeart className='text-danger' size={20} />
              ) : (
                <FaRegHeart className='text-white' size={20} />
              )}
            </button>

            <Link
              to='/login'
              className='btn btn-outline-light me-2 d-flex align-items-center'
              style={{
                transition: "all 0.3s ease",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
              }}
              aria-label='Login'
            >
              <FaUser className='me-1' />
              <span className='d-none d-lg-inline'>Login</span>
            </Link>
            <Link
              to='/register'
              className='btn btn-warning d-flex align-items-center fw-bold'
              style={{
                backgroundColor: "#ffbe0b",
                color: "#1a1a1a",
                border: "none",
                transition: "all 0.3s ease",
              }}
              aria-label='Register'
            >
              <span className='d-none d-lg-inline'>Register</span>
              <span className='d-lg-none'>
                <FaUser />
              </span>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          .active-link {
            color: #ffbe0b !important;
            font-weight: 600;
          }
          
          .nav-link:hover {
            color: #ffbe0b !important;
            transform: translateY(-2px) !important;
          }
          
          .btn-outline-light:hover {
            background-color: rgba(255, 190, 11, 0.1);
            border-color: #ffbe0b !important;
            color: #ffbe0b !important;
          }
          
          .btn-warning:hover {
            background-color: #ffcc33 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(255, 190, 11, 0.3);
          }

          .form-control:focus {
            background-color: #2a2a2a;
            color: white;
            border-color: #ffbe0b;
            box-shadow: 0 0 0 0.25rem rgba(255, 190, 11, 0.25);
          }
        `}
      </style>
    </Navbar>
  );
}

export default NavBar;
