import Phaser from 'phaser'

import MenuScene from '../../client/scenes/MenuScene'
import Assets from '../assets/Assets'
import TTTGameScene from './TTTGameScene'
import Server from '../services/Server'

export default class BoostrapScene extends Phaser.Scene {
    private static readonly KEY: string = 'bootstrap'

    private assets: Assets

    private server?: Server

    constructor() {
        super(BoostrapScene.KEY)
        this.assets = new Assets(this)
    }

    init(): void {
        this.server = new Server()
    }

    preload(): void {
        this.assets.load()
    }

    create(): void {
        this.scene.launch(TTTGameScene.KEY, {
            server: this.server
        })
    }
}