import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js'
import e from 'express'

export default class SimpleJoinRoomScene extends Phaser.Scene {
    private static readonly KEY: string = 'helloworld'

    private client?: Colyseus.Client

    constructor() {
        super(SimpleJoinRoomScene.KEY)
    }

    init(): void {
        this.client = new Colyseus.Client('ws://localhost:3000')
    }

    preload(): void {
    }

    async create() {
        const room = await this.client?.joinOrCreate('helloworld-room')
        console.log('joined room', room?.name)

        room?.onMessage('message', (message: any) => {
            console.log('received message:', message.message)
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            room?.send('message', { message: event.key })
        })
    }
}