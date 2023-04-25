const mongoose = require('mongoose');


const landHoldingSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  legalEntity: { type: String, required: true },
  netMineralAcres: { type: Number },
  mineralOwnerRoyalty: { type: Number },
  sectionName: { type: String },
  section: { type: Number, match: /^\d{3}$/, required: true  },
  township: { type: String, match: /^[0-9]{3}[NS]$/, required: true  },
  range: { type: String, match: /^[0-9]{3}[EW]$/, required: true  },
  titleSource: { type: String, enum: ['Class A', 'Class B', 'Class C', 'Class D'] },
}, { timestamps: true });

landHoldingSchema.pre('save', function(next) {
  if (this.isModified('section') && this.isModified('township') && this.isModified('range') || this.isModified('legalEntity')) {
    this.sectionName = `${this.section}-${this.township}-${this.range}`;
    this.name = `${this.sectionName} ${this.legalEntity}`;
  }
  next();
});

landHoldingSchema.pre('remove', async function (next) {
    const landHolding = this;
   
    await mongoose.model('LandHolding').deleteMany({ owner: landHolding.owner });
  
    next();
  });

  const LandHolding = mongoose.model('LandHolding', landHoldingSchema);

  module.exports = LandHolding;