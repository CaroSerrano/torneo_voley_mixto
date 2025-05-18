import { BracketDocument } from "@/models/Bracket";

export interface ReturnedBracket extends BracketDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
