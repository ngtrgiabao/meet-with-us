import React from "react";

function FormDN() {
  return (
    <form className="Login">
      <h1>Login</h1>

      <input type="text" placeholder="Username" />
      <input type="password" placeholder="password" maxLength={20} />
      <button type="submit">Login</button>
      <input type="checkbox" checked={true} name="remember">
        Remembr me
      </input>
    </form>
  );
}
export default FormDN;
