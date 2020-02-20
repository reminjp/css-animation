import * as React from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { HeaderView } from './HeaderView';
import { HomeView } from './HomeView';
import { Work } from './Work';
import { WorkListView } from './WorkListView';
import { WorkPlayerView } from './WorkPlayerView';
import './index.scss';

declare const WORKS: any;

interface Props {
  works: Work[];
}

const App: React.FC<Props> = props => {
  return (
    <Router>
      <div className="app">
        <div className="app__header">
          <HeaderView />
        </div>
        <div className="app__sidebar">
          <WorkListView works={props.works} />
        </div>
        <div className="app__main">
          <Switch>
            {props.works.map(work => (
              <Route key={work.name} path={`/work/${work.name}/`}>
                <WorkPlayerView work={work} />
              </Route>
            ))}
            <Route path="/">
              <HomeView />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

library.add(faGithub, faRedo);

render(<App works={WORKS} />, document.getElementById('root'));
