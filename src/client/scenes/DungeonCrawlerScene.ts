import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'
import { createKnightAnims, createBigZombieAnim } from '../anims/CharacterAnims'
import BigZombie from '../characters/BigZombie'

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
        const tilesetFloor = map.addTilesetImage('dungeon_floor', 'tiles_floor', 16, 16, 1, 2)
        const tilesetWall = map.addTilesetImage('atlas_walls_low-16x16', 'tiles_wall', 16, 16, 1, 2)

        const floorLayer = map.createLayer('floor', tilesetFloor)
        const wallLayer = map.createLayer('walls', tilesetWall)

        wallLayer.setCollisionByProperty({ collides: true })

        // debugDraw(this, wallLayer)

        //player
        this.player = this.createPlayer(wallLayer)

        //big zombie
        createBigZombieAnim(this.anims)
        const zombies = this.physics.add.group({
            classType: BigZombie,
            createCallback: (go) => {
                const bigZombie = go as BigZombie
                bigZombie.setSize(12, 12).setOffset(11, 27)
                bigZombie.body.onCollide = true;
            }
        })
        //设置碰撞
        this.physics.add.collider(zombies, wallLayer)
        zombies.get(8 + 16 * 3, 8 + 16 * 5 + 2)
        zombies.get(8 + 16 * 5, 8 + 16 * 5 + 2)
    }

    private createPlayer(wallLayer: Phaser.Tilemaps.TilemapLayer) {
        var player = this.physics.add.sprite(8 + 16 * 2, 8 + 16 * 2 + 2, 'knight')
        createKnightAnims(this.anims)
        player.play('player_idle')
        //角色碰撞框设置为一格
        player.setSize(8, 8).setOffset(4, 21)
        //设置碰撞
        this.physics.add.collider(player, wallLayer)

        //摄像机跟随
        this.cameras.main.startFollow(player)

        return player
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
            this.player.play('player_run', true)
            //左侧需要镜像
            if (this.cursorKeys.left?.isDown || this.cursorKeys.up?.isDown) {
                this.player.setFlipX(true)
            } else {
                this.player.setFlipX(false)
            }
        } else {
            this.player.play('player_idle', true)
        }
    }
}