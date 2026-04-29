export type FrameBackgroundPreset = {
  id: string;
  name: string;
  src: string;
};

// Add future frame background images under src/assets/frame-backgrounds/ and register them here.
export const frameBackgroundPresets: FrameBackgroundPreset[] = [];

export const DEFAULT_FRAME_BACKGROUND_COLOR = '#f8fafc';
