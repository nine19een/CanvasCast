type FloatingControlBarProps = {
  onOpenSettings: () => void;
  onEnterPreparing: () => void;
  onCancelPreparing: () => void;
  onStartRecording: () => void;
  onPauseRecording: () => void;
  onResumeRecording: () => void;
  onStopRecording: () => void;
  onToggleTeleprompter: () => void;
  recordingStatus: 'idle' | 'preparing' | 'recording' | 'paused';
  recordingElapsedLabel: string;
};

function FloatingControlBar({
  onOpenSettings,
  onEnterPreparing,
  onCancelPreparing,
  onStartRecording,
  onPauseRecording,
  onResumeRecording,
  onStopRecording,
  onToggleTeleprompter,
  recordingStatus,
  recordingElapsedLabel,
}: FloatingControlBarProps) {
  return (
    <div className="floating-controls">
      {recordingStatus === 'idle' ? (
        <>
          <button type="button" className="floating-controls__button" onClick={onOpenSettings}>
            {'\u8bbe\u7f6e'}
          </button>
          <button type="button" className="floating-controls__button" onClick={onToggleTeleprompter}>
            {'\u63d0\u8bcd\u5668'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--record" onClick={onEnterPreparing}>
            {'\u5f55\u5236'}
          </button>
        </>
      ) : null}

      {recordingStatus === 'preparing' ? (
        <>
          <button type="button" className="floating-controls__button" onClick={onToggleTeleprompter}>
            {'\u63d0\u8bcd\u5668'}
          </button>
          <button type="button" className="floating-controls__button" onClick={onCancelPreparing}>
            {'\u53d6\u6d88'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--start" onClick={onStartRecording}>
            {'\u5f00\u59cb\u5f55\u5236'}
          </button>
        </>
      ) : null}

      {recordingStatus === 'recording' ? (
        <>
          <button type="button" className="floating-controls__button" onClick={onToggleTeleprompter}>
            {'\u63d0\u8bcd\u5668'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--pause" onClick={onPauseRecording}>
            {'\u6682\u505c'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--stop" onClick={onStopRecording}>
            {'\u505c\u6b62'}
          </button>
          <span className="floating-controls__timer"><span />{recordingElapsedLabel}</span>
        </>
      ) : null}

      {recordingStatus === 'paused' ? (
        <>
          <button type="button" className="floating-controls__button" onClick={onToggleTeleprompter}>
            {'\u63d0\u8bcd\u5668'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--start" onClick={onResumeRecording}>
            {'\u7ee7\u7eed'}
          </button>
          <button type="button" className="floating-controls__button floating-controls__button--stop" onClick={onStopRecording}>
            {'\u505c\u6b62'}
          </button>
          <span className="floating-controls__timer floating-controls__timer--paused"><span />{recordingElapsedLabel}</span>
        </>
      ) : null}
    </div>
  );
}

export default FloatingControlBar;
