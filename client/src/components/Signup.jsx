import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    // TODO: Send data to backend
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required 
          style={styles.input}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "400px",
    margin: "auto",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    margin: "0.5rem 0",
    padding: "0.75rem",
    fontSize: "1rem"
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px"
  }
};

export default Signup;
