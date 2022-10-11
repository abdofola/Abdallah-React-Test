import React from "react";

export default function Login({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const {elements} = e.target;
    const { username, password } = elements;

    onSubmit({ username: username.value, password: password.value });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username-field">Username</label>
        <input id="username-field" name="username" type="text" />
      </div>
      <div className="form-group">
        <label htmlFor="password-field">Password</label>
        <input id="password-field" name="password" type="password" />
      </div>
      <div className="form-group">
        <button name="button" type="submit">submit</button>
      </div>
    </form>
  );
}
