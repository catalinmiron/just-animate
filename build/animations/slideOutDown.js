"use strict";
exports.slideOutDown = {
    'keyframes': [
        {
            'transform': 'translate3d(0, 0, 0)',
            'visibility': 'visible'
        },
        {
            'visibility': 'hidden',
            'transform': 'translate3d(0, 100%, 0)'
        }
    ],
    'timings': {
        'duration': 1000
    },
    'name': 'slideOutDown'
};
