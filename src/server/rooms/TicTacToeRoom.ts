import { Client, Room } from "colyseus"
import { Schema } from "@colyseus/schema"
import TicTacToeRoomState from "../schema/TicTacToeRoomState"
import { Message } from "../../shared/types/messages"
import { Dispatcher } from "@colyseus/command"
import PlayerSelectionCommand from "../commands/PlayerSelectionCommand"

export default class TicTacToeRoom extends Room<TicTacToeRoomState & Schema> {

    private dispatcher = new Dispatcher(this)

    onCreate(options: any) {
        console.log('TicTacToeRoom created')
        this.setState(new TicTacToeRoomState())
        this.onMessage(Message.PLAYER_SELECTION, (client, message) => {
            console.log('received', Message.PLAYER_SELECTION, message)
            this.dispatcher.dispatch(new PlayerSelectionCommand(), { client, idx: message })
        })
    }

    onJoin(client: Client, options: any, auth: any) {
        console.log('TicTacToeRoom joined')
    }

    onLeave(client: Client, consented: any) {
        console.log('TicTacToeRoom left')
    }

    onDispose() {
        console.log('TicTacToeRoom disposed')
    }
}