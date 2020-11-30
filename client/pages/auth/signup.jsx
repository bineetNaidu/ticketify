import React from 'react';

const Signup = () => {
  return (
    <form className="container">
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
    </form>
  );
};

export default Signup;
