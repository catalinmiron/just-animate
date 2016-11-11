export const rollIn: ja.AnimationMixin = {
    css: [
        {
            opacity: 0,
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)'
        },
        {
            opacity: 1,
            transform: 'none'
        }
    ],

    to: '1s'
    ,
    name: 'rollIn'
};
