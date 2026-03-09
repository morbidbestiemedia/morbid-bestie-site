import Phaser from 'phaser';
import { CONFIG } from '../config.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.selectedTool = 'emf';
        this.viewers = 100;
        this.isPaused = false;
    }

    init(data) {
        this.playerChar = data.playerChar || 'liza';
        this.viewers = 100;
        this.selectedTool = 'emf';
        this.isPaused = false;
    }

    create() {
        const { width, height } = this.scale;
        
        // Background - Scaled to be large but detailed
        this.bg = this.add.image(width/2, height/2, 'cemetery')
            .setDisplaySize(width * 2, height * 2)
            .setAlpha(0.6);
            
        // World Bounds for Top-Down - Restrict movement to ground (no sky)
        const skyHeight = height * 0.4;
        this.physics.world.setBounds(-width/2, skyHeight - height/2, width * 2, height * 2 - skyHeight);
            
        // Player Setup - Increased scale for better visibility
        this.player = this.physics.add.sprite(width/2, height/2, this.playerChar);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.35); // Better visibility
        this.player.setDepth(10);
        
        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,ONE,TWO,THREE,SPACE,E');
        
        // Interactive Headstones
        this.headstoneGroup = this.physics.add.staticGroup();
        this.spawnHeadstones();
        
        // Ghost Group
        this.ghostGroup = this.physics.add.group();
        for(let i=0; i<10; i++) {
            this.spawnGhost();
        }
        
        // Eyelashes Group
        this.eyelashGroup = this.physics.add.group();
        for(let i=0; i<15; i++) {
            this.spawnEyelash();
        }

        // Projectile Group
        this.projectileGroup = this.physics.add.group();
        
        // Collisions
        this.physics.add.overlap(this.player, this.eyelashGroup, this.collectEyelash, null, this);
        this.physics.add.overlap(this.player, this.projectileGroup, this.hitByProjectile, null, this);
        this.physics.add.overlap(this.player, this.headstoneGroup, this.checkHeadstoneInteraction, null, this);
        
        // Tools Switching
        this.input.keyboard.on('keydown-ONE', () => !this.isPaused && this.switchTool('emf'));
        this.input.keyboard.on('keydown-TWO', () => !this.isPaused && this.switchTool('thermal'));
        this.input.keyboard.on('keydown-THREE', () => !this.isPaused && this.switchTool('spiritbox'));
        
        // Start UI Scene
        this.scene.launch('UIScene', { viewers: this.viewers, tool: this.selectedTool });
        
        // Camera following
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(-width/2, skyHeight - height/2, width * 2, height * 2 - skyHeight);
        
        // Listen for mini-game results
        this.events.on('spirit-game-result', (success, ghost) => {
            this.isPaused = false;
            if (success) {
                this.finalizeGhostCapture(ghost);
            } else {
                this.events.emit('spirit-message', 'CONNECTION LOST...');
            }
        });

        // Update viewers over time (random drift)
        this.time.addEvent({
            delay: CONFIG.viewersUpdateRate,
            callback: () => {
                const delta = Phaser.Math.Between(-2, 5);
                this.updateViewers(delta);
            },
            loop: true
        });

        // Random Ghost Attacks
        this.time.addEvent({
            delay: 3500,
            callback: () => this.ghostAttack(),
            loop: true
        });
    }

    spawnHeadstones() {
        const { width, height } = this.scale;
        const skyHeight = height * 0.4;
        const epitaphs = [
            { name: "Justin Case", text: "I told you I was sick." },
            { name: "Barry M. Deep", text: "Finally getting some peace and quiet." },
            { name: "Anita Break", text: "Gone, but still tired." },
            { name: "Will B. Back", text: "Don't hold your breath." },
            { name: "Ben Better", text: "Wishing I was literally anywhere else." },
            { name: "Phil Dirt", text: "Underground specialist." },
            { name: "Mona Lott", text: "Still complaining from the beyond." },
            { name: "Sue Flay", text: "Passed away too quickly." },
            { name: "Otto Mobile", text: "Ran out of gas." },
            { name: "I.P. Freely", text: "Resting, finally." }
        ];

        epitaphs.forEach(data => {
            const x = Phaser.Math.Between(-width/2 + 100, width * 1.5 - 100);
            const y = Phaser.Math.Between(skyHeight - height/2 + 100, height * 1.5 - 100);
            
            // Interaction visual indicator (subtle blue glow)
            const indicator = this.add.circle(x, y - 60, 10, 0x00d2ff, 0.5);
            this.tweens.add({
                targets: indicator,
                alpha: 0.1,
                scale: 1.5,
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            const stone = this.add.rectangle(x, y, 100, 120, 0x000000, 0);
            this.physics.add.existing(stone, true);
            stone.setData('epitaph', data);
            stone.setData('indicator', indicator);
            this.headstoneGroup.add(stone);
        });
    }

    checkHeadstoneInteraction(player, stone) {
        if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            const data = stone.getData('epitaph');
            this.events.emit('show-epitaph', data);
            this.events.emit('chat-event', `READING ${data.name.toUpperCase()}'S GRAVE...`);
            this.updateViewers(20); // Viewers like lore
        }
    }

    update() {
        if (this.isPaused) {
            this.player.setVelocity(0, 0);
            return;
        }
        
        this.handlePlayerMovement();
        this.handleToolLogic();
        
        // Ghost Visibility & Danger Logic
        this.ghostGroup.getChildren().forEach(ghost => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, ghost.x, ghost.y);
            
            // Dangerous Proximity Effects
            if (dist < 200 && Math.random() < 0.02) {
                this.events.emit('ui-flicker');
            }

            if (this.selectedTool === 'thermal') {
                const alpha = Phaser.Math.Clamp(1 - dist / 800, 0, 1);
                ghost.setAlpha(alpha);
                ghost.setTint(0xffaa00);
            } else if (this.selectedTool === 'emf' && dist < 200) {
                const pulse = (Math.sin(this.time.now / 100) + 1) / 2;
                ghost.setAlpha(pulse * 0.1);
                ghost.clearTint();
            } else {
                ghost.setAlpha(0);
                ghost.clearTint();
            }
        });
    }

    handlePlayerMovement() {
        let vx = 0;
        let vy = 0;
        
        if (this.cursors.left.isDown || this.keys.A.isDown) vx = -CONFIG.playerSpeed;
        else if (this.cursors.right.isDown || this.keys.D.isDown) vx = CONFIG.playerSpeed;
        
        if (this.cursors.up.isDown || this.keys.W.isDown) vy = -CONFIG.playerSpeed;
        else if (this.cursors.down.isDown || this.keys.S.isDown) vy = CONFIG.playerSpeed;
        
        this.player.setVelocity(vx, vy);
        
        if (vx < 0) this.player.setFlipX(true);
        else if (vx > 0) this.player.setFlipX(false);
    }

    handleToolLogic() {
        if (this.selectedTool === 'emf') {
            let minDistance = Infinity;
            
            // Check distance to ghosts
            this.ghostGroup.getChildren().forEach(ghost => {
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, ghost.x, ghost.y);
                if (dist < minDistance) minDistance = dist;
            });
            
            // Also check distance to interactive headstones
            this.headstoneGroup.getChildren().forEach(stone => {
                const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, stone.x, stone.y);
                if (dist < minDistance) minDistance = dist;
            });

            this.events.emit('emf-reading', minDistance);
        } else if (this.selectedTool === 'spiritbox') {
            if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
                let closestGhost = null;
                let minDistance = 300; 
                this.ghostGroup.getChildren().forEach(ghost => {
                    const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, ghost.x, ghost.y);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestGhost = ghost;
                    }
                });
                if (closestGhost) this.communicateWithGhost(closestGhost);
            }
        }
    }

    switchTool(tool) {
        this.selectedTool = tool;
        this.events.emit('tool-switched', tool);
    }

    ghostAttack() {
        const activeGhosts = this.ghostGroup.getChildren().filter(g => g.active);
        if (activeGhosts.length === 0) return;

        const ghost = activeGhosts[Phaser.Math.Between(0, activeGhosts.length - 1)];
        const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, ghost.x, ghost.y);

        if (dist < 700) {
            const projectile = this.projectileGroup.create(ghost.x, ghost.y, 'eyelashes');
            projectile.setScale(0.12);
            projectile.setTint(0xff3333);
            this.physics.moveToObject(projectile, this.player, 350);
            this.events.emit('chat-event', 'WATCH OUT! GHOST THROW!');
            this.time.delayedCall(3000, () => projectile.destroy());
        }
    }

    hitByProjectile(player, projectile) {
        projectile.destroy();
        this.updateViewers(-300);
        this.cameras.main.shake(200, 0.015);
        this.events.emit('ui-flicker');
        this.events.emit('chat-event', 'LMAO THE STREAMER GOT ROCKED');
    }

    spawnGhost() {
        const { width, height } = this.scale;
        const x = Phaser.Math.Between(-width/2, width * 1.5);
        const y = Phaser.Math.Between(-height/2, height * 1.5);
        const ghost = this.ghostGroup.create(x, y, 'ghost');
        ghost.setScale(0.25); // Better scale for world
        ghost.setAlpha(0);
        
        this.tweens.add({
            targets: ghost,
            x: x + Phaser.Math.Between(-200, 200),
            y: y + Phaser.Math.Between(-200, 200),
            duration: Phaser.Math.Between(2000, 5000),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    spawnEyelash() {
        const { width, height } = this.scale;
        const x = Phaser.Math.Between(-width/2, width * 1.5);
        const y = Phaser.Math.Between(-height/2, height * 1.5);
        const eyelash = this.eyelashGroup.create(x, y, 'eyelashes');
        eyelash.setScale(0.08); 
        eyelash.setDepth(5);
        
        this.tweens.add({
            targets: eyelash,
            y: y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    collectEyelash(player, eyelash) {
        eyelash.destroy();
        this.updateViewers(CONFIG.eyelashValue);
        this.spawnEyelash();
        this.events.emit('chat-event', 'OOOH EYELASHES! +50 VIEWS');
    }

    communicateWithGhost(ghost) {
        this.isPaused = true;
        this.events.emit('start-spirit-game', ghost);
    }

    finalizeGhostCapture(ghost) {
        this.tweens.add({
            targets: ghost,
            scale: 0.05,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                ghost.destroy();
                this.updateViewers(CONFIG.spiritBoxValue);
                this.spawnGhost();
            }
        });
        const msgs = ['INSANE GHOST VOICE!', 'EVP CAPTURED!', 'DID YOU HEAR THAT?'];
        this.events.emit('chat-event', msgs[Phaser.Math.Between(0, msgs.length-1)]);
    }

    updateViewers(amount) {
        this.viewers += amount;
        if (this.viewers <= 0) {
            this.viewers = 0;
            this.events.emit('viewers-updated', this.viewers);
            this.events.emit('game-over');
            this.isPaused = true;
            return;
        }
        
        this.events.emit('viewers-updated', this.viewers);
        
        if (this.viewers >= 5000) {
            this.events.emit('game-win');
            this.isPaused = true;
            this.time.delayedCall(3000, () => {
                this.scene.stop('UIScene');
                this.scene.start('Level2Scene');
            });
        }
    }
}