# Lookbook App

A modern, interactive lookbook application that allows users to browse through collections of fashion looks, view products, and interact with media content.

## Features

- **Interactive Media Gallery**
  - Swipeable image and video content
  - Auto-advancing slideshow for images
  - Video playback with controls (play/pause, mute/unmute)
  - Progress bar for media navigation

- **Product Annotations**
  - Interactive product dots on images
  - Product details on click
  - Product-specific positioning for each image

- **Responsive Design**
  - Mobile-first approach
  - Fixed navigation and controls
  - Smooth scrolling experience

- **Data Management**
  - JSON-based look data structure
  - Dynamic folder-based media loading
  - Flexible product annotation system

## Project Structure

```
src/
├── components/
│   ├── Look.jsx           # Main look display component
│   ├── Lookbook.jsx       # Lookbook container component
│   ├── MediaViewer.jsx    # Media display and controls
│   └── ProductAnnotation.jsx  # Product annotation component
├── data/
│   └── looks.json         # Look and product data
├── styles/
│   ├── App.css
│   ├── Look.css
│   ├── MediaViewer.css
│   └── ProductAnnotation.css
└── utils/
    └── stringUtils.js     # Helper functions
```

## Data Structure

The application uses a JSON-based data structure to define looks and their associated media:

```json
{
  "looks": [
    {
      "id": 1,
      "name": "Summer Collection",  // Optional, falls back to folder name
      "folder": "summer_collection",
      "media": [
        { 
          "type": "image", 
          "url": "image1.jpg",
          "products": [
            { "id": 1, "name": "Summer Dress", "price": 99.99, "x": 30, "y": 40 }
          ]
        }
      ]
    }
  ]
}
```

## Setup and Installation

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to the project directory
   cd lookbook

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Media Setup**
   - Create a `public/looks` directory
   - Add your look folders (e.g., `summer_collection`, `winter_collection`)
   - Place media files in their respective folders
   - Update `looks.json` to match your media structure

4. **Running the Application**
   ```bash
   # Start development server
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:5173`

## Testing

1. **Media Navigation**
   - Swipe left/right or use navigation buttons
   - Images auto-advance after 5 seconds
   - Videos play automatically and can be controlled

2. **Product Interaction**
   - Click on product dots to view details
   - Products are positioned according to coordinates in the JSON
   - Product cards show name, price, and shop button

3. **Video Controls**
   - Play/pause button toggles video playback
   - Mute button toggles audio
   - Videos autoplay and loop

## Key Technical Solutions

1. **Media Handling**
   - Dynamic media loading based on folder structure
   - Separate handling for images and videos
   - Progress tracking for both media types

2. **Product Annotations**
   - Position-based product placement
   - Dynamic product loading per image
   - Interactive product cards

3. **Responsive Design**
   - Fixed navigation and controls
   - Proper scroll handling
   - Mobile-friendly touch interactions

4. **Data Management**
   - Flexible JSON structure
   - Fallback naming system
   - Organized media and product associations

## Contributing

Feel free to submit issues and enhancement requests.
