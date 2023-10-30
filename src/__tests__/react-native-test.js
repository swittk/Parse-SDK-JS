/* global WebSocket */
jest.dontMock('../CoreManager');
jest.dontMock('../CryptoController');
jest.dontMock('../decode');
jest.dontMock('../encode');
jest.dontMock('../EventEmitter');
jest.dontMock('../LiveQueryClient');
jest.dontMock('../LocalDatastore');
jest.dontMock('../ParseObject');
jest.dontMock('../Storage');

jest.mock(
  'react-native/Libraries/vendor/emitter/EventEmitter',
  () => {
    return {
      default: {
        prototype: {
          addListener: new (require('events').EventEmitter)(),
        },
      },
    };
  },
  { virtual: true }
);

const mockEmitter = require('react-native/Libraries/vendor/emitter/EventEmitter').default;
const CoreManager = require('../CoreManager').default;

describe('React Native', () => {
  beforeEach(() => {
    process.env.PARSE_BUILD = 'react-native';
  });

  afterEach(() => {
    process.env.PARSE_BUILD = 'node';
  });

  it('load EventEmitter', () => {
    const eventEmitter = require('../EventEmitter').default;
    expect(eventEmitter).toEqual(mockEmitter);
  });

  it('load CryptoController', () => {
    const CryptoJS = require('react-native-crypto-js');
    jest.spyOn(CryptoJS.AES, 'encrypt').mockImplementation(() => {
      return {
        toString: () => 'World',
      };
    });
    const CryptoController = require('../CryptoController').default;
    const phrase = CryptoController.encrypt({}, 'salt');
    expect(phrase).toBe('World');
    expect(CryptoJS.AES.encrypt).toHaveBeenCalled();
  });

  it('load LocalDatastoreController', () => {
    const LocalDatastoreController = require('../LocalDatastoreController.react-native').default;
    require('../LocalDatastore');
    const LDC = CoreManager.getLocalDatastoreController();
    expect(LocalDatastoreController).toEqual(LDC);
  });

  it('load StorageController', () => {
    const StorageController = require('../StorageController.react-native').default;
    jest.spyOn(StorageController, 'setItemAsync');
    const storage = require('../Storage').default;
    storage.setItemAsync('key', 'value');
    expect(StorageController.setItemAsync).toHaveBeenCalledTimes(1);
  });

  it('load WebSocketController', () => {
    jest.mock('../EventEmitter', () => {
      return require('events').EventEmitter;
    });
    const socket = WebSocket;
    require('../LiveQueryClient');
    const websocket = CoreManager.getWebSocketController();
    expect(websocket).toEqual(socket);
  });
});
