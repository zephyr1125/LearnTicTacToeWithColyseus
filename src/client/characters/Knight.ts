import Phaser from 'phaser'

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            knight(x: number, y: number): Knight
        }
    }
}

enum HealthState
{
    IDLE,
    DAMAGE,
    DEAD
}

export default class Knight extends Phaser.Physics.Arcade.Sprite
{
    private healthState = HealthState.IDLE
    private damageTime = 0

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'knight')
        this.play('knight_idle')
    }

    handleDamage(dir: Phaser.Math.Vector2): void {
        if (this.healthState === HealthState.DAMAGE)
        {
            return
        }
        this.setVelocity(dir.x, dir.y)
        this.healthState = HealthState.DAMAGE
        //着色
        this.setTint(0xff0000)
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        switch (this.healthState)
        {
            case HealthState.IDLE:
                break
            case HealthState.DAMAGE:
                this.damageTime += delta
                if (this.damageTime >= 250)
                {
                    this.healthState = HealthState.IDLE
                    this.damageTime = 0
                    this.clearTint()
                }
                break
            case HealthState.DEAD:
                break
        }
    }

    update(cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys): void{
        super.update()

        if (!cursorKeys) {
            return
        }

        if (this.healthState === HealthState.DAMAGE)
        {
            return
        }

        const speed = 100
        const prevVelocity = this.body.velocity.clone()

        this.setVelocity(0)

        if (cursorKeys.left?.isDown) {
            this.setVelocityX(-speed)
        } else if (cursorKeys.right?.isDown) {
            this.setVelocityX(speed)
        }

        if (cursorKeys.up?.isDown) {
            this.setVelocityY(-speed)
        } else if (cursorKeys.down?.isDown) {
            this.setVelocityY(speed)
        }

        this.body.velocity.normalize().scale(speed)

        if (cursorKeys.left?.isDown || cursorKeys.right?.isDown ||
             cursorKeys.up?.isDown || cursorKeys.down?.isDown) {
            this.play('knight_run', true)
            //左侧需要镜像
            if (cursorKeys.left?.isDown || cursorKeys.up?.isDown) {
                this.setFlipX(true)
            } else {
                this.setFlipX(false)
            }
        } else {
            this.play('knight_idle', true)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('knight',
 function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number): Knight {
    const knight = new Knight(this.scene, x, y)

    this.displayList.add(knight)
    this.updateList.add(knight)

    this.scene.physics.world.enableBody(knight, Phaser.Physics.Arcade.DYNAMIC_BODY)

    //角色碰撞框设置为一格
    knight.setSize(8, 8).setOffset(4, 21)

    return knight
 })