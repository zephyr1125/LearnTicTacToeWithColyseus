import { Dispatcher } from '@colyseus/command'
import { Client, Room } from 'colyseus'

import { Message, IPlayerMessage, IPlayerControlsMessage } from '../../shared/types/messages'
import ControlPlayerCommand from './commands/ControlPlayerCommand'
import StartSignalCommand from './commands/StartSignalCommand'
import { GamePhase } from '../../shared/types/commons'
import GameState from '../schema/GameState'
import GameWorld from './GameWorld'
import HelloWorldRoomState from '../schema/HelloWorldRoomState'

export class HelloWorldRoom extends Room {
    private dispatcher = new Dispatcher(this)

    private gameWorld!: GameWorld

    onCreate() {
        this.setState(new HelloWorldRoomState())

    }

    async onJoin(client: Client, options: any, auth: any) {
        console.log(`Player with sessionId ${client.sessionId} joined.`)
    }

    onLeave(client: Client, consented: boolean) {
        console.log(`Player with sessionId ${client.sessionId} left.`)
    }

    onDispose() {
        this.dispatcher.stop()
    }
}