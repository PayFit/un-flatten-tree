export * from './intern';

export const environments = [
  {
    browserName: 'Safari',
    version: '10',
    platform: 'iOS',
    platformName: 'iOS',
    deviceName: 'iPhone Simulator',
    automationName: 'XCUITest'
  }
];

export const tunnel = 'NullTunnel';

export const tunnelOptions = {
  hostname: '0.0.0.0',
  port: 4723
};

export const proxyUrl = 'http://192.168.1.180:9000/';

export const reporters = ['Runner'];
