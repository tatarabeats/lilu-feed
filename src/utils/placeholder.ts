const GRADIENTS = [
  'placeholder-gradient-1',
  'placeholder-gradient-2',
  'placeholder-gradient-3',
  'placeholder-gradient-4',
  'placeholder-gradient-5',
];

export function getPlaceholderClass(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}
