import { Schema, ArraySchema, type } from "@colyseus/schema";
import ITicTacToeState from "../../shared/types/ITicTacToeState";

export default class TicTacToeRoomState extends Schema implements ITicTacToeState{

    @type('string')
    name = 'ttt-state'

    @type('string')
    currentTurn!: string

    @type(['number'])
    board!: number[]

    @type('string')
    winner!: string

    @type('string')
    playerX!: string

    @type('string')
    playerO!: string

    @type( 'number')
    activePlayers = 0

    constructor(){
        super()
        this.currentTurn = ''
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.winner = ''
        this.playerX = ''
        this.playerO = ''
    }
}