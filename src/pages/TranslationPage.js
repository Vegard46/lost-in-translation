import LtSubmitWidget from '../components/LtSubmitWidget';
import LtImageRow from '../components/LtImageRow';
import hands_images from '../hands_images';
import './translation-page.css';

function TranslationPage() {

  const imageRow1 = [hands_images.hand1, hands_images.hand2, hands_images.hand1, hands_images.hand4]
  const imageRow2 = [hands_images.hand1, hands_images.hand2]
  const imageRow3 = [hands_images.hand3, hands_images.hand2, hands_images.hand3]

  const rows = [imageRow1, imageRow2, imageRow3]

  return (
    <div className="translation-page">
      <LtSubmitWidget text='Translate a phrase...'/>
      <div className='translation-container'>
          {rows.map((e, index) => {
            return index < rows.length-1 
            ? <div className='row-container'>
                <LtImageRow images={e}/>
                <i class="fa fa-plus image-add" aria-hidden="true"/>
              </div> 
            : <div className='row-container'>
                <LtImageRow images={e}/>
              </div>
          })}
      </div>
    </div>
  );
}

export default TranslationPage;