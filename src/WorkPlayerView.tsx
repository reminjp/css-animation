import * as React from 'react';
import { Work } from './Work';
import './WorkPlayerView.scss';

interface Props {
  work?: Work;
  visible?: boolean;
  handleClose(): void;
}

export const WorkPlayerView: React.FC<Props> = props => {
  return (
    <div className="work-player">
      <div className="work-player__header">
        <div>
          <span className="work-player__name">{props.work?.name}</span>{' '}
          {props.work?.date}
        </div>
        <div>
          <button>Reload</button>
        </div>
      </div>
      <iframe
        className="work-player__iframe"
        src={props.work?.pageSrc}
      ></iframe>
    </div>
  );
};
