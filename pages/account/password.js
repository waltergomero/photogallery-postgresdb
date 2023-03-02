import React from 'react'; 
import { useState } from 'react'


const Password = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordText, setPasswordText] = useState(false);

   const passwordValueHandler = (e) => {
    const _password = e.target.value
    props.onPassword(_password);
   }

    const togglePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
        setPasswordText(!passwordText);
      };

  return (
    <div>
        <label htmlFor='password' className="block text-dark text-sm" >Password</label>
        <input
                type={showPassword?'text':'password'} 
                required
                minLength="6"
                maxLength="32"
                className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                onChange = {passwordValueHandler}
            />
        <button onClick={togglePassword} className="block text-blue-600 text-sm">{passwordText? 'Hide': 'Show'} password</button>
    </div>
  )
}

export default Password;
Password.layout="Front";