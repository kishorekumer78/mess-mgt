import { Schema, models, model } from 'mongoose';

// const messingSchema = new Schema({
//   // month: { type: Number, required: true },
//   // year: { type: Number, required: true },
//   // offr: {
//   //   type: Schema.Types.ObjectId,
//   //   ref: "Offr",
//   // },
//   // bills: [
//   //   {
//   //     type: {
//   //       day: { type: Number, min: 1, max: 31 },
//   //       BF: { type: Number, default: 0 },
//   //       L: { type: Number, default: 0 },
//   //       D: { type: Number, default: 0 },
//   //       dailyTotal: function () {
//   //         return this.BF + this.L + this.D;
//   //       },
//   //     },
//   //   },
//   // ],
// });

const dailyMessingSchema = new Schema({
	date: { type: Date, required: true },
	breakfast: { type: Number, default: 0 },
	lunch: { type: Number, default: 0 },
	dinner: { type: Number, default: 0 },
	offr: { type: Schema.Types.ObjectId, ref: 'Offr' }
});
const DailyMessing = models.Messing || model('DailyMessing', dailyMessingSchema);

export default DailyMessing;
