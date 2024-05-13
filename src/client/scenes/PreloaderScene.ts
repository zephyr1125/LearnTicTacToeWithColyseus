import Phaser from 'phaser'

export default class PreloaderScene extends Phaser.Scene {
    private static readonly KEY: string = 'preloader'

    constructor()
    {
        super(PreloaderScene.KEY)
    }

    preload(): void {
        this.load.image('tiles_floor', 'tiles/floor_extruded.png')
        this.load.image('tiles_wall', 'tiles/wall_extruded.png')
        this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon-01.json')

        this.load.atlas('knight', 'sprites/knight.png', 'sprites/knight.json')
    }

    create(): void {
        this.scene.start('dungeon-crawler')
    }
}