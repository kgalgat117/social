import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import { userSignUp } from './services/Congnito.service.';

// let cognitoService: CognitoService

function App() {

  const createUser = () => {
    let data = {
      username: 'kgalgat117',
      password: 'Password#123',
      email: 'kgalgat117@gmail.com',
      phone_number: '+15555555555'
    }
    // CognitoService
    userSignUp(data).then(result => {
      console.log(result)
    }, error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={createUser}>create User</Button>
      </header>
    </div>
  );
}

export default App;
