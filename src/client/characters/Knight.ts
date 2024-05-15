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
    private _healthState = HealthState.IDLE
    private _damageTime = 0
    private _health = 3

    get health(): number
    {
        return this._health
    }

    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'knight')
        this.play('knight_idle')
    }

    handleDamage(dir: Phaser.Math.Vector2): void {
        if (this._healthState === HealthState.DAMAGE ||
             this._healthState === HealthState.DEAD)
        {
            return
        }
        this.setVelocity(dir.x, dir.y)
        this._healthState = HealthState.DAMAGE

        this._health -= 1
        //着色
        this.setTint(0xff0000)

        if (this._health <= 0)
        {
            this.die()
        }
    }

    private die() {
        this._healthState = HealthState.DEAD
        //转为鬼魂
        //逐渐上升
        this.setVelocity(0, -20)
        //alpha渐变到0
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            velocityX: 0,
            velocityY: 0,
            duration: 3000,
            ease: 'Power2'
        }).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
            //关卡重开
            // this.scene.scene.restart()
        })
        this.body.checkCollision.none = true
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        switch (this._healthState)
        {
            case HealthState.IDLE:
                break
            case HealthState.DAMAGE:
                this._damageTime += delta
                if (this._damageTime >= 250)
                {
                    this._healthState = HealthState.IDLE
                    this._damageTime = 0
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

        if (this._healthState === HealthState.DAMAGE)
        {
            return
        }
        

        if (this._healthState != HealthState.DEAD)
        {
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