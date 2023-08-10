enum Rank {
	ACM = 'Air Chief Marshal',
	AM = 'Air Marshal',
	AVM = 'Air Vice Marshal',
	AIR_COMMODORE = 'Air Cdre',
	GP_CAPT = 'Gp Capt',
	WG_CDR = 'Wg Cdr',
	SQN_LDR = 'Sqn Ldr',
	FLT_LT = 'Flt Lt',
	FLG_OFFR = 'Flg Offr',
	NONE = 'Unknown'
}
export default Rank;

// ✅ For STRING Enum
// enum StringEnum {
// 	Small = 'S',
// 	Medium = 'M',
// 	Large = 'L',
//   }

//   const values = Object.values(StringEnum);
// 👇️ ['S', 'M', 'L']
//   console.log(values);

//   const names = Object.keys(StringEnum);
// 👇️ ['Small', 'Medium', 'Large']
//   console.log(names);
