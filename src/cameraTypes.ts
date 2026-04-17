export type CameraShape = 'circle' | 'square';

export type CameraSettings = {
  enabled: boolean;
  size: number;
  shape: CameraShape;
  videoDeviceId: string;
  audioDeviceId: string;
  position: {
    x: number;
    y: number;
  };
};

export type MediaDeviceChoice = {
  deviceId: string;
  label: string;
};

export type CursorEffect = 'none' | 'cursor' | 'highlight';

export type RecordingVisualSettings = {
  canvasRadius: number;
  canvasPadding: number;
  cursorEffect: CursorEffect;
};

export const DEFAULT_CAMERA_SETTINGS: CameraSettings = {
  enabled: false,
  size: 160,
  shape: 'circle',
  videoDeviceId: '',
  audioDeviceId: '',
  position: {
    x: 0.78,
    y: 0.72,
  },
};

export const DEFAULT_RECORDING_VISUAL_SETTINGS: RecordingVisualSettings = {
  canvasRadius: 0,
  canvasPadding: 48,
  cursorEffect: 'cursor',
};
