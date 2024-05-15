const createKnightAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'knight_idle',
        frames: anims.generateFrameNames('knight',
            { prefix: 'knight_m_idle_anim_f', suffix: '.png', start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    anims.create({
        key: 'knight_run',
        frames: anims.generateFrameNames('knight',
            { prefix: 'knight_m_run_anim_f', suffix: '.png', start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
}

const createBigZombieAnim = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'big_zombie_idle',
        frames: anims.generateFrameNames('big_zombie', {
            start: 0,
            end: 3,
            prefix: 'big_zombie_idle_anim_f',
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    })
    anims.create({
        key: 'big_zombie_run',
        frames: anims.generateFrameNames('big_zombie', {
            start: 0,
            end: 3,
            prefix: 'big_zombie_run_anim_f',
            suffix: '.png',
        }),
        frameRate: 10,
        repeat: -1
    })
}

export { createKnightAnims, createBigZombieAnim }