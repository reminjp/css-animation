import * as React from 'react';
import { render } from 'react-dom';
import { Work } from './Work';

declare const WORKS: any;
const works: Work[] = WORKS;

const App: React.FC = () => {
  return (
    <div>
      {works.map((e, i) => (
        <div key={i}>
          {JSON.stringify(e)}
          <iframe src={e.pageSrc}></iframe>
        </div>
      ))}
    </div>
  );
};

render(<App />, document.getElementById('root'));
