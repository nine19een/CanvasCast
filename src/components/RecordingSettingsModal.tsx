import { useMemo, useState } from 'react';
import AspectRatioSection from './AspectRatioSection';
import BackgroundSection from './BackgroundSection';
import CameraSection from './CameraSection';
import type { CameraSettings, MediaDeviceChoice, RecordingVisualSettings } from '../cameraTypes';
import PreviewPanel from './PreviewPanel';
import {
  aspectRatioOptions,
  backgroundCategories,
  backgroundOptions,
} from '../mockOptions';

const CANVAS_PADDING_MAX = 80;

type RecordingSettingsModalProps = {
  activeAspect: string;
  onAspectChange: (aspect: string) => void;
  activeBackgroundId: string;
  onBackgroundChange: (backgroundId: string) => void;
  recordingVisualSettings: RecordingVisualSettings;
  onRecordingVisualSettingsChange: (patch: Partial<RecordingVisualSettings>) => void;
  cameraSettings: CameraSettings;
  onCameraSettingsChange: (patch: Partial<CameraSettings>) => void;
  videoDevices: MediaDeviceChoice[];
  audioDevices: MediaDeviceChoice[];
  cameraStream: MediaStream | null;
  mediaError: string | null;
  onRefreshDevices: () => void;
  onClose?: () => void;
};

function RecordingSettingsModal({
  activeAspect,
  onAspectChange,
  activeBackgroundId,
  onBackgroundChange,
  recordingVisualSettings,
  onRecordingVisualSettingsChange,
  cameraSettings,
  onCameraSettingsChange,
  videoDevices,
  audioDevices,
  cameraStream,
  mediaError,
  onRefreshDevices,
  onClose,
}: RecordingSettingsModalProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const selectedBackground = useMemo(
    () => backgroundOptions.find((option) => option.id === activeBackgroundId) ?? backgroundOptions[0],
    [activeBackgroundId]
  );

  const filteredBackgrounds = useMemo(
    () =>
      activeCategory === 'all'
        ? backgroundOptions
        : backgroundOptions.filter((option) => option.category === activeCategory),
    [activeCategory]
  );

  const activeAspectItem = aspectRatioOptions.find((option) => option.key === activeAspect) ?? aspectRatioOptions[4];

  const handleRandomBackground = () => {
    const current = filteredBackgrounds[Math.floor(Math.random() * filteredBackgrounds.length)];
    if (current) {
      onBackgroundChange(current.id);
    }
  };

  return (
    <div className="modal-shell">
      <div className="modal-layout">
        <section className="preview-column">
          <div className="preview-content-group">
              <PreviewPanel
                aspectRatio={activeAspectItem.ratio}
                background={selectedBackground}
                visualSettings={recordingVisualSettings}
                cameraSettings={cameraSettings}
                cameraStream={cameraStream}
              />
          </div>
        </section>

        <section className="settings-column">
          <div className="settings-header">
            <div className="settings-header-row">
              <div className="settings-title">瑜版洖鍩楃拋鍓х枂</div>
              <button type="button" className="close-button" aria-label="关闭" onClick={onClose}>
                ×
              </button>
            </div>
          </div>

          <div className="settings-content">
            <div className="settings-scroll">
              <div className="settings-group settings-group--section">
                <AspectRatioSection
                  options={aspectRatioOptions}
                  selectedKey={activeAspect}
                  onSelect={onAspectChange}
                />
              </div>

              <div className="settings-group settings-group--section">
                <BackgroundSection
                  categories={backgroundCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  options={filteredBackgrounds}
                  selectedBackgroundId={activeBackgroundId}
                  onSelectBackground={onBackgroundChange}
                  onRandomSelect={handleRandomBackground}
                />
              </div>

              <div className="settings-group settings-group--section">
                <CameraSection
                  settings={cameraSettings}
                  onChange={onCameraSettingsChange}
                  videoDevices={videoDevices}
                  audioDevices={audioDevices}
                  mediaError={mediaError}
                  onRefreshDevices={onRefreshDevices}
                />
              </div>

              <div className="settings-group settings-group--section">
                <CanvasStyleSection settings={recordingVisualSettings} onChange={onRecordingVisualSettingsChange} />
              </div>

              <div className="settings-group settings-group--section">
                <CursorEffectSection settings={recordingVisualSettings} onChange={onRecordingVisualSettingsChange} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CanvasStyleSection({
  settings,
  onChange,
}: {
  settings: RecordingVisualSettings;
  onChange: (patch: Partial<RecordingVisualSettings>) => void;
}) {
  const canvasPaddingValue = Math.min(settings.canvasPadding, CANVAS_PADDING_MAX);

  return (
    <div className="section-block">
      <div className="section-title">鐢诲竷鏍峰紡</div>
      <label className="camera-setting-field camera-setting-field--range">
        <span className="setting-field-title">鍦嗚鍗婂緞 - {settings.canvasRadius}px</span>
        <span>鍦嗚鍗婂緞</span>
        <input
          type="range"
          min="0"
          max="80"
          step="4"
          value={settings.canvasRadius}
          onChange={(event) => onChange({ canvasRadius: Number(event.target.value) })}
        />
        <strong>{settings.canvasRadius}px</strong>
      </label>
      <label className="camera-setting-field camera-setting-field--range">
        <span className="setting-field-title">鐢诲竷杈硅窛 - {canvasPaddingValue}px</span>
        <span>鐢诲竷杈硅窛</span>
        <input
          type="range"
          min="0"
          max={CANVAS_PADDING_MAX}
          step="8"
          value={canvasPaddingValue}
          onChange={(event) => onChange({ canvasPadding: Number(event.target.value) })}
        />
        <strong>{canvasPaddingValue}px</strong>
      </label>
    </div>
  );
}

function CursorEffectSection({
  settings,
  onChange,
}: {
  settings: RecordingVisualSettings;
  onChange: (patch: Partial<RecordingVisualSettings>) => void;
}) {
  return (
    <div className="section-block">
      <div className="section-title">鍏夋爣鏁堟灉</div>
      <div className="camera-shape-options" role="group" aria-label="鍏夋爣鏁堟灉">
        <button
          type="button"
          className={`camera-shape-option ${settings.cursorEffect === 'none' ? 'camera-shape-option--active' : ''}`}
          onClick={() => onChange({ cursorEffect: 'none' })}
        >
          涓嶆樉绀?        </button>
        <button
          type="button"
          className={`camera-shape-option ${settings.cursorEffect === 'cursor' ? 'camera-shape-option--active' : ''}`}
          onClick={() => onChange({ cursorEffect: 'cursor' })}
        >
          榛樿鍏夋爣
        </button>
        <button
          type="button"
          className={`camera-shape-option ${settings.cursorEffect === 'highlight' ? 'camera-shape-option--active' : ''}`}
          onClick={() => onChange({ cursorEffect: 'highlight' })}
        >
          高亮光标
        </button>
      </div>
    </div>
  );
}

export default RecordingSettingsModal;



