import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactResizeDetector from 'react-resize-detector';
import { Work } from './Work';
import './WorkPlayerView.scss';

const DEFAULT_ASPECT_RATIO = 16 / 9;

interface Props {
  work?: Work;
}

export const WorkPlayerView: React.FC<Props> = props => {
  const iframeRef = React.useRef<HTMLIFrameElement>();

  const handleReload = React.useCallback(() => {
    iframeRef.current?.contentDocument.location.reload();
  }, [iframeRef]);

  const [width, setWidth] = React.useState(1);
  const [height, setHeight] = React.useState(1);

  const onResize = React.useCallback(
    (width: number, height: number) => {
      setWidth(width);
      setHeight(height);
    },
    [setWidth, setHeight]
  );

  const aspectRatio = props.work.aspectRatio || DEFAULT_ASPECT_RATIO;
  let [iframeWidth, iframeHeight] =
    width / height < aspectRatio
      ? [width, width / aspectRatio]
      : [height * aspectRatio, height];

  return (
    <div className="work-player">
      <div className="work-player__header">
        <div>
          <span className="work-player__name">{props.work?.name}</span>{' '}
          {props.work?.date}
        </div>
        <div className="work-player__reload">
          <button onClick={handleReload}>
            <FontAwesomeIcon icon="redo" size="lg" />
          </button>
        </div>
      </div>
      <div className="work-player__main">
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
        <iframe
          key={props.work?.name}
          ref={iframeRef}
          className="work-player__iframe"
          style={{ width: iframeWidth, height: iframeHeight }}
          src={props.work?.pageSrc}
        ></iframe>
      </div>
    </div>
  );
};
