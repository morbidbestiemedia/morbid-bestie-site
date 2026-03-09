import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class Level3Scene extends Phaser.Scene {
    constructor() {
        super('Level3Scene');
        this.bossHP = 1000;
        this.playerHP = 100;
        this.turn = 'player';
        this.canAct = true;
        this.turnCount = 0;
        this.dotTurns = 0;
    }

    create() {
        const { width, height } = this.scale;
        
        this.add.image(width/2, height/2, 'cemetery').setAlpha(0.2).setDisplaySize(width, height);
        
        this.add.text(width/2, 100, 'FINAL BOSS: THE SPECTRAL OVERLORD', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            fill: '#ff0000'
        }).setOrigin(0.5);

        this.boss = this.add.image(width/2, height/2 - 100, 'boss').setScale(0.8);
        this.bossHPBar = this.add.graphics();
        this.updateBossHP();

        this.playerHPText = this.add.text(width/2, height - 350, `PLAYER HEALTH: ${this.playerHP}`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            fill: '#00ff00'
        }).setOrigin(0.5);

        this.battleLog = this.add.text(width/2, height - 420, 'YOUR TURN! SELECT A WEAPON', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.createActions();
    }

    createActions() {
        const { width, height } = this.scale;
        const actions = [
            { icon: 'candle', label: 'CANDLE', desc: 'FIRE BLAST (100 DMG)', callback: () => this.playerAttack(100, 'fire blast') },
            { icon: 'holyWater', label: 'HOLY WATER', desc: '50 DMG + 15 DoT', callback: () => {
                this.dotTurns = 3;
                this.playerAttack(50, 'holy water');
            }},
            { icon: 'crucifix', label: 'CRUCIFIX', desc: '500 DMG (3 TURN CD)', cooldown: 4, callback: () => this.playerAttack(500, 'holy light') }
        ];

        actions.forEach((action, index) => {
            const x = width/2 - 400 + index * 400;
            const y = height - 150;

            const btn = this.add.container(x, y);
            const bg = this.add.rectangle(0, 0, 350, 180, 0x1a1a1a).setStrokeStyle(4, 0xffffff).setInteractive({ useHandCursor: true });
            const img = this.add.image(0, -30, action.icon).setDisplaySize(80, 80);
            const label = this.add.text(0, 50, action.label, { fontSize: '20px', fontFamily: '"Press Start 2P"' }).setOrigin(0.5);
            
            btn.add([bg, img, label]);
            
            bg.on('pointerdown', () => {
                if (this.canAct && this.turn === 'player') {
                    if (action.currentCooldown > 0) {
                        this.battleLog.setText(`COOLDOWN: ${action.currentCooldown} TURNS!`);
                        return;
                    }
                    action.callback();
                    if (action.cooldown) action.currentCooldown = action.cooldown;
                }
            });

            action.button = btn;
            action.currentCooldown = 0;
        });

        this.playerActions = actions;
    }

    updateBossHP() {
        this.bossHPBar.clear();
        this.bossHPBar.fillStyle(0x333333);
        this.bossHPBar.fillRect(this.scale.width/2 - 300, 200, 600, 40);
        this.bossHPBar.fillStyle(0xff0000);
        this.bossHPBar.fillRect(this.scale.width/2 - 300, 200, (Math.max(0, this.bossHP) / 1000) * 600, 40);
    }

    playerAttack(damage, type) {
        this.canAct = false;
        this.bossHP -= damage;
        this.updateBossHP();
        this.battleLog.setText(`YOU USED ${type.toUpperCase()}!`);
        
        this.tweens.add({
            targets: this.boss,
            x: '+=20',
            yoyo: true,
            duration: 50,
            repeat: 5
        });

        this.time.delayedCall(1500, () => {
            if (this.bossHP <= 0) {
                this.winGame();
            } else {
                this.bossTurn();
            }
        });
    }

    bossTurn() {
        this.turn = 'boss';
        this.turnCount++;
        
        // Apply DoT
        if (this.dotTurns > 0) {
            this.bossHP -= 15;
            this.dotTurns--;
            this.updateBossHP();
            this.battleLog.setText('HOLY WATER BURNS THE SPECTER!');
        }

        this.time.delayedCall(1000, () => {
            if (this.bossHP <= 0) {
                this.winGame();
                return;
            }

            // Attack Patterns
            let dmg = 0;
            let moveName = "";

            if (this.turnCount % 5 === 0) {
                moveName = "POSSESSION";
                dmg = 35;
                this.cameras.main.flash(500, 255, 0, 0, 0.5);
            } else if (this.turnCount % 3 === 0) {
                moveName = "LIFE LEACH";
                dmg = 15;
                this.bossHP = Math.min(1000, this.bossHP + 50);
                this.updateBossHP();
                this.boss.setTint(0x00ff00);
                this.time.delayedCall(500, () => this.boss.clearTint());
            } else if (Math.random() > 0.5) {
                moveName = "EVP SCREAM";
                dmg = 20;
                this.uiFlicker();
            } else {
                moveName = "SPECTRAL SLAM";
                dmg = 12;
            }

            this.battleLog.setText(`BOSS USES ${moveName}!`);
            this.playerHP -= dmg;
            this.playerHPText.setText(`PLAYER HEALTH: ${Math.max(0, this.playerHP)}`);
            this.cameras.main.shake(300, 0.01);

            this.time.delayedCall(2000, () => {
                if (this.playerHP <= 0) {
                    this.loseGame();
                } else {
                    this.turn = 'player';
                    this.canAct = true;
                    this.playerActions.forEach(a => { if(a.currentCooldown > 0) a.currentCooldown--; });
                    this.battleLog.setText('YOUR TURN! SELECT A WEAPON');
                }
            });
        });
    }

    uiFlicker() {
        this.tweens.add({
            targets: [this.playerHPText, this.battleLog],
            alpha: 0,
            duration: 50,
            yoyo: true,
            repeat: 5
        });
    }

    winGame() {
        const { width, height } = this.scale;
        const overlay = this.add.container(width/2, height/2);
        const bg = this.add.rectangle(0, 0, width, height, 0x000000, 0.9);
        const text = this.add.text(0, 0, 'OVERLORD DEFEATED!\n\nTHE MASSEYS REIGN SUPREME!', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            fill: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);
        overlay.add([bg, text]);
        overlay.setDepth(100);
        this.time.delayedCall(4000, () => window.location.reload());
    }

    loseGame() {
        const { width, height } = this.scale;
        const overlay = this.add.container(width/2, height/2);
        const bg = this.add.rectangle(0, 0, width, height, 0x000000, 0.9);
        const text = this.add.text(0, 0, 'STREAM TERMINATED...\n\nOVERLORD CONSUMED THE MASSEYS', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            fill: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);
        overlay.add([bg, text]);
        overlay.setDepth(100);
        this.time.delayedCall(4000, () => window.location.reload());
    }
}