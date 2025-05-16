import { Schema, model, models } from 'mongoose';

interface TeamMember {
  name: string;
  position: string;
  team: string;
}

interface TeamOfTheyear {
  members: TeamMember[];
  year: number;
}

export const teamOfTheYearSchema = new Schema<TeamOfTheyear>(
  {
    members: [
      {
        name: { type: String, required: true },
        position: { type: String, required: true },
        team: { type: String, required: true },
      },
    ],
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);

export default models.TeamOfTheYear ||
  model<TeamOfTheyear>('TeamOfTheYear', teamOfTheYearSchema);
