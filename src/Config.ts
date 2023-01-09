import {Config} from 'git-log-nodejs';
import {getConfig} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {END_OF_LINE} from './Defaults';

/**
 * [key1.key2.key3 = value] -> {key1: {key2: {key3: value}}}
 * @param configList
 */
export const convertConfigToJSON = (configList: string[]): Config => {
  const config: Config = {};

  configList.forEach((item) => {
    const [keys, value] = item.split('=');
    const splitKey = keys.split('.');
    const length = splitKey.length;

    if (!Object.prototype.hasOwnProperty.call(config, splitKey[0])) {
      config[splitKey[0]] = {};
    }

    let tmp = config[splitKey[0]] as Config;

    for (let i = 1; i < length; i++) {
      if (!Object.prototype.hasOwnProperty.call(tmp, splitKey[i])) {
        if (i === length - 1) {
          tmp[splitKey[i]] = value;
        } else {
          tmp[splitKey[i]] = {};
        }
      }

      tmp = tmp[splitKey[i]] as {[key:string]: string};
    }
  });

  return config;
}

export const configs = async (): Promise<Config> => {
  try {
    const result = await getConfig();
    const configList = result.split(END_OF_LINE);

    return convertConfigToJSON(configList);
  } catch (err) {
    throw new Error(makeErrorMessage('configs in Config.ts', err.message));
  }
};
