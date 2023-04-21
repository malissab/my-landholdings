const mongoose = require('mongoose');

const landHoldingSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  legalEntity: { type: String, required: true },
  netMineralAcres: { type: Number },
  mineralOwnerRoyalty: { type: Number },
  sectionName: { type: String, required: true },
  section: { type: Number, match: /^\d{3}$/, required: true  },
  township: { type: Number, match: /^[0-9]{3}[NS]$/, required: true  },
  range: { type: Number, match: /^[0-9]{3}[EW]$/, required: true  },
  titleSource: { type: String, enum: ['Class A', 'Class B', 'Class C', 'Class D'] },
}, { timestamps: true });

landHoldingSchema.pre('save', function(next) {
    this.name = this.sectionName + ' ' + this.legalEntity;
    next();
  });

  landHoldingSchema.pre('save', function(next) {
    this.sectionName = `${this.section}-${this.township}-${this.range}`
    next();
  });

landHoldingSchema.pre('remove', async function (next) {
    const landHolding = this;
  
   
    await mongoose.model('LandHolding').deleteMany({ owner: landHolding.owner });
  
    next();
  });

  const LandHolding = mongoose.model('LandHolding', landHoldingSchema);

  module.exports = LandHolding;