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
      <iframe
        className="work-player__iframe"
        src={props.work?.pageSrc}
      ></iframe>
    </div>
  );
};
