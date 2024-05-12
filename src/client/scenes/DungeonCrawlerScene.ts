import Phaser from 'phaser'

export default class DungeonCrawlerScene extends Phaser.Scene {
    private static readonly KEY: string = 'dungeon-crawler'

    constructor()
    {
        super(DungeonCrawlerScene.KEY)
    }
    

    create(): void {
        const map = this.make.tilemap({ key: 'dungeon' })
        const tilesetFloor = map.addTilesetImage('dungeon_floor', 'tiles_floor')
        const tilesetWall = map.addTilesetImage('atlas_walls_low-16x16', 'tiles_wall')

        const floorLayer = map.createLayer('floor', tilesetFloor)
        const wallLayer = map.createLayer('walls', tilesetWall)

        wallLayer.setCollisionByProperty({ collides: true })

        const debugGraphics = this.add.graphics().setAlpha(0.75)
        wallLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        })
    }
}