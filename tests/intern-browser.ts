export * from './intern';

function env(env: Object) {
    return {
        ...env,
        ...{
            screenshot: true,
            screenrecorder: true,
            public: true
        }
    };
}

export const capabilities = {
    launchTimeout: 600000,
    newCommandTimeout: 600,
    'idle-timeout': 600,
    idletimeout: 600,
    fixSessionCapabilities: false
};

export const environments = [
    // env({
    //     browserName: 'chrome',
    //     version: [58, 57],
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
    env({
        browserName: 'safari',
        version: '10.3',
        platform: 'SIERRA',
        deviceName: 'iPhone 6s Plus',
        platformName: 'iOS',
        automationName: 'XCUITest',
        launchTimeout: 600000,
        newCommandTimeout: 600,
        'idle-timeout': 600,
        idletimeout: 600
    })
    // env({
    //     browserName: 'safari',
    //     version: '9.3',
    //     platform: 'CAPITAN',
    //     deviceName: 'iPhone 6s Plus',
    //     platformName: 'iOS',
    //     automationName: 'XCUITest',
    //     idletimeout: 300,
    //     'idle-timeout': 300
    // }),
    // env({
    //     browserName: 'Chrome',
    //     version: '7.1',
    //     platform: 'ANDROID',
    //     deviceName: 'Nexus 7',
    //     platformName: 'Android',
    //     idletimeout: 300,
    //     'idle-timeout': 300
    // }),
    // env({
    //     browserName: 'browser',
    //     version: '6.0',
    //     platform: 'ANDROID',
    //     deviceName: 'Galaxy S6',
    //     platformName: 'Android',
    //     idletimeout: 300,
    //     'idle-timeout': 300
    // })
];

export const defaultTimeout = 600000;

export const tunnel = 'TestingBotTunnel';

export const maxConcurrency = 5;

export const reporters = ['Runner'];
