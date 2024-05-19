import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'
import { createKnightAnims, createBigZombieAnim } from '../anims/CharacterAnims'
import Knight from '../characters/Knight'
import BigZombie from '../characters/BigZombie'
import { sceneEvents } from '../events/EventsCenter'

export default class DungeonCrawlerScene extends Phaser.Scene {
    private static readonly KEY: string = 'dungeon-crawler'

    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys
    private player?: Knight

    constructor()
    {
        super(DungeonCrawlerScene.KEY)

    }

    preload(): void {
        this.cursorKeys = this.input.keyboard.createCursorKeys()   
        this.load.bitmapFont('zpix', 'assets/zpix_0.png', 'assets/zpix.fnt');
    }

    create(): void {
        this.scene.run('game-ui')

        //map
        const map = this.make.tilemap({ key: 'dungeon' })
        const tilesetFloor = map.addTilesetImage('dungeon_floor', 'tiles_floor', 16, 16, 1, 2)
        const tilesetWall = map.addTilesetImage('atlas_walls_low-16x16', 'tiles_wall', 16, 16, 1, 2)

        const floorLayer = map.createLayer('floor', tilesetFloor)
        const wallLayer = map.createLayer('walls', tilesetWall)

        wallLayer.setCollisionByProperty({ collides: true })

        // debugDraw(this, wallLayer)

        //player
        createKnightAnims(this.anims)
        this.player = this.add.knight(8 + 16 * 2, 8 + 16 * 2 + 2)
        //设置碰撞
        this.physics.add.collider(this.player, wallLayer)
        //摄像机跟随
        this.cameras.main.startFollow(this.player)

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

        //设置玩家与怪物相撞
        this.physics.add.collider(zombies, this.player,
             this.handlePlayerCollideWithZombie, undefined, this)   //必须提供上下文this，否则函数内的this概念不同

        //knives
        const knives = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image
        })
        this.physics.add.collider(knives, wallLayer, (knife) => {
            knife.destroy()
        })
        this.physics.add.collider(knives, zombies, (knife, zombie) => {
            knife.destroy()
            zombie.destroy()
        })
        this.player.setKnives(knives)

        this.add.bitmapText(0, 0, "zpix", "排行榜！")
    }

    handlePlayerCollideWithZombie(
        obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) : void {
        if(this.player === undefined){
            return
        }
        console.log('player collide with zombie');
        const zombie = obj2 as BigZombie
        const dx = this.player.x - zombie.x
        const dy = this.player.y - zombie.y
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(100)
        this.player.handleDamage(dir)
        sceneEvents.emit('player-health-changed', this.player.health)
    }

    update(): void {

        if(this.player && this.cursorKeys){
            this.player.update(this.cursorKeys)
        }
    }
}