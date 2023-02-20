import './login-page.css';
import LtSubmitWidget from '../components/LtSubmitWidget';

function LoginPage() {
  return (
    <div className="login-page">
      <div className='image-container'>
        <img src={require('./logotrans.png')} alt='lost_in_translation'/>
      </div>
      <div className='submit-container'>
        <LtSubmitWidget/>
      </div>
    </div>
  );
}

export default LoginPage;