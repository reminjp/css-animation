import * as React from 'react';
import './HeaderView.scss';

export const HeaderView: React.FC = () => {
  return (
    <div className="header">
      <div>
        <span className="header__brand">CSS Animations</span> by remin
      </div>
      <div>
        <a href="https://github.com/rdrgn/css-animation">GitHub</a>
      </div>
    </div>
  );
};
