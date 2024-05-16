import { Room } from "colyseus"

export default class TicTacToeRoom extends Room {
    onCreate(options: any) {
        console.log('TicTacToeRoom created')
    }

    onJoin(client: any, options: any, auth: any) {
        console.log('TicTacToeRoom joined')
    }

    onLeave(client: any, consented: any) {
        console.log('TicTacToeRoom left')
    }

    onDispose() {
        console.log('TicTacToeRoom disposed')
    }
}