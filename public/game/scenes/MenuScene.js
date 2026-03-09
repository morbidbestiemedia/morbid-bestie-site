import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.scale;
        
        // Background
        this.add.image(width/2, height/2, 'cemetery')
            .setAlpha(0.3)
            .setDisplaySize(width, height);
            
        this.add.image(width/2, height/2 - 400, 'logo')
            .setScale(0.8)
            .setOrigin(0.5);
            
        const titleText = this.add.text(width/2, height/2 - 180, 'MYSTERIES WITH\nTHE MASSEYS', {
            fontFamily: '"Press Start 2P"',
            fontSize: '70px',
            fill: '#bc13fe',
            align: 'center',
            stroke: '#00d2ff',
            strokeThickness: 8
        }).setOrigin(0.5);
        
        const subTitle = this.add.text(width/2, height/2 - 30, 'SELECT YOUR INVESTIGATOR', {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Character Buttons
        const createCharButton = (x, y, key, name) => {
            const container = this.add.container(x, y);
            
            const bg = this.add.rectangle(0, 0, 400, 450, 0x1a1a1a)
                .setStrokeStyle(4, CONFIG.colors.neonPurple)
                .setInteractive({ useHandCursor: true });
            
            const img = this.add.image(0, -40, key).setScale(0.8);
            const label = this.add.text(0, 160, name, {
                fontFamily: '"Press Start 2P"',
                fontSize: '40px',
                fill: '#ffffff'
            }).setOrigin(0.5);
            
            container.add([bg, img, label]);
            
            bg.on('pointerover', () => {
                bg.setStrokeStyle(6, CONFIG.colors.neonBlue);
                container.setScale(1.05);
            });
            
            bg.on('pointerout', () => {
                bg.setStrokeStyle(4, CONFIG.colors.neonPurple);
                container.setScale(1);
            });
            
            bg.on('pointerdown', () => {
                this.scene.start('GameScene', { playerChar: key });
            });
        };
        
        createCharButton(width/2 - 300, height/2 + 100, 'liza', 'LIZA');
        createCharButton(width/2 + 300, height/2 + 100, 'dan', 'DAN');
        
        this.add.text(width/2, height - 100, 'WASD/Arrows to Move | 1-2-3 to Switch Tools', {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#888888'
        }).setOrigin(0.5);
    }
}