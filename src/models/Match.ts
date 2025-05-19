import mongoose, { Schema, Document, Types  } from 'mongoose';


export interface MatchDocument extends Document {
  teamA: Types.ObjectId;
  teamAscore?: number;
  teamB: Types.ObjectId;
  teamBscore?: number;
  date?: Date;
  matchday:number;
}

const MatchSchema = new Schema<MatchDocument>({
  teamA: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamAscore: { type: Number, default: 0 },
  teamB: { type: Schema.Types.ObjectId, ref: 'Team' },
  teamBscore: { type: Number, default: 0 },
  date: { type: Date },
  matchday: {type: Number, required: true}
});

export const Match =
  mongoose.models.Match || mongoose.model<MatchDocument>('Match', MatchSchema);
