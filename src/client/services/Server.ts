import { Client, Room } from 'colyseus.js'
import { Schema } from '@colyseus/schema'
import '../../shared/constants'
import * as constants from '../../shared/constants'
import ITicTacToeState from '../../shared/types/ITicTacToeState'
import { Message } from '../../shared/types/messages'

export default class Server{
    private client: Client
    private events: Phaser.Events.EventEmitter
    private room?: Room<ITicTacToeState & Schema>

    constructor(){
        this.client = new Client('ws://localhost:3000')
        this.events = new Phaser.Events.EventEmitter()
    }

    public getClient(): Client{
        return this.client
    }

    async join(){
        this.room = await this.client?.joinOrCreate<ITicTacToeState & Schema>(
            constants.TicTacToeRomeName)
        console.log('joined room', this.room);
        this.room.onStateChange.once((state) => {
            console.log('initial room state:', state)
            this.events.emit(constants.EventRoomStateChange, state)
        })
        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                console.log('board changed!', change.value);
                if(change.field === 'board'){
                    this.events.emit(constants.EventBoardUpdate, change.value)
                }
            })
        }
    }

    makeSelection(idx: number){
        
        this.room?.send(Message.PLAYER_SELECTION, idx)
    }

    //注册状态改变事件
    registerStateChanged(callback: (state: ITicTacToeState) => void, context?: any){
        this.events.once(constants.EventRoomStateChange, callback, context)
    }

    //注册棋盘改变事件
    registerBoardUpdate(callback: (board: number[]) => void, context?: any){
        this.events.on(constants.EventBoardUpdate, callback, context)
    }
}