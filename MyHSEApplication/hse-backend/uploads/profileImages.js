const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profileImages'); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// POST route to upload profile picture
router.post('/uploadProfileImage', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const imageUrl = `http://10.0.2.2:8000/uploads/profileImages/${req.file.filename}`;

  // You would save the image URL in the user's profile in your database
  // Example:
  // await User.findByIdAndUpdate(req.user.id, { profileImageUrl: imageUrl });

  return res.json({ imageUrl });
});

module.exports = router;
