import { Schema, model, models, Document } from 'mongoose';

export interface BracketDocument extends Document {
  position: number;
  teamName: string;
}

export const bracketSchema = new Schema<BracketDocument>(
  {
    position: { type: Number, required: true },
    teamName: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Bracket ||
  model<BracketDocument>('Bracket', bracketSchema);
