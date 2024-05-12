import Phaser from 'phaser'

export default class PreloaderScene extends Phaser.Scene {
    private static readonly KEY: string = 'preloader'

    constructor()
    {
        super(PreloaderScene.KEY)
    }

    preload(): void {
        this.load.image('tiles_floor', 'tiles/atlas_floor-16x16.png')
        this.load.image('tiles_wall', 'tiles/atlas_walls_low-16x16.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')

        this.load.atlas('knight', 'sprites/knight.png', 'sprites/knight.json')
    }

    create(): void {
        this.scene.start('dungeon-crawler')
    }
}