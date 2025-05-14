import { Schema, model, models } from 'mongoose';
import { ITeam } from '@/features/teams/types';

export const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    badge: { type: String },
  },
  { timestamps: true }
);

export default models.Team || model<ITeam>('Team', teamSchema);
