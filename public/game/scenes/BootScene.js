import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load all assets defined in CONFIG
        this.load.image('logo', CONFIG.assets.logo);
        this.load.image('liza', CONFIG.assets.liza);
        this.load.image('dan', CONFIG.assets.dan);
        this.load.image('ghost', CONFIG.assets.ghostBasic);
        this.load.image('cemetery', CONFIG.assets.cemeteryBg);
        this.load.image('eyelashes', CONFIG.assets.eyelashes);
        this.load.image('camera', CONFIG.assets.camera);
        this.load.image('radio', CONFIG.assets.radio);
        this.load.image('candle', CONFIG.assets.candle);
        this.load.image('holyWater', CONFIG.assets.holyWater);
        this.load.image('crucifix', CONFIG.assets.crucifix);
        this.load.image('boss', CONFIG.assets.boss);
        
        // Setup progress bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width/2 - 160, height/2 - 25, 320, 50);
        
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x9d00ff, 1);
            progressBar.fillRect(width/2 - 150, height/2 - 15, 300 * value, 30);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.scene.start('MenuScene');
        });
    }
}