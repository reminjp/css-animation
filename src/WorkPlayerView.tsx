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

  const [iframeWidth, setIframeWidth] = React.useState(1);
  const [iframeHeight, setIframeHeight] = React.useState(1);

  const onResize = React.useCallback(
    (width: number, height: number) => {
      if (width / height < DEFAULT_ASPECT_RATIO) {
        setIframeWidth(width);
        setIframeHeight(width / DEFAULT_ASPECT_RATIO);
      } else {
        setIframeWidth(height * DEFAULT_ASPECT_RATIO);
        setIframeHeight(height);
      }
    },
    [setIframeWidth, setIframeHeight]
  );

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
