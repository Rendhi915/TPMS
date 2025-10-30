# Image Upload Feature - Documentation

## Overview
Fitur upload image untuk truck dan driver telah ditambahkan ke sistem TPMS backend.

## Technical Details

### Dependencies
- **multer**: Library untuk handle multipart/form-data (file upload)

### Storage
- **Location**: `uploads/trucks/` dan `uploads/drivers/`
- **Naming**: `truck_[timestamp]-[random].[ext]` atau `driver_[timestamp]-[random].[ext]`
- **Max Size**: 5MB per file
- **Allowed Types**: JPEG, JPG, PNG, GIF, WebP

### Access
- **URL**: `http://your-domain/uploads/trucks/filename.jpg`
- **Static Route**: `/uploads` serves files from `uploads/` folder

## API Endpoints

### 1. Create Truck with Image

**POST** `/api/trucks`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Body (FormData):**
```
name: "Truck Name"           (optional)
plate: "B1234XYZ"            (required)
type: "Dump Truck"           (optional)
model: "Hino 500"            (optional)
year: 2024                   (optional)
vin: "ABC123DEF456GHI789"    (optional)
status: "active"             (optional: active|inactive|maintenance)
driver_id: 1                 (optional)
vendor_id: 1                 (optional)
image: [FILE]                (optional: image file)
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Truck Name",
    "plate": "B1234XYZ",
    "type": "Dump Truck",
    "model": "Hino 500",
    "year": 2024,
    "vin": "ABC123DEF456GHI789",
    "status": "active",
    "image": "/uploads/trucks/truck_1698666000000-123456789.jpg",
    "driver_id": 1,
    "vendor_id": 1,
    "created_at": "2025-10-30T10:00:00.000Z",
    "updated_at": "2025-10-30T10:00:00.000Z",
    "vendor": { ... },
    "driver": { ... }
  },
  "message": "Truck created successfully"
}
```

### 2. Update Truck with Image

**PUT** `/api/trucks/:id`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Body (FormData):**
```
name: "Updated Name"         (optional)
plate: "B5678XYZ"            (optional)
type: "Mixer"                (optional)
model: "Mercedes Actros"     (optional)
year: 2025                   (optional)
status: "maintenance"        (optional)
driver_id: 2                 (optional)
vendor_id: 2                 (optional)
image: [FILE]                (optional: new image file)
```

**Notes:**
- If a new image is uploaded, the old image will be automatically deleted
- You can update truck data without uploading a new image

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Updated Name",
    "image": "/uploads/trucks/truck_1698666123456-987654321.jpg",
    ...
  },
  "message": "Truck updated successfully"
}
```

### 3. Delete Truck (also deletes image)

**DELETE** `/api/trucks/:id`

When a truck is deleted (soft delete), the associated image file is also automatically deleted from the server.

## Frontend Implementation

### JavaScript (Fetch API)

```javascript
// Create truck with image
async function createTruckWithImage(truckData, imageFile) {
  const formData = new FormData();
  
  // Add truck data
  formData.append('name', truckData.name);
  formData.append('plate', truckData.plate);
  formData.append('type', truckData.type);
  formData.append('status', truckData.status);
  
  // Add image file
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await fetch('http://localhost:5009/api/trucks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // DO NOT set Content-Type header - browser will set it automatically with boundary
    },
    body: formData
  });
  
  return await response.json();
}

// Update truck with new image
async function updateTruckImage(truckId, imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch(`http://localhost:5009/api/trucks/${truckId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return await response.json();
}
```

### React Example

```jsx
import { useState } from 'react';

function TruckForm() {
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    type: '',
    status: 'active'
  });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File too large. Max 5MB');
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('plate', formData.plate);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('status', formData.status);
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    
    try {
      const response = await fetch('http://localhost:5009/api/trucks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Truck created successfully!');
        console.log('Image URL:', result.data.image);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Truck Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      
      <input
        type="text"
        placeholder="Plate Number"
        value={formData.plate}
        onChange={(e) => setFormData({...formData, plate: e.target.value})}
        required
      />
      
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleImageChange}
      />
      
      {imageFile && (
        <div>
          <p>Selected: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)</p>
          <img 
            src={URL.createObjectURL(imageFile)} 
            alt="Preview" 
            style={{maxWidth: '200px'}}
          />
        </div>
      )}
      
      <button type="submit">Create Truck</button>
    </form>
  );
}
```

### Display Image

```jsx
function TruckCard({ truck }) {
  const imageUrl = truck.image 
    ? `http://localhost:5009${truck.image}` 
    : '/default-truck.png';
  
  return (
    <div className="truck-card">
      <img 
        src={imageUrl} 
        alt={truck.name}
        onError={(e) => { e.target.src = '/default-truck.png'; }}
      />
      <h3>{truck.name}</h3>
      <p>Plate: {truck.plate}</p>
    </div>
  );
}
```

## Testing with Postman/Thunder Client

1. **Create Request:**
   - Method: POST
   - URL: `http://localhost:5009/api/trucks`
   - Headers: 
     - `Authorization: Bearer YOUR_TOKEN`
   - Body: 
     - Type: `form-data`
     - Add fields: name, plate, etc.
     - Add file: key=`image`, select file

2. **Test Image Upload:**
   - Select an image file (JPEG/PNG/GIF/WebP)
   - Max size: 5MB
   - Send request
   - Check response for `image` field with URL

3. **Verify Image:**
   - Copy image URL from response
   - Open in browser: `http://localhost:5009/uploads/trucks/filename.jpg`

## Error Handling

### File Too Large
```json
{
  "success": false,
  "message": "File too large. Maximum size is 5MB."
}
```

### Invalid File Type
```json
{
  "success": false,
  "message": "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
}
```

### Validation Errors
If truck data validation fails, the uploaded image is automatically deleted to prevent orphaned files.

## Security Considerations

1. ✅ File type validation (only images)
2. ✅ File size limit (5MB)
3. ✅ Unique filenames (prevents overwrite)
4. ✅ Separate directories for different entities
5. ✅ Authentication required for all endpoints
6. ✅ Automatic cleanup of old images on update/delete

## Future Enhancements

- [ ] Image optimization/compression
- [ ] Thumbnail generation
- [ ] CDN integration
- [ ] Image validation (dimensions, aspect ratio)
- [ ] Multiple images per truck
- [ ] Image gallery/carousel

## Troubleshooting

### Image not displaying
1. Check if file exists in `uploads/trucks/` folder
2. Verify URL format: `/uploads/trucks/filename.jpg`
3. Check server logs for errors
4. Ensure static middleware is configured in `app.js`

### Upload fails
1. Check file size (max 5MB)
2. Check file type (must be image)
3. Verify `uploads/trucks/` directory exists and is writable
4. Check server logs for detailed error

### Old images not deleted
- Check server logs for deletion errors
- Verify file permissions on uploads directory
- Check if path in database matches actual file path
