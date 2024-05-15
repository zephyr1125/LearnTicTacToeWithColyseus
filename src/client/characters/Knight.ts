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

export default class Knight extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, 'knight')
        this.play('knight_idle')
    }

    update(cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys): void{

        if (!cursorKeys) {
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