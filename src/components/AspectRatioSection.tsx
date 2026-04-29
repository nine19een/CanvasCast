import type { AspectRatioItem } from '../mockOptions';

type AspectRatioSectionProps = {
  options: AspectRatioItem[];
  selectedKey: string;
  onSelect: (value: AspectRatioItem['key']) => void;
  showTitle?: boolean;
};

const aspectRatioDescriptions: Record<string, string> = {
  '16:9': 'YouTube / B站',
  '4:3': '经典',
  '3:4': '小红书',
  '9:16': '抖音',
  '1:1': '正方形',
  custom: '自定义',
};

function getAspectDescription(item: AspectRatioItem) {
  return aspectRatioDescriptions[item.label] ?? aspectRatioDescriptions[item.key] ?? '';
}

function AspectRatioSection({ options, selectedKey, onSelect, showTitle = true }: AspectRatioSectionProps) {
  return (
    <div className="section-block section-block--compact">
      {showTitle ? <div className="section-title">画布比例</div> : null}
      <div className="option-grid option-grid--aspect-ratio">
        {options.map((item) => {
          const description = getAspectDescription(item);

          return (
            <button
              type="button"
              key={item.key}
              className={`option-button option-button--aspect-ratio ${selectedKey === item.key ? 'option-button--active' : ''}`}
              onClick={() => onSelect(item.key)}
            >
              <span className="option-button__title">{item.label}</span>
              {description ? <span className="option-button__subtitle">{description}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AspectRatioSection;
