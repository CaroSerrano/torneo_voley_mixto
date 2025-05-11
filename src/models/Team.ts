import { Schema, model, models } from 'mongoose';
import { ITeam } from '@/types';

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true, trim: true },
  score: { type: Number, required: true, default: 0 },
  badge: { type: String },
});

export default models.Team || model<ITeam>('Team', teamSchema);
