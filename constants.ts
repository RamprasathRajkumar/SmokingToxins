import { SubstanceKey } from './types';

export const SUBSTANCE_KEYS: SubstanceKey[] = ['nicotine', 'tar', 'carbonMonoxide', 'formaldehyde', 'hydrogenCyanide', 'benzene', 'cadmium'];

// NOTE: Max values are set to create a reasonable scale for daily tracking (e.g., around 1-2 packs of high-yield cigarettes).
// These are for visualization purposes and are not official health guidelines.
export const SUBSTANCE_CONFIG: Record<SubstanceKey, { name: string; max: number; warning: number; dangerous: number; unit: string }> = {
  nicotine: { name: 'Nicotine', max: 40, warning: 15, dangerous: 25, unit: 'mg' },
  tar: { name: 'Tar', max: 200, warning: 80, dangerous: 140, unit: 'mg' },
  carbonMonoxide: { name: 'Carbon Monoxide', max: 200, warning: 80, dangerous: 140, unit: 'mg' },
  formaldehyde: { name: 'Formaldehyde', max: 2, warning: 0.8, dangerous: 1.5, unit: 'mg' },
  hydrogenCyanide: { name: 'Hydrogen Cyanide', max: 15, warning: 6, dangerous: 10, unit: 'mg' },
  benzene: { name: 'Benzene', max: 1.5, warning: 0.6, dangerous: 1, unit: 'mg' },
  cadmium: { name: 'Cadmium', max: 0.04, warning: 0.015, dangerous: 0.03, unit: 'mg' },
};
