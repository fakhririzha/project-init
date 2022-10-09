import {
    createCipheriv,
    createDecipheriv,
    createHash as _createHash,
} from 'crypto';
import appConfig from '../../app.config';
const {
    encryption: { key, algorithm },
} = appConfig;

const iv = key.substr(0, 16);

const encrypt = (text) => {
    const cipher = createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

const decrypt = (text) => {
    const decipher = createDecipheriv(algorithm, key, iv);
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

const createHash = (text) => {
    const hash = _createHash('md5');
    return hash.update(text).digest('hex');
};

export default {
    encrypt,
    decrypt,
    createHash,
};
