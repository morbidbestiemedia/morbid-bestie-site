import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class Level2Scene extends Phaser.Scene {
    constructor() {
        super('Level2Scene');
        this.matchedCount = 0;
        this.selectedCards = [];
        this.canClick = true;
    }

    create() {
        const { width, height } = this.scale;
        
        this.add.image(width/2, height/2, 'cemetery').setAlpha(0.3).setDisplaySize(width, height);
        
        this.add.text(width/2, 100, 'LEVEL 2: SPIRIT MATCHING', {
            fontFamily: '"Press Start 2P"',
            fontSize: '48px',
            fill: '#bc13fe'
        }).setOrigin(0.5);

        this.add.text(width/2, 180, 'Match the haunted tombstones to proceed', {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const cardIcons = ['ghost', 'eyelashes', 'camera', 'radio', 'candle', 'holyWater'];
        const deck = [...cardIcons, ...cardIcons];
        Phaser.Utils.Array.Shuffle(deck);

        const cols = 4;
        const spacing = 250;
        const startX = width/2 - (spacing * (cols-1))/2;
        const startY = 400;

        deck.forEach((icon, index) => {
            const x = startX + (index % cols) * spacing;
            const y = startY + Math.floor(index / cols) * spacing;

            const card = this.add.container(x, y);
            const bg = this.add.rectangle(0, 0, 200, 200, 0x1a1a1a).setStrokeStyle(4, 0xffffff).setInteractive({ useHandCursor: true });
            const back = this.add.text(0, 0, '?', { fontSize: '60px', fontFamily: '"Press Start 2P"' }).setOrigin(0.5);
            const front = this.add.image(0, 0, icon).setDisplaySize(120, 120).setVisible(false);
            
            card.add([bg, back, front]);
            card.iconName = icon;

            bg.on('pointerdown', () => this.handleCardClick(card, front, back));
        });
    }

    handleCardClick(card, front, back) {
        if (!this.canClick || this.selectedCards.includes(card) || card.matched) return;

        front.setVisible(true);
        back.setVisible(false);
        this.selectedCards.push(card);

        if (this.selectedCards.length === 2) {
            this.canClick = false;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.selectedCards;

        if (card1.iconName === card2.iconName) {
            card1.matched = true;
            card2.matched = true;
            this.matchedCount += 2;
            this.selectedCards = [];
            this.canClick = true;

            if (this.matchedCount === 12) {
                this.time.delayedCall(1000, () => this.scene.start('Level3Scene'));
            }
        } else {
            this.time.delayedCall(1000, () => {
                card1.list[1].setVisible(true); // back
                card1.list[2].setVisible(false); // front
                card2.list[1].setVisible(true); // back
                card2.list[2].setVisible(false); // front
                this.selectedCards = [];
                this.canClick = true;
            });
        }
    }
}