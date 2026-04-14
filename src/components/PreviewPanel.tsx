import { useEffect, useMemo, useRef, useState } from 'react';
import type { BackgroundSwatch } from '../mockOptions';

type PreviewPanelProps = {
  aspectRatio: number;
  background: BackgroundSwatch;
  cameraEnabled: boolean;
};

type StageSize = {
  width: number;
  height: number;
};

const PREVIEW_TITLE_GAP = 18;

function PreviewPanel({ aspectRatio, background, cameraEnabled }: PreviewPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [panelSize, setPanelSize] = useState<StageSize>({ width: 0, height: 0 });
  const [titleHeight, setTitleHeight] = useState(0);

  useEffect(() => {
    const panelNode = panelRef.current;
    const titleNode = titleRef.current;

    if (!panelNode || !titleNode) {
      return;
    }

    const updateMeasurements = () => {
      setPanelSize({
        width: Math.max(panelNode.clientWidth, 0),
        height: Math.max(panelNode.clientHeight, 0),
      });
      setTitleHeight(Math.max(titleNode.clientHeight, 0));
    };

    updateMeasurements();

    const observer = new ResizeObserver(() => {
      updateMeasurements();
    });

    observer.observe(panelNode);
    observer.observe(titleNode);

    return () => observer.disconnect();
  }, []);

  const frameSize = useMemo(() => {
    const safeRatio = Math.max(aspectRatio, 0.1);
    const availableWidth = Math.max(panelSize.width, 0);
    const availableHeight = Math.max(panelSize.height - titleHeight - PREVIEW_TITLE_GAP, 0);

    if (!availableWidth || !availableHeight) {
      return { width: 0, height: 0 };
    }

    let width = availableWidth;
    let height = width / safeRatio;

    if (height > availableHeight) {
      height = availableHeight;
      width = height * safeRatio;
    }

    return {
      width: Math.round(width),
      height: Math.round(height),
    };
  }, [aspectRatio, panelSize.height, panelSize.width, titleHeight]);

  return (
    <div ref={panelRef} className="preview-panel">
      <div className="preview-stage-group">
        <div ref={titleRef} className="preview-title">
          预览
        </div>
        <div className="composition-stage">
          <div
            className="composition-frame"
            style={{ width: `${frameSize.width}px`, height: `${frameSize.height}px` }}
          >
            <div className="composition-background" style={{ background: background.color }}>
              <div className="whiteboard-canvas">
                <div className="canvas-header">
                  <span className="canvas-dot" />
                  <span className="canvas-dot" />
                  <span className="canvas-dot" />
                </div>
                <div className="canvas-body">
                  <div className="canvas-card">
                    <div className="card-title" />
                    <div className="card-line short" />
                    <div className="card-line" />
                    <div className="card-line" />
                    <div className="card-line small" />
                  </div>
                </div>
                {cameraEnabled && (
                  <div className="camera-preview">
                    <div className="camera-label">Camera</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPanel;
