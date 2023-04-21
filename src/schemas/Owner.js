const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true, unique: true },
  entityType: { type: String, enum: ['Company', 'Individual', 'Investor', 'Trust'] },
  ownerType: { type: String, enum: ['Competitor', 'Seller', 'Investor', 'Professional'] },
  address: { type: String, unique: true },
  totalNumberOfLandHoldings: { type: Number },
}, { timestamps: true });

ownerSchema.path('ownerName').validate(async function(value) {
      const owner = await this.constructor.findOne({ ownerName: value });
      if (owner) {
        if (this.id === owner.id) {
          // updates owner
          return true;
        }
        // This is a new owner, so the ownerName must be unique
        return false;
      }
      return true;
    }, 'ownerName must be unique');
    
    ownerSchema.path('address').validate(async function(value) {
      const owner = await this.constructor.findOne({ address: value });
      if (owner) {
        if (this.id === owner.id) {
          // updates address
          return true;
        }
        // address must be unique
        return false;
      }
      return true;
    }, 'Address must be unique');

    // removes all land holdings when an corresponding owner id is deleted
    ownerSchema.pre('remove', async function(next) {
      const owner = this;
      await mongoose.model('LandHolding').deleteMany({ owner: owner._id });
      next();
    });

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;