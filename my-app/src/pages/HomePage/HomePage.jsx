import React from "react";
import { useNavigate } from "react-router";
import "./HomePage.css";
import { Button } from "../../components/Button";
import { useTheme } from "../../core/hooks/useTheme";

function HomePage() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme("light");
  };

  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  return (
    <div className="home_div">
      <div className="theme_btns">
        <Button
          className="btn_theme"
          title="dark"
          onClick={handleDarkThemeClick}
        />
        <Button
          className="btn_theme"
          title="light"
          onClick={handleLightThemeClick}
        />
      </div>
      <h1 className="home_h1">To-do List</h1>
      <h3 className="home_h3">Organize your work and life.</h3>
      <h3 className="home_h3">
        It will help you gain concentration, organization and peace.
      </h3>
      <div className="home_buttons">
        <Button
          onClick={() => {
            navigate("/login", { replace: true });
          }}
          title="Sign in"
          className="sign_in_btn"
          type="button"
        />
      </div>
    </div>
  );
}

export default HomePage;
