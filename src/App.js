import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import MoviesList from './MoviesList/MoviesList';
import MovieDetails from './MovieDetails/MovieDetails';
import { useSelector } from 'react-redux';
import Wishlist from './Wishlist/Wishlist';

function App() {
  const mylang = useSelector((state)=>state.lang);
  return (
    <div dir={mylang=="AR" ? "rtl" : "ltr"}>
      <BrowserRouter>
          <NavBar />
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/Movies" component={MoviesList} exact />
              <Route path="/Movies/:id" component={MovieDetails} exact />
              <Route path="/Wishlist" component={Wishlist} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="*" component={NotFound} exact />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
