type CameraSectionProps = {
  enabled: boolean;
  onToggle: () => void;
};

function CameraSection({ enabled, onToggle }: CameraSectionProps) {
  return (
    <div className="section-block">
      <div className="section-title">摄像头</div>
      <div className="camera-control">
        <div>
          <div className="camera-label">摄像头小窗</div>
          <p className="camera-note">开启后会在预览画布中显示摄像头占位。</p>
        </div>
        <button
          type="button"
          className={`toggle-switch ${enabled ? 'toggle-switch--on' : ''}`}
          onClick={onToggle}
          aria-pressed={enabled}
        >
          <span className="toggle-thumb" />
        </button>
      </div>
    </div>
  );
}

export default CameraSection;
