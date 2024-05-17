import { IControls } from './commons'

export enum Message {
    START_SIGNAL,
    PLAYER_INDEX,
    PLAYER_CONTROLS,
    PLAYER_SELECTION,   //TicTacToe里玩家的选择
}

export interface IPlayerMessage {
    playerIdx: number
}

export interface IPlayerControlsMessage extends IPlayerMessage {
    controls: IControls
}
