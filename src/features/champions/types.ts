export enum Tournament {
  Apertura = 'Apertura',
  Clausura = 'Clausura',
}

export interface Champions {
  team: string;
  tournament: Tournament;
  year: number;
}

export interface ReturnedChampion extends Champions {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
