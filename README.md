# ES6DataManager

Usage
```
import { AssetManager } from './AssetManager.js';

const assetManager = new AssetManager();

// Add assets
const imgIndex = assetManager.addImage('path/to/image.png');
const audioIndex = assetManager.addAudio('path/to/audio.mp3');

// Add a progress bar to a DOM element
const progressBarContainer = document.getElementById('progress-bar-container');
assetManager.addProgressBar(progressBarContainer, 200, 20);

// Start fetching all assets
assetManager.fetchAll();

// Access the loaded assets
assetManager.getImage(imgIndex);  // Returns the Image object
assetManager.getAudio(audioIndex); // Returns the Audio object
```
