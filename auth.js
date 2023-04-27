const express = require('express');
const router = express.Router();

const User = require('/Users/monet./Development/my-landholdings/src/schemas/User.js');
const Owner = require('/Users/monet./Development/my-landholdings/src/schemas/Owner.js');
const LandHolding = require('/Users/monet./Development/my-landholdings/src/schemas/LandHolding.js')


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const secretKey = crypto.randomBytes(64).toString('hex');
const cors = require('cors');

//allows requst to go through
router.use(cors());




// route /api/auth/signup
// new user
// hashes password before reaching database
// creates new user and saves to database
router.post('/signup', async (req, res) => {
    try {
      const { email, password, passwordConfirmation } = req.body;

      // Checks if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      if(password !== passwordConfirmation){
        return res.status(400).json({ msg: 'Passwords do not match' })
      }
  
      // Hashes new user password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Creates and saves new user
      const user = new User({
            email: email,
            password: hashedPassword,
            passwordConfirmation: hashedPassword
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
  
// route api/auth/dashboard
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Not a user' });
      }
  
      // Checks if users matched email, matches password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Not a user password' });
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
    


    // creates a new owner
    router.post('/newowner', async (req, res) => {

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

    //updates an owner
    router.put('/newowner/:id', async (req, res) => {
        try {
          const updatedOwner = {
            ownerName: req.body.ownerName,
            entityType: req.body.entityType,
            ownerType: req.body.ownerType,
            address: req.body.address,
            totalNumberOfLandHoldings: req.body.totalNumberOfLandHoldings
          };
      
          const owner = await Owner.findByIdAndUpdate(req.params.id, updatedOwner, { new: true });
          if (!owner) return res.status(404).send('Owner not found');
          res.send(owner);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      });
    

      router.delete('/owners/:ownerId', async (req, res) => {
      
        try {
          const ownerId = req.params.ownerId;
      
          // Delete all landholdings with the same owner name
          await LandHolding.deleteMany({ ownerId: ownerId });

          await Owner.findByIdAndDelete(ownerId);
      
          // Return success response
          res.status(200).send("Delete was successful");
        } catch (err) {
          // If there's an error, return 500 Internal Server Error
          console.error(err);
          res.status(500).send("Error deleting owner and related landholdings");
        }
      });

      router.delete('/landholdings/owner/:ownerId', async (req, res) => {
        try {
          const ownerId = req.params.ownerId;
      
          await LandHolding.deleteMany({ owner: ownerId });
      
          res.status(200).send("Delete was successful");
        } catch (err) {
          console.error(err);
          res.status(500).send("Error deleting landholdings");
        }
      });

// Land Holding routes
// route /api/auth/landholdings
// get all landholdings
router.get('/landholdings', async (req, res) => {
      const landHoldings = await LandHolding.find().populate('owner');
      res.send(landHoldings);
    });
    

     // creates a new landholding
     router.post('/newlandholding', async (req, res) => {
      try {    
        // Find the owner by its ID
        const owner = await Owner.findOne({ ownerName: req.body.ownerName })
       
        if (!owner) {
          return res.status(404).json({ message: 'Owner not found' });
        }
    
        // Create a new LandHolding instance with a reference to the foundOwner
        const newLandHolding = new LandHolding({
          name: req.body.name,
          owner: owner._id,
          legalEntity: req.body.legalEntity,
          netMineralAcres: req.body.netMineralAcres,
          mineralOwnerRoyalty: req.body.mineralOwnerRoyalty,
          sectionName: req.body.sectionName,
          section: req.body.section,
          township: req.body.township,
          range: req.body.range,
          titleSource: req.body.titleSource
        });
       
        // Save the new LandHolding instance
        const savedLandHolding = await newLandHolding.save();
        
        res.status(201).json(savedLandHolding);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

  // updates a land holding
  router.patch('/newlandholding/:id', (req, res) => {
    const updatedLandHolding = {};
      // check if each field in the request body is modified and update accordingly
      if (req.body.section || req.body.township || req.body.range || req.body.legalEntity) {
      updatedLandHolding.sectionName = `${req.body.section || req.params.section}-${req.body.township || req.params.township}-${req.body.range || req.params.range}`;
      updatedLandHolding.name = `${updatedLandHolding.sectionName} ${req.body.legalEntity || req.params.legalEntity}`;
    }
      if (req.body.legalEntity) {
        updatedLandHolding.legalEntity = req.body.legalEntity;
      }
      if (req.body.netMineralAcres) {
        updatedLandHolding.netMineralAcres = req.body.netMineralAcres;
      }
      if (req.body.mineralOwnerRoyalty) {
        updatedLandHolding.mineralOwnerRoyalty = req.body.mineralOwnerRoyalty;
      }
      if (req.body.section) {
          updatedLandHolding.section = req.body.section;
        }
      if (req.body.township) {
            updatedLandHolding.township = req.body.township;
          }
      if (req.body.range) {
            updatedLandHolding.range = req.body.range;
          }
      if (req.body.titleSource) {
        updatedLandHolding.titleSource = req.body.titleSource;
      }
      
      // update the document with the modified fields
      if (ObjectId.isValid(req.params.id)) {
        LandHolding.updateOne({_id: new ObjectId(req.params.id)}, {$set: updatedLandHolding})
          .then(result => {
            res.status(200).json(result)
          })
          .catch(error => {
            res.status(500).json({error: 'Land holding not updated'})
          })
      } else {
        res.status(500).json({error: 'Invalid id'})
      }
    })
  // deletes a landholding

  router.delete('/landholding/:id', async (req, res) => {
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