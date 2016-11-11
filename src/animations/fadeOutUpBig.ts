export const fadeOutUpBig: ja.AnimationMixin = {
    css: [
        {
            opacity: 1,
            transform: 'none'
        },
        {
            opacity: 0,
            transform: 'translate3d(0, -2000px, 0)'
        }
    ],

    to: 1300
    ,
    name: 'fadeOutUpBig'
};
