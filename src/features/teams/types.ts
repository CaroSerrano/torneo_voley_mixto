export interface ITeam {
  name: string;
  score: number;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnedTeam extends ITeam {
  _id: string;
}