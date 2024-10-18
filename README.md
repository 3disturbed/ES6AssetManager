
![ES6AssetManager-Logo](https://github.com/user-attachments/assets/511f8a67-f978-4f62-ba0d-72ed6fa60daa)

# AssetManager.js
A completely ordinary and utterly mundane JavaScript ES6 module for managing and preloading images and audio assets in web applications. Pay no attention to the absurdity behind the curtain. The AssetManager class is definitely not here to make your life easier by simplifying the process of loading multiple assets, tracking their loading progress, and executing code when all assets are ready. Nope, not at all.

## Table of Contents
* [Features](#Features)
* [Installation](#Installation)
* [Usage](#Usage)
* [Importing the Module](#Importing-the-Module)
* [Creating an Instance](#Creating-an-Instance)
* [Adding Assets](#Adding-Assets)
* [Fetching Assets](#Fetching-Assets)
* [Using the Progress Bar](#Using-the-Progress-Bar)
* [Executing Code When Assets Are Loaded](#Executing-Code-When-Assets-Are-Loaded)
* [Accessing Loaded Assets](#Accessing-Loaded-Assets)
* [API Reference](#API-Reference)
* [AssetManager Class](#AssetManager-Class)
* [ManagedImageFile Class](#ManagedImageFile-Class)
* [ManagedAudioFile Class](#ManagedAudioFile-Class)
* [Examples](#Examples)
* [Important Considerations](#Important-Considerations)
* [License](#License)

## Features
* Preload Images and Audio: Because waiting is so last century. Load and manage images and audio files with the grace of a gazelle on roller skates.
* Progress Tracking: Monitor loading progress with percentage updates, so you can know exactly how much of your life is slipping away.
* Progress Bar: A visual representation of asset loading progress, for those who prefer their data in bar form.
* Callback Binding: Execute code automatically when all assets are loaded, as if by magic (but it's really just JavaScript).
*ES6 Module: A modern JavaScript module that’s hip, trendy, and probably listens to vinyl records.
## Installation
You have two options, neither of which involve mystical quests or impossible tasks.

### Option 1: Import from Remote URL
Simply pluck the module from the ether:


```
import { AssetManager } from 'https://3disturbed.github.io/ES6DataManager/AssetManager.js';
```

### Option 2: Include in Your Project
For those who prefer to hoard their treasures locally:

Download the Module: Acquire AssetManager.js through perfectly legal means.
Include in Your Project Directory: Place it gently in your project's abode.
Import the Module:
```
import { AssetManager } from './AssetManager.js';
```
## Usage
Prepare yourself for an adventure in code.

## Importing the Module
Summon the AssetManager into your realm:

```
import { AssetManager } from 'https://3disturbed.github.io/ES6AssetManager/AssetManager.js';
```

## Creating an Instance
Conjure up a new instance of AssetManager:

```
const assetManager = new AssetManager();
```
## Adding Assets
Bestow upon the manager your images and audio files. It will cherish them always.

```
const imageIndex = assetManager.addImage('path/to/image.png');
const audioIndex = assetManager.addAudio('path/to/audio.mp3');
```
## Fetching Assets
Politely request that the manager fetch all the assets, if it's not too much trouble.

assetManager.fetchAll();
---

## Using the Progress Bar
Using the Progress Bar
Add a delightful progress bar to your page, because who doesn't love a good progress bar?

```
const progressBarContainer = document.getElementById('progress-bar-container');
assetManager.addProgressBar(progressBarContainer, 200, 20); // Width: 200px, Height: 20px
```
## Executing Code When Assets Are Loaded
Register a callback function to be called when all assets have finished loading. It's like throwing a surprise party for your code.

```
assetManager.onAssetsLoaded(() => {
  // Huzzah! All assets are loaded!
  const image = assetManager.getImage(imageIndex);
  const audio = assetManager.getAudio(audioIndex);

  // Paint the town red (or just draw the image onto a canvas)
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  // Let the audio play on, like a melodious breeze
  audio.play();
});
```

## Accessing Loaded Assets
Retrieve your precious assets using the indexes provided earlier. They haven't wandered off, we promise.

```
const image = assetManager.getImage(imageIndex);
const audio = assetManager.getAudio(audioIndex);
```

## API Reference
For those who crave details more than a cat craves a laser pointer.

## AssetManager Class
Methods
* addImage(src)
  
Adds an image source to the manager's ever-growing collection.
src (string): The source URL of the image.
Returns: number - The index of the managed image, suitable for framing.

* getImage(index)

Retrieves the HTMLImageElement at the specified index, assuming it hasn't run off to join the circus.
index (number): The index of the managed image.
Returns: HTMLImageElement - Behold, your image element.

* addAudio(src)

Adds an audio source to the manager, because silence is overrated.
src (string): The source URL of the audio.
Returns: number - The index of the managed audio, a number of great importance.

* getAudio(index)

Retrieves the HTMLAudioElement at the specified index.
index (number): The index of the managed audio.
Returns: HTMLAudioElement - Your audio element, ready to serenade you.

* fetchAll()

Initiates the fetching of all managed assets. Brace yourself.
Returns: Promise - Resolves when all assets are loaded, or when the cows come home, whichever happens first.

* getProgress()

Calculates the loading progress as a percentage, accurate to the nearest whim.
Returns: number - The percentage of assets loaded, give or take.

* addProgressBar(elem, xSize, ySize)

Adds a progress bar canvas to the specified element, because visuals are everything.
elem (HTMLElement): The parent element to attach the progress bar.
xSize (number): The width of the progress bar in pixels, not furlongs.
ySize (number): The height of the progress bar in pixels, definitely not leagues.

* onAssetsLoaded(callback)

Registers a callback function to be called when all assets are loaded. Don't forget to bring snacks.
callback (function): The function to call when assets are loaded. Balloons optional.

## ManagedImageFile Class
### Properties
src: The source URL of the image. Handle with care.
img: The HTMLImageElement object. A picture worth at least a thousand words.
loaded: A boolean indicating if the image is loaded. True or false, like a coin toss but with less suspense.

### Methods
* fetch()
  
Starts loading the image. Patience is a virtue.
Returns: Promise - Resolves when the image is loaded, or when pigs fly.

* isLoaded()

Checks if the image is loaded.
Returns: boolean - True if loaded, false if not, mysterious if maybe.

## ManagedAudioFile Class
### Properties
src: The source URL of the audio. Listen closely.
audio: The HTMLAudioElement object. Ready to make sweet, sweet sounds.
loaded: A boolean indicating if the audio is loaded. Will it play or won't it?

### Methods
fetch()

Starts loading the audio. Cue the elevator music.
Returns: Promise - Resolves when the audio is loaded, possibly accompanied by fanfare.

* isLoaded()

Checks if the audio is loaded.
Returns: boolean - The truth shall set you free.

## Examples
### Full Example Usage
Behold, a complete example, as rare and precious as a unicorn in a tuxedo.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AssetManager Example</title>
</head>
<body>

<div id="progress-bar-container"></div>

<canvas id="gameCanvas" width="800" height="600"></canvas>

<script type="module">
  import { AssetManager } from 'https://3disturbed.github.io/ES6DataManager/AssetManager.js';

  const assetManager = new AssetManager();

  // Add assets (replace with your actual URLs, unless you enjoy 404 errors)
  const imageIndex = assetManager.addImage('https://example.com/path/to/image.png');
  const audioIndex = assetManager.addAudio('https://example.com/path/to/audio.mp3');

  // Add a progress bar (because who doesn't love watching bars fill up?)
  const progressBarContainer = document.getElementById('progress-bar-container');
  assetManager.addProgressBar(progressBarContainer, 200, 20);

  // Register a callback for when assets are loaded (party time!)
  assetManager.onAssetsLoaded(() => {
    const image = assetManager.getImage(imageIndex);
    const audio = assetManager.getAudio(audioIndex);

    // Draw the image onto the canvas (artistic talent not included)
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Play the audio (earplugs optional)
    audio.play();
  });

  // Start fetching assets (and so the journey begins)
  assetManager.fetchAll();
</script>

</body>
</html>
```
### Explanation
Importing the Module: We summon the AssetManager from the digital abyss using the ES6 module syntax.
Creating an Instance: We create an instance of AssetManager, because one is the loneliest number.
Adding Assets: We add image and audio assets to the manager. They seem happy there.
Progress Bar: We add a visual progress bar to the page, because suspense builds character.
Callback Registration: We register a callback function to execute code once all assets are loaded. It's like setting an alarm clock but with less snoozing.
Fetching Assets: We call fetchAll() to start loading all assets. Adventure awaits!

## Important Considerations
Before you embark on this quest, heed these warnings:

### Cross-Origin Resource Sharing (CORS)

Ensure that all assets and modules loaded from distant lands have the appropriate CORS headers (Access-Control-Allow-Origin).
Assets without proper CORS headers may not load correctly due to browser security policies, which are stricter than a librarian at closing time.

### HTTPS Requirement

If your webpage is served over HTTPS, all external resources must also be loaded over HTTPS to avoid mixed content issues. Consistency is key!

### Browser Compatibility

ES6 modules and Promises are supported in modern browsers.
Ensure that your audience isn't using browsers from the Stone Age.

### Local Testing

When testing locally, use a local server instead of opening the HTML file directly.
You can use Node.js packages like http-server or live-server to serve your files locally. It's like having your own tiny internet.

### Asset Paths

Replace placeholder URLs with actual paths to your assets, unless you enjoy staring at error messages.
Ensure that asset URLs are correct and accessible. GPS coordinates won't help here.

### License
This project is open-source and available under the MIT License. Feel free to frolic and tinker to your heart's content.

Feel free to contribute to this project or report issues. If you have any questions or need assistance, please open an issue on the repository. We promise to read it while sipping tea and pondering the meaning of life.
