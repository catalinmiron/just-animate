export const fadeOutRight: ja.AnimationMixin = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(100%, 0, 0)'
        }
    ],

    to: '1s'
    ,
    name: 'fadeOutRight'
};
