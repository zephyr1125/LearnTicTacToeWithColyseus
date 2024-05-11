import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene
{
    private platforms?: Phaser.Physics.Arcade.StaticGroup
    private player?: Phaser.Physics.Arcade.Sprite
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private stars?: Phaser.Physics.Arcade.Group
    private score = 0
    private scoreText?: Phaser.GameObjects.Text

    constructor()
    {
        super('hello-world')
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/platform.png')
        this.load.image('star', 'assets/star.png')
        this.load.image('bomb', 'assets/bomb.png')
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        )
    }

    create()
    {
        this.add.image(400, 300, 'sky')

        //platforms
        this.platforms = this.physics.add.staticGroup()

        const ground = this.platforms.create(400, 568, 'ground') as Phaser.Physics.Arcade.Sprite
        ground.setScale(2).refreshBody()

        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')

        //player
        this.player = this.physics.add.sprite(100, 450, 'dude')

        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platforms)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        })

        this.cursors = this.input.keyboard?.createCursorKeys()

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' })
    }

    update()
    {
        if (!this.cursors || !this.player || !this.platforms || !this.scoreText)
        {
            return
        }

        const cursors = this.cursors
        const player = this.player
        const platforms = this.platforms
        const scoreText = this.scoreText

        if (cursors.left?.isDown)
        {
            player.setVelocityX(-160)

            player.anims.play('left', true)
        }
        else if (cursors.right?.isDown)
        {
            player.setVelocityX(160)

            player.anims.play('right', true)
        }
        else
        {
            player.setVelocityX(0)

            player.anims.play('turn')
        }

        if (cursors.up?.isDown && player.body?.touching.down)
        {
            player.setVelocityY(-330)
        }
    }
}