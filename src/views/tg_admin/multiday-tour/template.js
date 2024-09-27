// To update your Transfer model, routes, and controllers in the backend to include additional fields like country, category, destination, mapUrl, packageContent, fromLocation, toLocation, and a reference to the Rating table, follow the steps below:

// 1. Update the Transfer Model
// First, modify the Transfer model to include the new fields and set up the association with the Rating table:

// javascript
// Copy code
// // models/Transfer.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// const Rating = require('./Rating'); // Import the Rating model

// const Transfer = sequelize.define('Transfer', {
//   packageId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     defaultValue: () => 'transfer' + Math.floor(1000 + Math.random() * 9000),
//   },
//   packageType: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'transfer',
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   country: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   destination: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   mapUrl: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   packageContent: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   fromLocation: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   toLocation: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   coverPhoto: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   prices: {
//     type: DataTypes.JSON,
//     allowNull: false,
//   },
// });

// Transfer.hasMany(Rating, { foreignKey: 'packageId' });
// Rating.belongsTo(Transfer, { foreignKey: 'packageId' });

// module.exports = Transfer;
// 2. Update the Transfer Controller
// Update your controller to handle the new fields:

// javascript
// Copy code
// // controllers/transferController.js
// const { Transfer } = require('../models');

// exports.createTransfer = async (req, res) => {
//   try {
//     const { title, description, prices, country, category, destination, mapUrl, packageContent, fromLocation, toLocation } = req.body;
//     const coverPhoto = req.file ? req.file.filename : null;
//     const transfer = await Transfer.create({ title, description, prices, country, category, destination, mapUrl, packageContent, fromLocation, toLocation, coverPhoto });
//     res.status(201).json(transfer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllTransfers = async (req, res) => {
//   try {
//     const transfers = await Transfer.findAll();
//     res.status(200).json(transfers);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getTransferById = async (req, res) => {
//   try {
//     const transfer = await Transfer.findByPk(req.params.id);
//     if (!transfer) return res.status(404).json({ error: 'Transfer not found' });
//     res.status(200).json(transfer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateTransfer = async (req, res) => {
//   try {
//     const { title, description, prices, country, category, destination, mapUrl, packageContent, fromLocation, toLocation } = req.body;
//     const coverPhoto = req.file ? req.file.filename : null;
//     const transfer = await Transfer.findByPk(req.params.id);
//     if (!transfer) return res.status(404).json({ error: 'Transfer not found' });

//     transfer.title = title;
//     transfer.description = description;
//     transfer.prices = prices;
//     transfer.country = country;
//     transfer.category = category;
//     transfer.destination = destination;
//     transfer.mapUrl = mapUrl;
//     transfer.packageContent = packageContent;
//     transfer.fromLocation = fromLocation;
//     transfer.toLocation = toLocation;
//     if (coverPhoto) transfer.coverPhoto = coverPhoto;

//     await transfer.save();
//     res.status(200).json(transfer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteTransfer = async (req, res) => {
//   try {
//     const transfer = await Transfer.findByPk(req.params.id);
//     if (!transfer) return res.status(404).json({ error: 'Transfer not found' });

//     await transfer.destroy();
//     res.status(204).end();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// 3. Update the Routes
// Ensure that your routes are correctly set up to handle file uploads and the new fields:

// javascript
// Copy code
// // routes/transferRoutes.js
// const express = require('express');
// const router = express.Router();
// const transferController = require('../controllers/transferController');
// const upload = require('../middleware/uploadMiddleware');

// router.post('/transfers', upload.single('coverPhoto'), transferController.createTransfer);
// router.get('/transfers', transferController.getAllTransfers);
// router.get('/transfers/:id', transferController.getTransferById);
// router.put('/transfers/:id', upload.single('coverPhoto'), transferController.updateTransfer);
// router.delete('/transfers/:id', transferController.deleteTransfer);

// module.exports = router;
// 4. Update the Main App
// Ensure your app is configured to use the Transfer routes and the Rating routes:

// javascript
// Copy code
// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const blogRoutes = require('./routes/blogRoutes');
// const miceRoutes = require('./routes/miceRoutes'); 
// const transferRoutes = require('./routes/transferRoutes'); 
// const thingsToDoRoutes = require('./routes/thingsToDoRoutes'); 
// const oneDayTourPackageRoutes = require('./routes/oneDayTourPackageRoutes');
// const user_routes = require('./routes/userRoutes');
// const newTransferInfoRoutes = require('./routes/newTransferInfoRoutes');
// const travelPackageRoutes = require('./routes/travelPackageRoutes');
// const bookingRoutes = require('./routes/bookingRoutes'); 
// const userRequestRoutes = require('./routes/userRequestRoutes');
// const ratingRoutes = require('./routes/ratingRoutes');

// const app = express();
// app.use(bodyParser.json());
// app.use('/uploads', express.static('blogUploads'));
// app.use('/miceUploads', express.static('miceUploads'));
// app.use('/api', blogRoutes);
// app.use('/api', miceRoutes);
// app.use('/api', transferRoutes); 
// app.use('/api', thingsToDoRoutes);
// app.use('/api', oneDayTourPackageRoutes);
// app.use('/api', user_routes);
// app.use('/api', newTransferInfoRoutes);
// app.use('/api', travelPackageRoutes);
// app.use('/api', bookingRoutes);
// app.use('/api', userRequestRoutes);
// app.use('/api', ratingRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// 5. Rating Table Reference Setup
// The Transfer model is already set up to reference the Rating table via the packageId field. Ensure that your Rating model and routes are configured to handle this association correctly.

// This setup should allow you to manage Transfer records with additional fields and handle ratings for each transfer package.






