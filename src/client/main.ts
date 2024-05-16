import 'regenerator-runtime/runtime'
import Phaser from 'phaser'

import LocalMultiplayerMatterGameScene from './scenes/LocalMultiplayerMatterGameScene'
import SinglePlayerArcadeGameScene from './scenes/SinglePlayerArcadeGameScene'
import MatterTestScene from './scenes/MatterTestScene'
import TextOverlay from './ui/overlays/TextOverlay'
import BootstrapScene from './scenes/BoostrapScene'
import GameScene from './scenes/GameScene'
import MenuScene from './scenes/MenuScene'
import SimpleJoinRoomScene from './scenes/SimpleJoinRoomScene'
import DungeonCrawlerScene from './scenes/DungeonCrawlerScene'
import PreloaderScene from './scenes/PreloaderScene'
import GameUI from './scenes/GameUI'
import './characters/Knight'
import TTTGameScene from './scenes/TTTGameScene'

export const DEBUG_MODE: boolean = true

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 240,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: DEBUG_MODE
        }
    },
    scene: [
        // SimpleJoinRoomScene,  //一个简单的联网进入房间
        // PreloaderScene,      //学习DungeonCrawler
        // DungeonCrawlerScene, //学习DungeonCrawler
        // GameUI,              //学习DungeonCrawler
        BootstrapScene,         //学习在线TicTocToe
        TTTGameScene,           //学习在线TicTocToe
        // MenuScene,
        // GameScene,
        // SinglePlayerArcadeGameScene,
        // LocalMultiplayerMatterGameScene,
        // TextOverlay,
        // MatterTestScene
    ],
    scale: {
        zoom: 4
    }
}

export default new Phaser.Game(config)
