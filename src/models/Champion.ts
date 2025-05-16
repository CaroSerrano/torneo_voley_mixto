import { Schema, model, models } from 'mongoose';
import { Tournament, Champions } from '@/features/champions/types';


export const championsSchema = new Schema<Champions>(
  {
    team: { type: String, required: true },
    tournament: { type: String, enum: Object.values(Tournament) },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);

export default models.Champion || model<Champions>('Champion', championsSchema);
