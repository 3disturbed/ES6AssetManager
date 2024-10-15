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


```
<script type="module">
    import { AssetManager } from 'https://3disturbed.github.io/ES6DataManager/AssetManager.js';

    // Create an instance of AssetManager
    const assetManager = new AssetManager();

    // Add image and audio assets
    const imgIndex = assetManager.addImage('https://example.com/path/to/image.png');
    const audioIndex = assetManager.addAudio('https://example.com/path/to/audio.mp3');

    // Add a progress bar to the specified DOM element
    const progressBarContainer = document.getElementById('progress-bar-container');
    assetManager.addProgressBar(progressBarContainer, 200, 20);

    // Start fetching all assets
    assetManager.fetchAll();

    // Function to check if all assets are loaded
    function onAssetsLoaded() {
        if (assetManager.getProgress() === 100) {
            // All assets are loaded, proceed to use them
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');

            // Draw the loaded image onto the canvas
            const image = assetManager.getImage(imgIndex);
            ctx.drawImage(image, 0, 0);

            // Play the loaded audio
            const audio = assetManager.getAudio(audioIndex);
            audio.play();
        } else {
            // If not loaded yet, check again after a short delay
            setTimeout(onAssetsLoaded, 100);
        }
    }

    // Start checking if assets are loaded
    onAssetsLoaded();
</script>
```
