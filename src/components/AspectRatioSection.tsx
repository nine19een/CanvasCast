import type { AspectRatioItem } from '../mockOptions';

type AspectRatioSectionProps = {
  options: AspectRatioItem[];
  selectedKey: string;
  onSelect: (value: AspectRatioItem['key']) => void;
};

function AspectRatioSection({ options, selectedKey, onSelect }: AspectRatioSectionProps) {
  return (
    <div className="section-block">
      <div className="section-title">画面比例</div>
      <div className="option-grid">
        {options.map((item) => (
          <button
            type="button"
            key={item.key}
            className={`option-button ${selectedKey === item.key ? 'option-button--active' : ''}`}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AspectRatioSection;
