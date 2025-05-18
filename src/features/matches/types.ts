import { ReturnedTeam } from '../teams/types';

export interface IMatch {
  teamA: ReturnedTeam;
  teamAscore: number;
  teamB: ReturnedTeam;
  teamBscore: number;
  date: string;
  matchday: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnedMatch extends IMatch {
  _id: string;
}

export interface CreatedMatch {
  _id: string;
  teamA: string;
  teamAscore: number;
  teamB: string;
  teamBscore: number;
  date: string;
  matchday: number;
  createdAt: string;
  updatedAt: string;
}
