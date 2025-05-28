import { Schema, model, models } from 'mongoose';
import { ITeam, Status } from '@/features/teams/types';

export const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    badge: { type: String },
    matchesPlayed: { type: Number, default: 0},
    status: {type: String, enum: Object.values(Status), default: Status.ACTIVE}
  },
  { timestamps: true }
);

export default models.Team || model<ITeam>('Team', teamSchema);
