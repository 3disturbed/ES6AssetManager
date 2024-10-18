// AssetManager.js

export class AssetManager {
    constructor() {
        this.managedImages = [];
        this.managedAudios = [];
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.assetsLoadedCallback = null;
        this.progressUpdateCallback = null; // Added
        this.imageTags = [];
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
        let filenameStripped = src.split('/').pop().split('.')[0];
        this.imageTags[this.managedImages.length - 1] = filenameStripped;
        return this.managedImages.length - 1;
    }

    getImagebyTag(tag) {
        const index = this.imageTags.indexOf(tag);
        if (index === -1) {
            console.error(`Image with tag ${tag} not found.`);
            return null;
        }
        return this.managedImages[index].img;
    }

    /**
     * Registers a callback function to be called when all assets are loaded.
     * @param {function} callback - The function to call when assets are loaded.
     */
    onAssetsLoaded(callback) {
        this.assetsLoadedCallback = callback;
    }

    /**
     * Registers a callback function to be called on progress updates.
     * @param {function} callback - The function to call with the progress percentage.
     */
    onProgressUpdate(callback) { // Added
        this.progressUpdateCallback = callback;
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
        return new Promise((resolve, reject) => {
            let loadedCount = 0;
            const total = this.managedImages.length + this.managedAudios.length;
            
            if (total === 0) {
                if (this.assetsLoadedCallback) this.assetsLoadedCallback();
                resolve();
                return;
            }

            const assetLoaded = () => {
                loadedCount++;
                if (this.progressUpdateCallback) {
                    const percentage = Math.floor((loadedCount / total) * 100);
                    this.progressUpdateCallback(percentage);
                }
                if (loadedCount === total) {
                    if (this.assetsLoadedCallback) this.assetsLoadedCallback();
                    resolve();
                }
            };

            const assetFailed = (error) => {
                console.error('Asset failed to load:', error);
                reject(error);
            };
           
            // Load Images
            this.managedImages.forEach((managedImage) => {
                managedImage.img.addEventListener('load', assetLoaded);
                managedImage.img.addEventListener('error', assetFailed);
                managedImage.fetch().catch(assetFailed);
            });

            // Load Audios
            this.managedAudios.forEach((managedAudio) => {
                managedAudio.audio.addEventListener('canplaythrough', assetLoaded);
                managedAudio.audio.addEventListener('error', assetFailed);
                managedAudio.fetch().catch(assetFailed);
            });
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

        this.onProgressUpdate((progress) => { // Use the new onProgressUpdate method
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, canvas.width * (progress / 100), canvas.height);

            if (progress === 100) {
               
                if (this.assetsLoadedCallback) {
                    this.assetsLoadedCallback();
                }
            }
        });
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
            const onLoad = () => {
                this.loaded = true;
                resolve();
            };

            const onError = (err) => {
                reject(err);
            };

            this.img.addEventListener('load', onLoad);
            this.img.addEventListener('error', onError);
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
            const onCanPlayThrough = () => {
                this.loaded = true;
                resolve();
            };

            const onError = (err) => {
                reject(err);
            };

            this.audio.addEventListener('canplaythrough', onCanPlayThrough);
            this.audio.addEventListener('error', onError);
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
