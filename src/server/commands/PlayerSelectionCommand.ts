import { Command } from "@colyseus/command"
import { Client, Room } from "colyseus";
import { Cell } from "../../shared/types/ITicTacToeState";

type Payload = {
    client: Client
    idx: number
}

export default class PlayerSelectionCommand extends Command{
    execute(payload: Payload){
        console.log('PlayerSelectionCommand');
        
        const { client, idx } = payload

        const clientIndex = this.room.clients.findIndex(
            c => c.sessionId === client.sessionId)
        const cellValue = clientIndex === 0 ? Cell.X : Cell.O
        console.log('cellValue', cellValue, 'idx', idx);
        //由于 board 是一个数组，而数组在 JavaScript 中是引用类型。
        //当你修改数组的一个元素时，数组本身的引用并没有改变
        //因此每次修改 board 时，创建一个新的数组以触发 state 的更新
        let newBoard = [...this.room.state.board];
        newBoard[idx] = cellValue;
        this.room.state.board = newBoard;
    }
}