// Image
import cloudWarmCasino from '@assets/images/cloud_warmcasino.png';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="page404">
      <h1 className='page404__title'>Error 404. The page does not exist</h1>
      <p className='page404__text'>
        Sorry! The page you are looking for can not be found. Perhaps the page
        you requested was moved or deleted. It is also possible that you made a
        small typo when entering the address. Go to the main page.
      </p>
      <div className="page404__wrapper">
        <img src={cloudWarmCasino} alt="cloud warm casino" />
        <div className="page404__el"></div>
        <div className="page404__el"></div>
        <div className="page404__el"></div>
        <Link to="/" className="page404__link">
          Go home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
