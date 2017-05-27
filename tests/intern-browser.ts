export * from './intern';

export const environments = [
    { browserName: 'chrome', version: '45', platform: 'VISTA' }
    // {
    //     browserName: 'Safari',
    //     appiumVersion: '1.6.3',
    //     recordVideo: false,
    //     recordScreenshots: false,
    //     deviceName: 'iPhone Simulator',
    //     deviceOrientation: 'portrait',
    //     platformVersion: ['9.3', '10.2'],
    //     platformName: 'iOS'
    // },
    // {
    //     browserName: 'Browser',
    //     appiumVersion: '1.6.3',
    //     recordVideo: false,
    //     recordScreenshots: false,
    //     deviceName: 'Android Emulator',
    //     deviceOrientation: 'portrait',
    //     platformVersion: ['5.1', '6.0'],
    //     platformName: 'Android'
    // },
    // {
    //     browserName: 'chrome',
    //     version: ['56', '57'],
    //     platform: ['Windows 10'],
    //     recordVideo: false,
    //     recordScreenshots: false
    // },
    // {
    //     browserName: 'firefox',
    //     version: ['51', '52'],
    //     platform: ['Windows 10'],
    //     recordVideo: false,
    //     recordScreenshots: false
    // },
    // {
    //     browserName: 'MicrosoftEdge',
    //     version: ['13', '14'],
    //     platform: 'Windows 10',
    //     recordVideo: false,
    //     recordScreenshots: false
    // },
    // {
    //     browserName: 'internet explorer',
    //     version: ['10', '11'],
    //     platform: 'Windows 7',
    //     recordVideo: false,
    //     recordScreenshots: false
    // },
    // {
    //     browserName: 'safari',
    //     version: ['9', '10'],
    //     platform: 'OS X 10.11',
    //     recordVideo: false,
    //     recordScreenshots: false
    // }
];

const { TESTINGBOT_KEY, TESTINGBOT_SECRET } = process.env;

export const webdriver = {
    host: 'http://hub.testingbot.com/wd/hub',
    username: TESTINGBOT_KEY,
    accessKey: TESTINGBOT_SECRET
};

export const tunnelOptions = {
    verbose: true,
    apiKey: TESTINGBOT_KEY,
    apiSecret: TESTINGBOT_SECRET
};

export const proxyPort = 9000;

export const proxyUrl = 'http://localhost:9000/';

export const useSauceConnect = false;

export const tunnel = 'TestingBotTunnel';

export const maxConcurrency = 5;

export const reporters = ['Runner'];
