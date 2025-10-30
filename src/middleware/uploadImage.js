const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = {
  trucks: path.join(__dirname, '../../uploads/trucks'),
  drivers: path.join(__dirname, '../../uploads/drivers'),
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for truck images
const truckStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirs.trucks);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: truck_timestamp_randomstring.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `truck_${uniqueSuffix}${ext}`);
  },
});

// Configure storage for driver images
const driverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirs.drivers);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `driver_${uniqueSuffix}${ext}`);
  },
});

// File filter for images only
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'),
      false
    );
  }
};

// Multer configuration for truck images
const uploadTruckImage = multer({
  storage: truckStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
}).single('image'); // Field name is 'image'

// Multer configuration for driver images
const uploadDriverImage = multer({
  storage: driverStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
}).single('image');

// Middleware wrapper to handle multer errors
const handleUploadError = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 5MB.',
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  };
};

// Delete old image file
const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, '../../', imagePath);
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Deleted old image: ${imagePath}`);
    } catch (error) {
      console.error(`❌ Failed to delete image: ${imagePath}`, error.message);
    }
  }
};

module.exports = {
  uploadTruckImage: handleUploadError(uploadTruckImage),
  uploadDriverImage: handleUploadError(uploadDriverImage),
  deleteImage,
};
