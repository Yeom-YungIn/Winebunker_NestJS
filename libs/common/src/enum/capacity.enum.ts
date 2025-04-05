export enum Capacity {
  Capacity150 = 150,
  Capacity300 = 300,
  Capacity750 = 750,
}

export const CapacityType = {
  CAPACITY_150: 150,
  CAPACITY_300: 300,
  CAPACITY_700: 750,
} as const;


export type CapacityType = (typeof CapacityType)[keyof typeof CapacityType]