export const UNITS = {
  NONE: '',
  TBSP: 'tbsp',
  TSP: 'tsp',
  CUPS: 'cups',
  L: 'L',
  ML: 'ml',
  KG: 'kg',
  G: 'g',
  OZ: 'oz',
  LB: 'lb',
} as const;

export type UnitType = (typeof UNITS)[keyof typeof UNITS];

export const UNIT_ALIASES: Record<string, UnitType> = {
  // Cups
  cup: UNITS.CUPS,
  cups: UNITS.CUPS,
  // Tablespoons
  tbsp: UNITS.TBSP,
  tbsps: UNITS.TBSP,
  tablespoon: UNITS.TBSP,
  tablespoons: UNITS.TBSP,
  // Teaspoons
  tsp: UNITS.TSP,
  tsps: UNITS.TSP,
  teaspoon: UNITS.TSP,
  teaspoons: UNITS.TSP,
  // Weight
  g: UNITS.G,
  gram: UNITS.G,
  grams: UNITS.G,
  kg: UNITS.KG,
  kilogram: UNITS.KG,
  kilograms: UNITS.KG,
  oz: UNITS.OZ,
  ounce: UNITS.OZ,
  ounces: UNITS.OZ,
  lb: UNITS.LB,
  lbs: UNITS.LB,
  pound: UNITS.LB,
  pounds: UNITS.LB,
  // Volume
  ml: UNITS.ML,
  milliliter: UNITS.ML,
  milliliters: UNITS.ML,
  l: UNITS.L,
  liter: UNITS.L,
  liters: UNITS.L,
};

export const normalizeUnit = (rawUnit: string): string => {
  if (!rawUnit) return UNITS.NONE;

  const cleaned = rawUnit.trim().toLowerCase().replace(/\.$/, '');

  return UNIT_ALIASES[cleaned] ?? cleaned;
};

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const;
