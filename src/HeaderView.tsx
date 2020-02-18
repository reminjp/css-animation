import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HeaderView.scss';

export const HeaderView: React.FC = () => {
  return (
    <div className="header">
      <div>
        <span className="header__brand">CSS Animation</span> (c) remin
      </div>
      <div>
        <a href="https://github.com/rdrgn/css-animation">
          <FontAwesomeIcon icon={['fab', 'github']} size="lg" />
        </a>
      </div>
    </div>
  );
};
