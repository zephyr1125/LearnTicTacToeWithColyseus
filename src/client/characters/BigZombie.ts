import Phaser from 'phaser'

enum Direction
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const ramdomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 3)
    while (newDirection === exclude)
    {
        newDirection = Phaser.Math.Between(0, 3)
    }

    return newDirection
}

export default class BigZombie extends Phaser.Physics.Arcade.Sprite
{
    private direction = Direction.RIGHT
    private moveEvent: Phaser.Time.TimerEvent

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'big_zombie')
        this.play('big_zombie_idle')

        //撞墙时改变方向
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,
             this.handleTileCollision, this)

        //随时间改变方向
        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.direction = ramdomDirection(this.direction)
            }
        })
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
        if (go !== this) {
            return
        }
        
        this.direction = ramdomDirection(this.direction)
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)

        const speed = 50

        switch (this.direction)
        {
            case Direction.UP:
                this.setVelocity(0, -speed)
                break

            case Direction.DOWN:
                this.setVelocity(0, speed)
                break

            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                break

            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                break
        }
    }

    destroy(fromScene?: boolean): void {
        this.moveEvent.destroy()
        super.destroy(fromScene)
    }
}