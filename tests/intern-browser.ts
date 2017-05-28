export * from './intern';

function env(env: Object) {
    return {
        ...env,
        ...{
            screenshot: false,
            screenrecorder: false,
            public: true
        }
    };
}

export const environments = [
    // env({
    //     browserName: 'chrome',
    //     version: ['58', '57'],
    //     platform: 'WIN10'
    // }),
    // env({
    //     browserName: 'firefox',
    //     version: ['53', '52'],
    //     platform: 'WIN10'
    // }),
    // env({
    //     browserName: 'microsoftedge',
    //     version: ['14', '13'],
    //     platform: 'WIN10'
    // }),
    // env({
    //     browserName: 'opera',
    //     version: ['44', '43'],
    //     platform: 'WIN10'
    // }),
    // env({
    //     browserName: 'internet explorer',
    //     version: ['11', '10'],
    //     platform: 'WIN8'
    // }),
    // env({
    //     browserName: 'safari',
    //     version: '10',
    //     platform: 'SIERRA'
    // }),
    // env({
    //     browserName: 'safari',
    //     version: '9',
    //     platform: 'CAPITAN'
    // }),
    // env({
    //     browserName: 'safari',
    //     version: '10.3',
    //     platform: 'SIERRA',
    //     deviceName: 'iPhone 6s Plus',
    //     platformName: 'iOS'
    // }),
    // env({
    //     browserName: 'safari',
    //     version: '9.3',
    //     platform: 'CAPITAN',
    //     deviceName: 'iPhone 6s Plus',
    //     platformName: 'iOS'
    // }),
    // env({
    //     browserName: 'Chrome',
    //     version: '7.1',
    //     platform: 'ANDROID',
    //     deviceName: 'Nexus 7',
    //     platformName: 'Android'
    // }),
    env({
        browserName: 'browser',
        version: '6.0',
        platform: 'ANDROID',
        deviceName: 'Galaxy S6',
        platformName: 'Android'
    })
];

export const tunnel = 'TestingBotTunnel';

export const maxConcurrency = 5;

export const reporters = ['Runner'];
