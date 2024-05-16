import { Client } from 'colyseus.js'
import { TicTacToeRomeName } from '../../shared/constants'

export default class Server{
    private client: Client

    constructor(){
        this.client = new Client('ws://localhost:3000')
    }

    public getClient(): Client{
        return this.client
    }

    async join(){
        const room = await this.client?.joinOrCreate(TicTacToeRomeName)
        console.log('joined room', room?.name);        
    }
}