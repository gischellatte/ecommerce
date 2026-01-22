import {useNavigate } from 'react-router'
import classes from '../ThankYouPage/ThankYouPage.module.scss';
import hanokImage from '../../assets/hanok_2000px_2000px.jpg'

export default function ThankYouPage() {
const navigate= useNavigate();
const backToHome =()=>{
    navigate('/')
  }
return(
    <>
    <div>
        <img src={hanokImage} alt="Hanok Cartoon"/>
    </div>
    <p className={classes.message__thankYou}>Thank you for choosing us </p>
    <div>
        <button onClick={backToHome}>Back to the Homepage</button>
    </div>
    </>
    )
}