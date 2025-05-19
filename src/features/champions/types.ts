import { ReturnedTeam } from "../teams/types";

export enum Tournament {
  Apertura = 'Apertura',
  Clausura = 'Clausura',
}

export interface IChampions {
  team: ReturnedTeam;
  tournament: Tournament;
  year: number;
}

export interface ReturnedChampion extends IChampions {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
