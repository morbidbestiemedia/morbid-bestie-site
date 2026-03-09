import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        const { width, height } = this.scale;
        
        // Live Overlay Top Bar
        const bar = this.add.graphics();
        bar.fillStyle(0x000000, 0.6);
        bar.fillRect(0, 0, width, 120);
        
        // LIVE Badge
        const liveBadge = this.add.container(60, 60);
        const badgeBg = this.add.rectangle(0, 0, 150, 60, 0xff0000).setOrigin(0, 0.5);
        const badgeText = this.add.text(10, 0, '● LIVE', {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);
        liveBadge.add([badgeBg, badgeText]);
        
        // Viewer Count
        this.viewerText = this.add.text(250, 60, '100 viewers', {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0, 0.5);
        
        // Chat Window (Bottom Right)
        const chatContainer = this.add.container(width - 450, height - 400);
        const chatBg = this.add.rectangle(0, 0, 420, 350, 0x000000, 0.4).setOrigin(0);
        this.chatMessages = [];
        this.chatText = this.add.text(20, 20, '', {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px',
            fill: '#ffffff',
            wordWrap: { width: 380 }
        }).setOrigin(0);
        chatContainer.add([chatBg, this.chatText]);
        
        // Tools UI (Bottom Left)
        const toolsContainer = this.add.container(40, height - 120);
        this.toolIndicators = {
            emf: this.createToolIcon(0, 0, '1', 'EMF', null),
            thermal: this.createToolIcon(160, 0, '2', 'CAMERA', 'camera'),
            spiritbox: this.createToolIcon(320, 0, '3', 'RADIO', 'radio')
        };
        toolsContainer.add(Object.values(this.toolIndicators));
        
        // Tool Meter (EMF) - Repositioned to Center Left
        this.emfMeter = this.add.container(60, height / 2 - 150);
        const meterBg = this.add.rectangle(0, 0, 80, 300, 0x1a1a1a, 0.9).setStrokeStyle(4, 0xffffff);
        const meterLabel = this.add.text(0, -40, 'EMF', {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Create 5 LEDs for EMF levels vertically
        this.leds = [];
        const ledColors = [0x00ff00, 0xccff00, 0xffff00, 0xffaa00, 0xff0000];
        for (let i = 0; i < 5; i++) {
            const led = this.add.rectangle(0, 100 - i * 50, 50, 40, 0x333333).setOrigin(0.5);
            this.leds.push({ rect: led, color: ledColors[i] });
        }
        this.emfMeter.add([meterBg, meterLabel, ...this.leds.map(l => l.rect)]);
        this.emfMeter.setVisible(true); // Always visible
        
        // Thermal Overlay
        this.thermalOverlay = this.add.rectangle(0, 0, width, height, 0xffaa00, 0.1)
            .setOrigin(0)
            .setVisible(false)
            .setBlendMode(Phaser.BlendModes.ADD);
            
        // ... previous code for Spirit Box UI ...
            
        // Spirit Box Mini-game UI
        this.spiritGameContainer = this.add.container(width / 2, height / 2).setVisible(false);
        const gameBg = this.add.rectangle(0, 0, 800, 300, 0x000000, 0.9).setStrokeStyle(4, CONFIG.colors.neonBlue);
        const gameTitle = this.add.text(0, -100, 'TUNING SPIRIT BOX...', {
            fontFamily: '"Press Start 2P"',
            fontSize: '28px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        const gameSubTitle = this.add.text(0, -60, 'MATCH FREQUENCY SEQUENCE', {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px',
            fill: '#888888'
        }).setOrigin(0.5);
        this.sequenceText = this.add.text(0, 40, '', {
            fontFamily: '"Press Start 2P"',
            fontSize: '60px',
            fill: CONFIG.colors.neonBlue
        }).setOrigin(0.5);
        this.spiritGameContainer.add([gameBg, gameTitle, gameSubTitle, this.sequenceText]);

        // Goal Indicator
        this.goalText = this.add.text(250, 100, `GOAL: ${CONFIG.goalViewers}`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px',
            fill: '#ffff00'
        }).setOrigin(0, 0.5);

        // Win Screen / Celebration
        this.winOverlay = this.add.container(width/2, height/2).setVisible(false);
        const winBg = this.add.rectangle(0, 0, width, height, 0x000000, 0.85);
        const winText = this.add.text(0, -100, 'STREAM VIRAL!', {
            fontFamily: '"Press Start 2P"',
            fontSize: '60px',
            fill: '#ffff00',
            stroke: '#ff0000',
            strokeThickness: 8
        }).setOrigin(0.5);
        const subWinText = this.add.text(0, 50, '5,000+ VIEWERS REACHED\n\nYOU ARE A PARANORMAL STAR!', {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);
        
        const restartBtnWin = this.add.text(0, 250, 'GO LIVE AGAIN?', {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        this.winOverlay.add([winBg, winText, subWinText, restartBtnWin]);
        this.winOverlay.setDepth(100);

        // Game Over Screen
        this.gameOverOverlay = this.add.container(width/2, height/2).setVisible(false);
        const loseBg = this.add.rectangle(0, 0, width, height, 0x000000, 0.9);
        const loseText = this.add.text(0, -100, 'STREAM ENDED', {
            fontFamily: '"Press Start 2P"',
            fontSize: '60px',
            fill: '#ff0000'
        }).setOrigin(0.5);
        const subLoseText = this.add.text(0, 50, 'AUDIENCE LOST INTEREST\n\nCHANNEL TERMINATED', {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#888888',
            align: 'center'
        }).setOrigin(0.5);
        
        const restartBtnLose = this.add.text(0, 250, 'TRY ANOTHER STREAM?', {
            fontFamily: '"Press Start 2P"',
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        
        this.gameOverOverlay.add([loseBg, loseText, subLoseText, restartBtnLose]);
        this.gameOverOverlay.setDepth(100);

        // Restart Handlers
        const restartGame = () => {
            this.scene.stop('GameScene');
            this.scene.start('MenuScene');
        };
        restartBtnWin.on('pointerdown', restartGame);
        restartBtnLose.on('pointerdown', restartGame);

        // Epitaph Window
        this.epitaphContainer = this.add.container(width / 2, height / 2).setVisible(false);
        const epitaphBg = this.add.rectangle(0, 0, 700, 300, 0x1a1a1a, 0.95).setStrokeStyle(4, CONFIG.colors.neonPurple);
        this.epitaphName = this.add.text(0, -80, '', {
            fontFamily: '"Press Start 2P"',
            fontSize: '28px',
            fill: CONFIG.colors.neonBlue
        }).setOrigin(0.5);
        this.epitaphText = this.add.text(0, 20, '', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);
        const closePrompt = this.add.text(0, 110, '(CLICK TO CLOSE)', {
            fontFamily: '"Press Start 2P"',
            fontSize: '14px',
            fill: '#888888'
        }).setOrigin(0.5);
        this.epitaphContainer.add([epitaphBg, this.epitaphName, this.epitaphText, closePrompt]);
        
        epitaphBg.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.epitaphContainer.setVisible(false);
        });

        // Event Listeners from GameScene
        const gameScene = this.scene.get('GameScene');
        
        gameScene.events.on('show-epitaph', (data) => {
            this.epitaphName.setText(data.name);
            this.epitaphText.setText(`"${data.text}"`);
            this.epitaphContainer.setVisible(true);
            this.addChatMessage('SYSTEM', `Epitaph: ${data.name}`, CONFIG.colors.neonPurple);
        });

        gameScene.events.on('ui-flicker', () => {
            this.cameras.main.shake(100, 0.005);
            this.add.tween({
                targets: [this.viewerText, this.chatText, this.emfMeter],
                alpha: 0,
                duration: 50,
                yoyo: true,
                repeat: 3
            });
        });

        gameScene.events.on('chat-event', (msg) => {
            this.addChatMessage('Chat', msg, 0xffffff);
        });

        gameScene.events.on('game-win', () => {
            this.winOverlay.setVisible(true);
            this.addChatMessage('SYSTEM', 'VIRAL STATUS ACHIEVED!', 0xffff00);
            
            // Celebration sequence: flashes and chat flood
            this.time.addEvent({
                delay: 200,
                repeat: 10,
                callback: () => {
                    this.cameras.main.flash(150, 255, 255, 0, 0.2);
                    this.addChatMessage('Viewer' + Phaser.Math.Between(1, 999), 'GOAT!! 👑👑👑', 0xffff00);
                }
            });
        });

        gameScene.events.on('game-over', () => {
            this.gameOverOverlay.setVisible(true);
            this.addChatMessage('SYSTEM', 'CONNECTION TERMINATED.', 0xff0000);
        });

        gameScene.events.on('start-spirit-game', (ghost) => {
            this.startSpiritMiniGame(ghost);
        });
        
        gameScene.events.on('viewers-updated', (count) => {
            this.viewerText.setText(`${count} viewers`);
            if (count % 500 === 0 && count > 0) this.addChatMessage('SYSTEM', 'VIRAL MOMENT! VIEWS SOARING!', CONFIG.colors.neonPurple);
        });
        
        gameScene.events.on('tool-switched', (tool) => {
            this.updateToolSelection(tool);
            this.thermalOverlay.setVisible(tool === 'thermal');
            this.addChatMessage('STREAM', `SWITCHED TO ${tool.toUpperCase()}`, 0x888888);
        });
        
        gameScene.events.on('emf-reading', (distance) => {
            // Distance 1500+ = Level 0
            // Distance 0 = Level 5
            const level = Phaser.Math.Clamp(Math.floor(5 - distance / 300), 0, 5);
            
            this.leds.forEach((led, index) => {
                if (index < level) {
                    led.rect.setFillStyle(led.color);
                } else {
                    led.rect.setFillStyle(0x333333);
                }
            });

            if (level >= 4) {
                if (this.time.now % 200 < 50) this.cameras.main.shake(100, 0.002);
            }
        });
        
        gameScene.events.on('spirit-message', (msg) => {
            this.addChatMessage('GHOST', msg, CONFIG.colors.neonBlue);
            this.addChatMessage('Viewer42', 'OMG DID YOU SEE THAT??', 0xffffff);
        });
        
        this.updateToolSelection('emf');
        this.addChatMessage('ChatBot', 'Welcome to the ghost hunt!', 0x00ff00);
        this.addChatMessage('LizaFan', 'Liza is the best!', 0xff00ff);
        this.addChatMessage('DanBro', 'Dont get spooked Dan!', 0x00ffff);
    }

    createToolIcon(x, y, key, label, iconKey) {
        const container = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 140, 100, 0x1a1a1a).setStrokeStyle(2, 0xffffff);
        
        let visual;
        if (iconKey) {
            visual = this.add.image(0, -10, iconKey).setDisplaySize(60, 60);
        } else {
            visual = this.add.text(0, -10, label, {
                fontFamily: '"Press Start 2P"',
                fontSize: '14px',
                fill: '#ffffff'
            }).setOrigin(0.5);
        }
        
        const keyText = this.add.text(0, 35, key, {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        container.add([bg, visual, keyText]);
        container.bg = bg;
        return container;
    }

    updateToolSelection(selectedTool) {
        Object.keys(this.toolIndicators).forEach(tool => {
            const isSelected = tool === selectedTool;
            this.toolIndicators[tool].bg.setStrokeStyle(isSelected ? 6 : 2, isSelected ? CONFIG.colors.neonBlue : 0xffffff);
            this.toolIndicators[tool].setScale(isSelected ? 1.1 : 1);
        });
        
        // EMF meter always visible now, no need to toggle
    }

    startSpiritMiniGame(ghost) {
        this.spiritGameContainer.setVisible(true);
        const sequence = [];
        const possibleKeys = ['W', 'A', 'S', 'D'];
        const arrows = { 'W': '↑', 'A': '←', 'S': '↓', 'D': '→' };
        
        // Random "audio" messages for the spirit box
        const spiritVoices = ["GET OUT", "I AM HERE", "BEHIND YOU", "HELP ME", "TOO LATE"];
        const message = spiritVoices[Phaser.Math.Between(0, spiritVoices.length - 1)];
        this.addChatMessage('SPIRIT BOX', `Voice: "${message}"`, CONFIG.colors.neonBlue);

        for (let i = 0; i < 4; i++) {
            sequence.push(possibleKeys[Phaser.Math.Between(0, 3)]);
        }
        
        let currentIndex = 0;
        this.updateSequenceDisplay(sequence, currentIndex, arrows);
        
        const keyListener = (event) => {
            const key = event.key.toUpperCase();
            if (possibleKeys.includes(key)) {
                if (key === sequence[currentIndex]) {
                    currentIndex++;
                    if (currentIndex >= sequence.length) {
                        this.endSpiritMiniGame(true, ghost, keyListener);
                    } else {
                        this.updateSequenceDisplay(sequence, currentIndex, arrows);
                    }
                } else {
                    this.endSpiritMiniGame(false, ghost, keyListener);
                }
            }
        };
        
        window.addEventListener('keydown', keyListener);
        
        // Timeout
        this.spiritGameTimeout = this.time.delayedCall(3000, () => {
            this.endSpiritMiniGame(false, ghost, keyListener);
        });
    }

    updateSequenceDisplay(sequence, currentIndex, arrows) {
        const display = sequence.map((key, index) => {
            if (index < currentIndex) return '✓';
            return arrows[key];
        }).join(' ');
        this.sequenceText.setText(display);
    }

    endSpiritMiniGame(success, ghost, listener) {
        window.removeEventListener('keydown', listener);
        if (this.spiritGameTimeout) this.spiritGameTimeout.remove();
        
        this.spiritGameContainer.setVisible(false);
        const gameScene = this.scene.get('GameScene');
        gameScene.events.emit('spirit-game-result', success, ghost);
    }

    addChatMessage(user, msg, color) {
        this.chatMessages.push({ user, msg, color });
        if (this.chatMessages.length > 8) this.chatMessages.shift();
        
        const content = this.chatMessages.map(m => `${m.user}: ${m.msg}`).join('\n\n');
        this.chatText.setText(content);
        
        // Highlight users with color if possible, but 8-bit text block is fine
    }
}