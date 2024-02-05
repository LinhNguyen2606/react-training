// Image
import cloudWarmCasino from '/images/cloud_warmcasino.png';

import { Link } from 'react-router-dom';

// Constant
import { PATH } from '@constants';

const ErrorPage = () => {
  return (
    <section className="error-page flex-column-center full-height full-width">
      <h1 className="error-page__title">Error 404. The page does not exist</h1>
      <p className="error-page__text">
        Sorry! The page you are looking for can not be found. Perhaps the page
        you requested was moved or deleted. It is also possible that you made a
        small typo when entering the address. Go to the main page.
      </p>
      <div className="error-page__wrapper">
        <img src={cloudWarmCasino} alt="cloud warm casino" />
        <div className="error-page__el"></div>
        <div className="error-page__el"></div>
        <div className="error-page__el"></div>
        <Link to={PATH.HOME_PATH} className="error-page__link">
          Go home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
