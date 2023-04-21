const express = require('express');
const router = express.Router();

const User = require('/Users/monet./my-land-app/src/schemas/User.js');
const Owner = require('/Users/monet./my-land-app/src/schemas/Owner.js');
const LandHolding = require('/Users/monet./my-land-app/src/schemas/LandHolding.js');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');



// route /api/auth/signup
// new user
// hashes password before reaching database
// creates new user and saves to database
router.post('/signup', async (req, res) => {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        })
      await user.save();
  
      // Generate JWT token and send it in response
      const token = jwt.sign({ userId: user._id }, secretKey, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'JWT ERROR' });
    }
  });
  
// route api/auth/login
// takes user to login page after being authenticated
// generates token for authenticated user
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT token and send it in response
      const token = jwt.sign({ userId: user._id }, secretKey, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'NOT ABLE TO GENERATE JWT TOKEN' });
    }
  });

// Owners routes
// route /api/auth/owners
router.get('/owners', async (req, res) => {
      const owners = await Owner.find();
      res.send(owners);
    });
    
    router.get('/owners/:id', async (req, res) => {
      const owner = await Owner.findById(req.params.id);
      if (!owner) return res.status(404).send('Owner not found');
      res.send(owner);
    });
    
    router.post('/owners', async (req, res) => {
      const owner = new Owner({
        ownerName: req.body.ownerName,
        entityType: req.body.entityType,
        ownerType: req.body.ownerType,
        address: req.body.address,
        totalNumberOfLandHoldings: req.body.totalNumberOfLandHoldings
      });
      try {
        await owner.save();
        res.send(owner);
      } catch (err) {
        res.status(400).send(err.message);
      }
    });
    
    router.put('/owners/:id', async (req, res) => {
      const owner = await Owner.findByIdAndUpdate(req.params.id, {
        ownerName: req.body.ownerName,
        entityType: req.body.entityType,
        ownerType: req.body.ownerType,
        address: req.body.address,
        totalNumberOfLandHoldings: req.body.totalNumberOfLandHoldings
      }, { new: true });
      if (!owner) return res.status(404).send('Owner not found');
      res.send(owner);
    });
    
    router.delete('/owners/:id', async (req, res) => {
      const owner = await Owner.findByIdAndRemove(req.params.id);
      if (!owner) return res.status(404).send('Owner not found');
      res.send(owner);
    });

// Land Holding routes
// route /api/auth/landholdings

// get all landholdings
router.get('/landholdings', async (req, res) => {
      const landHoldings = await LandHolding.find();
      res.send(landHoldings);
    });

// posts new landholdings
// Create a land holding
router.post('/landholdings', async (req, res) => {
    const landHolding = new LandHolding({
      ownerName: req.body.ownerName,
      owner: req.body.owner,
      legalEntity: req.body.legalEntity,
      netMineralAcres: req.body.netMineralAcres,
      mineralOwnerRoyalty: req.body.mineralOwnerRoyalty,
      sectionownerName: req.body.sectionownerName,
      section: req.body.section,
      township: req.body.township,
      range: req.body.range,
      titleSource: req.body.titleSource
    });
  
    try {
      const newLandHolding = await landHolding.save();
      res.status(201).json(newLandHolding);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // patch updates landholdings by field
  router.patch('/landholdings/:id', LandHolding, async (req, res) => {
    if (req.body.ownerName != null) {
      res.landHolding.ownerName = req.body.ownerName;
    }
    if (req.body.owner != null) {
      res.landHolding.owner = req.body.owner;
    }
    if (req.body.legalEntity != null) {
      res.landHolding.legalEntity = req.body.legalEntity;
    }
    if (req.body.netMineralAcres != null) {
      res.landHolding.netMineralAcres = req.body.netMineralAcres;
    }
    if (req.body.mineralOwnerRoyalty != null) {
      res.landHolding.mineralOwnerRoyalty = req.body.mineralOwnerRoyalty;
    }
    if (req.body.sectionownerName != null) {
      res.landHolding.sectionownerName = req.body.sectionownerName;
    }
    if (req.body.section != null) {
      res.landHolding.section = req.body.section;
    }
    if (req.body.township != null) {
      res.landHolding.township = req.body.township;
    }
    if (req.body.range != null) {
      res.landHolding.range = req.body.range;
    }
    if (req.body.titleSource != null) {
      res.landHolding.titleSource = req.body.titleSource;
    }
    try {
      const updatedLandHolding = await res.LandHolding.save();
      res.json(updatedLandHolding);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // deletes a landholding

  router.delete('/landholdings/:id', async (req, res) => {
      try {
        const landHolding = await LandHolding.findByIdAndDelete(req.params.id);
    
        if (!landHolding) {
          return res.status(404).send({ error: 'Land Holding not found' });
        } 
        res.send({ message: 'Land Holding deleted' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  

module.exports =  router;