import { sceneEvents } from "../events/EventsCenter"

export default class GameUI extends Phaser.Scene
{
    private _hearts?: Phaser.GameObjects.Group

    constructor()
    {
        super('game-ui')
    }

    create(): void
    {
        this._hearts = this.add.group({
            classType: Phaser.GameObjects.Image,
            createCallback: (go) => {
                const heart = go as Phaser.GameObjects.Image
                heart.setScale(2)
            }
        })
        
        this._hearts.createMultiple({
            key: 'ui-heart-full',
            setXY: {
                x: 10,
                y: 10,
                stepX: 16
            },
            quantity: 3
        })

        sceneEvents.on('player-health-changed', this.handlePlayerHealthChanged, this)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off('player-health-changed', this.handlePlayerHealthChanged, this)
        })
    }

    private handlePlayerHealthChanged(health: number): void
    {
        if (!this._hearts)
        {
            return
        }

        this._hearts.children.each((heart, idx) => {
            const img = heart as Phaser.GameObjects.Image
            if (idx < health)
            {
                img.setTexture('ui-heart-full')
            }
            else
            {
                img.setTexture('ui-heart-empty')
            }
        })
    }
}