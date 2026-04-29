export type AspectRatioItem = {
  key: '16:9' | '4:3' | '3:4' | '9:16' | '1:1';
  label: string;
  ratio: number;
};

export const aspectRatioOptions: AspectRatioItem[] = [
  { key: '16:9', label: '16:9', ratio: 16 / 9 },
  { key: '4:3', label: '4:3', ratio: 4 / 3 },
  { key: '3:4', label: '3:4', ratio: 3 / 4 },
  { key: '9:16', label: '9:16', ratio: 9 / 16 },
  { key: '1:1', label: '1:1', ratio: 1 },
];
