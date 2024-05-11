import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'

export default class HelloWorldScene extends Phaser.Scene {
    private static readonly KEY: string = 'helloworld'

    private client?: Colyseus.Client

    constructor() {
        super(HelloWorldScene.KEY)
    }

    init(): void {
        this.client = new Colyseus.Client('ws://localhost:3000')
    }

    preload(): void {
    }

    async create() {
        const room = await this.client?.joinOrCreate('helloworld-room')
        console.log('joined room', room?.name)
    }
}