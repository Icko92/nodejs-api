import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../../redux/actions/authActions";

import "./Register.scss";

function Register() {
  const errorsProp = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    errors: {},
  });

  useEffect(() => {
    if (errorsProp) {
      setFormData((input) => ({ ...input, errors: errorsProp }));
    }
  }, [errorsProp]);

  const handleRoleChange = (event) => {
    setFormData((input) => ({ ...input, role: event.target.value }));
  };

  const onChange = (event) => {
    event.persist();
    setFormData((input) => ({
      ...input,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };

    dispatch(registerUser(newUser));
  };
  //Destructure errors from component state
  const { errors } = formData;
  return (
    <div className="register">
      <h1 className="register-title">Create User</h1>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <input
          className={
            errors.name ? "form-input form-input-invalid" : "form-input "
          }
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
        />
        {errors.name && (
          <div className="input-error-message">{errors.name}</div>
        )}
        <input
          className={
            errors.email ? "form-input form-input-invalid" : "form-input "
          }
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        {errors.email && (
          <div className="input-error-message">{errors.email}</div>
        )}
        <input
          className={
            errors.username ? "form-input form-input-invalid" : "form-input "
          }
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
          required
        />
        {errors.username && (
          <div className="input-error-message">{errors.username}</div>
        )}
        <input
          className={
            errors.password ? "form-input form-input-invalid" : "form-input "
          }
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
        {errors.password && (
          <div className="input-error-message">{errors.password}</div>
        )}
        <input
          className={
            errors.confirmPassword
              ? "form-input form-input-invalid"
              : "form-input "
          }
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          required
        />
        {errors.confirmPassword && (
          <div className="input-error-message">{errors.confirmPassword}</div>
        )}
        <div className="role-option-container">
          <label className="role-label" htmlFor="role">
            Choose a role:
          </label>
          <select onChange={handleRoleChange} id="role">
            <option value="">Select Role</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {errors.role && (
          <div className="input-error-message">{errors.role}</div>
        )}
        <input type="submit" className="form-input button" />
      </form>
    </div>
  );
}

export default Register;
