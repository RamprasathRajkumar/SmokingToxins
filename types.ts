export type SubstanceKey = 'nicotine' | 'tar' | 'carbonMonoxide' | 'formaldehyde' | 'hydrogenCyanide' | 'benzene' | 'cadmium';

export interface SubstanceContent {
  nicotine: number;
  tar: number;
  carbonMonoxide: number;
  formaldehyde: number;
  hydrogenCyanide: number;
  benzene: number;
  cadmium: number;
}

export interface CigaretteEntry {
  id: string;
  brand: string;
  quantity: number;
  substancesPerCigarette: SubstanceContent;
  totalSubstances: SubstanceContent;
  timestamp: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD format
  entries: CigaretteEntry[];
}
