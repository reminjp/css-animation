import * as React from 'react';
import { Link } from 'react-router-dom';
import { Work } from './Work';
import './WorkListView.scss';

interface Props {
  works: Work[];
  activeWorkName?: string;
}

export const WorkListView: React.FC<Props> = props => {
  return (
    <div className="work-list">
      {props.works
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(work => (
          <Link
            key={work.name}
            className={
              work.name === props.activeWorkName
                ? 'work-list__item work-list__item--active'
                : 'work-list__item'
            }
            to={`/work/${work.name}/`}
          >
            {work.name}
          </Link>
        ))}
    </div>
  );
};
