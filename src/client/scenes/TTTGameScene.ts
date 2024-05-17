import ITicTacToeState, { Cell } from "../../shared/types/ITicTacToeState";
import Server from "../services/Server";

export default class TTTGameScene extends Phaser.Scene {
    public static readonly KEY: string = 'TTTGameScene'
    private server?: Server
    private cells: { display: Phaser.GameObjects.Rectangle, value: Cell}[] = []

    constructor(){
        super(TTTGameScene.KEY)
    }

    async create(data: {server: Server}){
        console.log('TTTGameScene created');
        const {server} = data;
        this.server = server
        if(!this.server){
            throw new Error('Server is not available')
        }

        await this.server.join();
        this.server.registerStateChanged(this.createBoard, this)
        
    }

    private createBoard(state: ITicTacToeState){
        const {width, height} = this.scale
        const size = 64
        const gap = 4
        const startX = width/2 - size - gap
        const startY = height/2 - size - gap
        state.board.forEach((cell, idx) => {
            const x = idx % 3
            const y = Math.floor(idx / 3)
            const cellRec = this.add.rectangle(
                startX + x *(size+gap),
                startY + y * (size+gap),
                size, size, 0x6666ff)
                .setInteractive()
                .on('pointerdown', () => {
                    console.log('clicked', idx)
                    this.server?.makeSelection(idx)
                })
            this.cells.push({display:cellRec, value: Cell.EMPTY})
        })

        this.server?.registerBoardUpdate(this.updateBoard, this)
    }

    private updateBoard(board: Cell[]){
        console.log('updateBoard', board)
        board.forEach((cell, idx) => {
            const cellRec = this.cells[idx]
            if(cellRec.value != cell){
                cellRec.value = cell
                //draw X or O
                if(cell == Cell.X){
                    this.add.text(cellRec.display.x, cellRec.display.y, 'X')
                    .setFontSize(48)
                    .setOrigin(0.5)
                    .setColor('#000')
                }else if(cell == Cell.O){
                    this.add.text(cellRec.display.x, cellRec.display.y, 'O')
                    .setFontSize(48)
                    .setOrigin(0.5)
                    .setColor('#000')
                }
            }
        })
    }
}