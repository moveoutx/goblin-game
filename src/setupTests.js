// Mock для таймеров
jest.useFakeTimers();

// Mock для HTMLMediaElement
Object.defineProperty(global, 'HTMLMediaElement', {
    writable: true,
    value: {
        prototype: {
            pause: jest.fn(),
            play: jest.fn(),
        },
    },
});

// Mock для requestAnimationFrame
global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0);
};
