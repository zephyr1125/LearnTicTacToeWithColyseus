import 'regenerator-runtime/runtime'
import Phaser from 'phaser'

import LocalMultiplayerMatterGameScene from './scenes/LocalMultiplayerMatterGameScene'
import SinglePlayerArcadeGameScene from './scenes/SinglePlayerArcadeGameScene'
import MatterTestScene from './scenes/MatterTestScene'
import TextOverlay from './ui/overlays/TextOverlay'
import BootstrapScene from './scenes/BoostrapScene'
import GameScene from './scenes/GameScene'
import MenuScene from './scenes/MenuScene'
import SimpleJoinRoomScene from './scenes/HelloWorldScene'
import DungeonCrawlerScene from './scenes/DungeonCrawlerScene'
import PreloaderScene from './scenes/PreloaderScene'
import GameUI from './scenes/GameUI'
import './characters/Knight'

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
        PreloaderScene,
        DungeonCrawlerScene,
        GameUI,
        // SimpleJoinRoomScene,
        // BootstrapScene,
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
