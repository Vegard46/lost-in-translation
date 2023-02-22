import './login-page.css';
import LtSubmitWidget from '../components/LtSubmitWidget';
import { useState } from 'react';

function LoginPage() {

  const [name, setName] = useState("");

  //const apiUrl = "https://wandering-life-jacket-goat.cyclic.app";
  //const apiKey = "WflwYc2ZmjPslA1PGTBgxmrg4l2jTBJn4zru2roEbL4bEL6ooIm9lCwsGAjvT5r6";
  const apiUrl = "http://localhost:8080";
  const apiKey = "abc";

  const login = () => {

    if(name === ""){console.log("bad name!"); return;}
    if(name.length > 15){console.log("bad name!"); return;}

    fetch(apiUrl + "/translations?username=" + name)
      .then(response => response.json())
      .then(result => {
        if(result[0] !== undefined){
          console.log("Logged in!");
        } else {
          fetch(apiUrl + "/translations", {
            method: 'POST',
            headers: {
              'X-API-Key': apiKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: name, 
                translations: [] 
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Could not create new user')
            }
            return response.json()
          })
          .then(newUser => {
            // newUser is the new user with an id
          })
          .catch(error => {
          })
          }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="login-page">
      <div className='image-container'>
        <img src={require('./logotrans.png')} alt='lost_in_translation'/>
      </div>
      <div className='submit-container'>
        <LtSubmitWidget text='What is your name?' onClick={login} onChange={setName} value={name}/>
      </div>
    </div>
  );
}

export default LoginPage;