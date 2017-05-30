export * from './intern';

export const environments = [
  {
    browserName: 'Safari',
    version: '10.0',
    platform: 'iOS',
    platformName: 'iOS',
    deviceName: 'iPhone Simulator',
    automationName: 'XCUITest'
  },
  {
    browserName: 'Chrome',
    version: '6.0',
    platform: 'Android',
    platformName: 'Android',
    deviceName: 'j7xelte'
  }
];

export const tunnel = 'NullTunnel';

export const tunnelOptions = {
  hostname: '0.0.0.0',
  port: 4723
};

export const proxyUrl = 'http://192.168.1.180:9000/';

export const reporters = ['Runner'];
