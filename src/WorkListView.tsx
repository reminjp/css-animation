import * as React from 'react';
import { Work } from './Work';
import './WorkListView.scss';

interface Props {
  works: Work[];
  onClick(name: string): void;
}

export const WorkListView: React.FC<Props> = props => {
  return (
    <div className="work-list">
      {props.works.map(work => (
        <div
          key={work.name}
          className="work-list__item"
          onClick={() => {
            if (typeof props.onClick === 'function') props.onClick(work.name);
          }}
        >
          {work.name}
        </div>
      ))}
    </div>
  );
};
