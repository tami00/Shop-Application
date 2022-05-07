import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// components
import "./App.css";
// import AuthVerify from "./common/auth-verify";

import EventBus from "./common/EventBus";
import BoardUser from "./components/board-user.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import Stock from "./components/stock/stock"
import Register from "./components/register.component";
import AuthService from "./services/auth.service";
import Search from './components/search/Search'
import StockListComponent from './components/search/StockListComponent';
import CatergoryComponent from './components/search/CatergoryComponent'
import ViewProducts from './components/user/ViewProducts'
import ProductInfoComponent from './components/user/ProductInfoComponent'

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [locationState, setLocationState] = useState('')
  const [userName, setUserName] = useState('')

  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setLocationState(location.pathname)
    if (user) {
      setCurrentUser(user);
      setUserName(user.username)
    }

    EventBus.on("logout", () => {
      this.logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };


  return (
    <div>
      {userName === "admin" ? (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Movie App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/user/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>
          <Search />
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/stock"} className="nav-link">
                    STOCK
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      ) : (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Movie App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/profile"} className="nav-link">
                  USER NAV BAR
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      )}

      <div className="container-fluid">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/user/home" component={ViewProducts} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/stock/title/:title"children={<StockListComponent />}/>
          <Route exact path="/products/:title/:id" children={<ProductInfoComponent />} />
          <Route exact path="/stock/catergory/:catergory"children={<CatergoryComponent />}/>
          <Route exact path="/admin/profile" component={Profile} />
          <Route exact path="/admin/stock" component={Stock} />
          <Route path="/user" component={BoardUser} />
        </Switch>
      </div>
    </div>
  );
};


export default App;