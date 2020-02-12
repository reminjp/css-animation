import * as React from 'react';
import { Work } from './Work';
import './WorkListView.scss';

interface Props {
  works: Work[];
  activeWorkName?: string;
  onClick(name: string): void;
}

export const WorkListView: React.FC<Props> = props => {
  return (
    <div className="work-list">
      {props.works
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(work => (
          <div
            key={work.name}
            className={
              work.name === props.activeWorkName
                ? 'work-list__item work-list__item--active'
                : 'work-list__item'
            }
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
