import { Schema, model, models, Types } from 'mongoose';
import { Tournament } from '@/features/champions/types';
export interface ChampionDocument extends Document {
  team: Types.ObjectId;
  tournament: Tournament;
  year: number;
}

export const championsSchema = new Schema<ChampionDocument>(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
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

export const Champion = models.Champion || model<ChampionDocument>('Champion', championsSchema);
