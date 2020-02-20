import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './HeaderView.scss';

export const HeaderView: React.FC = () => {
  return (
    <div className="header">
      <div>
        <Link className="header__brand" to="/">
          CSS Animation
        </Link>{' '}
        (c) remin
      </div>
      <div>
        <a href="https://github.com/rdrgn/css-animation">
          <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
        </a>
      </div>
    </div>
  );
};
