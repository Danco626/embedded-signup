import React, { useState, useEffect } from 'react';

const PasswordValidator = ({ password, validatorcb }) => {

    const [passwordValidator, setPasswordValidator] = useState({
      isValidLength: false,
      hasLower: false,
      hasCapital: false,
      hasNumber: false,
      hasSpecialChar: false,
      isValidPassword: false
    });
   
    useEffect(() => {
      //validate password
      const testForMinChar = new RegExp("^(?=.{8,})");
      const testForLower = new RegExp("^(?=.*[a-z])");
      const testForCapitol = new RegExp("^(?=.*[A-Z])");
      const testForNum = new RegExp("^(?=.*[0-9])");
      const testForSpecialChar = new RegExp("^(?=.*[!@#$%^&*])");
  
      const validator = {
        isValidLength: testForMinChar.test(password),
        hasLower: testForLower.test(password),
        hasCapital: testForCapitol.test(password),
        hasNumber: testForNum.test(password),
        hasSpecialChar: testForSpecialChar.test(password)      
      };
  
      
      //if any validator is false, then password is invalid
      validator.isValidPassword = !Object.values(validator).some(val => val === false);

      //keep parent updated password status
      validatorcb(validator.isValidPassword)      

      setPasswordValidator(validator);     
    }, [password, validatorcb])

  return (
    <>

      <div className="card">
        <div className="card-body">
          <small style={{color: passwordValidator.isValidLength ? 'green' : 'red'}} className="form-text">Minimum 8 characters</small> <br />
          <small style={{color: passwordValidator.hasCapital ? 'green' : 'red'}} className="form-text">Atleast 1 capital</small> <br />
          <small style={{color: passwordValidator.hasLower ? 'green' : 'red'}} className="form-text">Atleast 1 lowercase</small> <br />
          <small style={{color: passwordValidator.hasNumber ? 'green' : 'red'}} className="form-text">Atleast 1 number</small> <br />
          <small style={{color: passwordValidator.hasSpecialChar ? 'green' : 'red'}} className="form-text">Atleast 1 special character</small>        
        </div>
        {/* <pre>{JSON.stringify(passwordValidator, null, 4)}</pre> */}
      </div>
    </>
  );
}

export default PasswordValidator;