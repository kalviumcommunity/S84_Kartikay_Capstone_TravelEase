import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to TravelEase</h1>
      <p>Your travel companion made easy.</p>
      <Link to="/signup" style={styles.button}>
        Sign Up Now
      </Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "Arial",
  },
  button: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Home;
