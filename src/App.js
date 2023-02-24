import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login-page/LoginPage';
import LtNavBar from './components/LtNavBar';
import TranslationPage from './pages/translation-page/TranslationPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import TranslationProvidor from './context/TranslationProvider';

// TranslationProvider wraps the application in order to provide
// the appropriate context to all components/pages
// The Translation and Profile page are wrapped inside the
// nav route to make the NavBar always visible

function App() {
  return (
    <div className="app">
      <div className='app-centered-container'>
        <BrowserRouter>
          <TranslationProvidor>
            <Routes>
              <Route path='/'>
                <Route index element={<LoginPage/>}/>
                <Route path='nav'  element={<LtNavBar/>}>
                  <Route path='translate' element={<TranslationPage/>}/>
                  <Route path='profile' element={<ProfilePage/>}/>
                </Route>
              </Route>
            </Routes>
          </TranslationProvidor>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
