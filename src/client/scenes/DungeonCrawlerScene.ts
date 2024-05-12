import Phaser from 'phaser'

export default class DungeonCrawlerScene extends Phaser.Scene {
    private static readonly KEY: string = 'dungeon-crawler'

    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys
    private player?: Phaser.Physics.Arcade.Sprite

    constructor()
    {
        super(DungeonCrawlerScene.KEY)
    }

    preload(): void {
        this.cursorKeys = this.input.keyboard.createCursorKeys()   
    }

    create(): void {
        //map
        const map = this.make.tilemap({ key: 'dungeon' })
        const tilesetFloor = map.addTilesetImage('dungeon_floor', 'tiles_floor')
        const tilesetWall = map.addTilesetImage('atlas_walls_low-16x16', 'tiles_wall')

        const floorLayer = map.createLayer('floor', tilesetFloor)
        const wallLayer = map.createLayer('walls', tilesetWall)

        wallLayer.setCollisionByProperty({ collides: true })

        // const debugGraphics = this.add.graphics().setAlpha(0.75)
        // wallLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })

        //player
        this.player = this.physics.add.sprite(8+16*2, 8+16*2+2, 'knight')
        this.anims.create({
            key: 'idle', 
            frames: this.anims.generateFrameNames('knight',
             { prefix: 'knight_m_idle_anim_f', suffix: '.png', start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'run', 
            frames: this.anims.generateFrameNames('knight',
             { prefix: 'knight_m_run_anim_f', suffix: '.png', start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.player.play('idle')
        //角色碰撞框设置为一格
        this.player.setSize(8, 8).setOffset(4, 21)
        //设置碰撞
        this.physics.add.collider(this.player, wallLayer)
    }

    update(): void {
        if (!this.cursorKeys || !this.player) {
            return
        }

        const speed = 100
        const prevVelocity = this.player.body.velocity.clone()

        this.player.setVelocity(0)

        if (this.cursorKeys.left?.isDown) {
            this.player.setVelocityX(-speed)
        } else if (this.cursorKeys.right?.isDown) {
            this.player.setVelocityX(speed)
        }

        if (this.cursorKeys.up?.isDown) {
            this.player.setVelocityY(-speed)
        } else if (this.cursorKeys.down?.isDown) {
            this.player.setVelocityY(speed)
        }

        this.player.body.velocity.normalize().scale(speed)

        if (this.cursorKeys.left?.isDown || this.cursorKeys.right?.isDown ||
             this.cursorKeys.up?.isDown || this.cursorKeys.down?.isDown) {
            this.player.play('run', true)
            //左侧需要镜像
            if (this.cursorKeys.left?.isDown || this.cursorKeys.up?.isDown) {
                this.player.setFlipX(true)
            } else {
                this.player.setFlipX(false)
            }
        } else {
            this.player.play('idle', true)
        }
    }
}