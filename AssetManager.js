// AssetManager.js

export class AssetManager {
    constructor() {
        this.managedImages = [];
        this.managedAudios = [];
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.assetsLoadedCallback = null; // Add this line
    }

    /**
     * Adds an image source to the manager and returns its index.
     * @param {string} src - The source URL of the image.
     * @returns {number} - The index of the managed image.
     */
    addImage(src) {
        const managedImage = new ManagedImageFile(src);
        this.managedImages.push(managedImage);
        this.totalAssets++;
        return this.managedImages.length - 1;
    }

     /**
     * Registers a callback function to be called when all assets are loaded.
     * @param {function} callback - The function to call when assets are loaded.
     */
    onAssetsLoaded(callback) {
        this.assetsLoadedCallback = callback;
    }

    /**
     * Retrieves the Image object at the specified index.
     * @param {number} index - The index of the managed image.
     * @returns {HTMLImageElement} - The Image object.
     */
    getImage(index) {
        return this.managedImages[index].img;
    }

    /**
     * Adds an audio source to the manager and returns its index.
     * @param {string} src - The source URL of the audio.
     * @returns {number} - The index of the managed audio.
     */
    addAudio(src) {
        const managedAudio = new ManagedAudioFile(src);
        this.managedAudios.push(managedAudio);
        this.totalAssets++;
        return this.managedAudios.length - 1;
    }

    /**
     * Retrieves the Audio object at the specified index.
     * @param {number} index - The index of the managed audio.
     * @returns {HTMLAudioElement} - The Audio object.
     */
    getAudio(index) {
        return this.managedAudios[index].audio;
    }

    /**
     * Initiates the fetching of all managed assets.
     */
    fetchAll() {
        this.managedImages.forEach((image) => {
            image.fetch().then(() => {
                this.loadedAssets++;
            });
        });

        this.managedAudios.forEach((audio) => {
            audio.fetch().then(() => {
                this.loadedAssets++;
            });
        });

        
        Promise.all(promises).then(() => {
            if (this.assetsLoadedCallback) {
                this.assetsLoadedCallback();
            }
        });
    }

    /**
     * Calculates the loading progress as a percentage.
     * @returns {number} - The percentage of assets loaded.
     */
    getProgress() {
        if (this.totalAssets === 0) return 100;
        return (this.loadedAssets / this.totalAssets) * 100;
    }

    /**
     * Adds a progress bar canvas to the specified element.
     * @param {HTMLElement} elem - The parent element to attach the progress bar.
     * @param {number} xSize - The width of the progress bar.
     * @param {number} ySize - The height of the progress bar.
     */
    addProgressBar(elem, xSize, ySize) {
        const canvas = document.createElement('canvas');
        canvas.width = xSize;
        canvas.height = ySize;
        elem.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const updateProgressBar = () => {
            const progress = this.getProgress();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'gray';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, canvas.width * (progress / 100), canvas.height);
            if (progress < 100) {
                requestAnimationFrame(updateProgressBar);
            }
        };

        updateProgressBar();
    }
}

class ManagedImageFile {
    constructor(src) {
        this.src = src;
        this.img = new Image();
        this.loaded = false;
    }

    /**
     * Starts loading the image.
     * @returns {Promise} - Resolves when the image is loaded.
     */
    fetch() {
        return new Promise((resolve, reject) => {
            this.img.onload = () => {
                this.loaded = true;
                resolve();
            };
            this.img.onerror = reject;
            this.img.src = this.src;
        });
    }

    /**
     * Checks if the image is loaded.
     * @returns {boolean} - True if loaded, else false.
     */
    isLoaded() {
        return this.loaded;
    }
}

class ManagedAudioFile {
    constructor(src) {
        this.src = src;
        this.audio = new Audio();
        this.loaded = false;
    }

    /**
     * Starts loading the audio.
     * @returns {Promise} - Resolves when the audio is loaded.
     */
    fetch() {
        return new Promise((resolve, reject) => {
            this.audio.oncanplaythrough = () => {
                this.loaded = true;
                resolve();
            };
            this.audio.onerror = reject;
            this.audio.src = this.src;
            this.audio.load();
        });
    }

    /**
     * Checks if the audio is loaded.
     * @returns {boolean} - True if loaded, else false.
     */
    isLoaded() {
        return this.loaded;
    }
}
