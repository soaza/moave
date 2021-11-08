import React from "react";
import "./App.css";
import MoviePage from "./pages/movie";
import MoviesPage from "./pages/movies";
import ProfilePage from "./pages/profile";
import { Route, Switch, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/navigation";
import LandingPage from "./pages/landing-page";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/404-page";
import MyProfilePage from "./pages/my_profile";
import SimilarMoviesPage from "./pages/similar-movies-page";
import ChangePasswordPage from "./pages/changePassword";

const { useState, useEffect } = React;
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(checkAuth);
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <Switch location={location} key={location.pathname}>
          <Route
            path="/register"
            component={() => (
              <RegisterPage setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route
            path="/login"
            component={() => (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route
            path="/"
            component={() => (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
          />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Navigation />

      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/my_profile" component={MyProfilePage} />
        <Route path="/changePassword" component={ChangePasswordPage} />

        <Route path="/movie" component={MoviePage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/similar_movies" component={SimilarMoviesPage} />

        <Route path="/" component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;
