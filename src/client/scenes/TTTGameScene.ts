import Server from "../services/Server";

export default class TTTGameScene extends Phaser.Scene {
    public static readonly KEY: string = 'TTTGameScene'

    constructor(){
        super(TTTGameScene.KEY)
    }

    create(data: {server: Server}){
        console.log('TTTGameScene created');
        const {server} = data;
        console.log('server', server);
        server.join();
    }
}