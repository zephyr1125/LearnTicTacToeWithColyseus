export enum Cell{
    EMPTY,
    X,
    O
}

export interface ITicTacToeState{
    board: number[]
    activePlayers: number
}

export default ITicTacToeState