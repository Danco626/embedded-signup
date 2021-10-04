import React, { useState } from 'react';
import PasswordValidator from './PasswordValidator';
const axios = require('axios');
const config = require('../auth_config.json');

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [marketing, setMarketing] = useState(false);
  const [isValidPass, setisValidPass] = useState(false);
  const [result, setResult] = useState({ status: '', message: '' });

  const validatorCallback = (isValidPassword) => {
    setisValidPass(isValidPassword)
  };

  const createUser = () => {
    const uri = `${config.domain}/dbconnections/signup`;
    const request = {
      client_id: config.client_id,
      connection: config.connection,
      email: email,
      password: password,
      user_metadata: {
        marketing: marketing.toString()
      }
    };
    axios.post(uri, request).then((data) => {
      setResult({ status: data.status, message: "User Created Successfully" });
    }).catch((error) => {
      const errorMessage = error.response.data;
      setResult({ status: errorMessage.statusCode, message: errorMessage.description });
    });
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault() }}>
        <h4>Sign Up</h4>
        {result.message &&
        <div className="form-group">
          <label style={{color: result.status === 200 ? 'green' : 'red'}} className="form-label">{result.message}</label>
        </div>
        }
        <div className="form-group">
          <input id="registerEmail" type="text" className="form-control" placeholder="Email" required name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <input id="registerPassword" type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          {(!isValidPass || !password) &&
            <PasswordValidator password={password} validatorcb={validatorCallback} />
          }
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="marketingCheckBox" onChange={e => { setMarketing(e.target.checked) }} />
          <label className="form-check-label" htmlFor="marketingCheckBox">Sign me up for exclusives</label>
        </div>

        <button type="submit" disabled={!isValidPass} className="btn btn-primary" onClick={createUser}>Submit</button>
      </form>


      {/* <pre>{JSON.stringify({ Email: email, Password: password, Marketing: marketing, Btn: isValidPass }, null, 4)}</pre> */}


    </div>

  );

}

export default Register;