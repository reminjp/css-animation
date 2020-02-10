import * as React from 'react';
import { render } from 'react-dom';
import { HeaderView } from './HeaderView';
import { Work } from './Work';
import { WorkListView } from './WorkListView';
import { WorkPlayerView } from './WorkPlayerView';
import './index.scss';

declare const WORKS: any;

interface Props {
  works: Work[];
}

const App: React.FC<Props> = props => {
  const [work, setWork] = React.useState<Work>(props.works[0]);
  const [playerVisible, setPlayerVisible] = React.useState(false);

  const setWorkWithName = React.useCallback(
    (name: string) => {
      setWork(props.works.find(e => e.name === name));
    },
    [props.works]
  );

  return (
    <div className="app">
      <div className="app__header">
        <HeaderView />
      </div>
      <div className="app__sidebar">
        <WorkListView works={props.works} onClick={setWorkWithName} />
      </div>
      <div className="app__main">
        <WorkPlayerView
          work={work}
          visible={playerVisible}
          handleClose={() => setPlayerVisible(false)}
        />
      </div>
    </div>
  );
};

render(<App works={WORKS} />, document.getElementById('root'));
