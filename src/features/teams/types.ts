export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface ITeam {
  name: string;
  score: number;
  badge?: string;
  matchesPlayed: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnedTeam extends ITeam {
  _id: string;
}
