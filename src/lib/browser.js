import { UAParser } from 'ua-parser-js';
const inAppBrowserNames = [
    'Facebook',
    'Instagram',
    'Line',
    'Messenger',
    'Puffin',
    'Twitter',
    'WeChat',
];
const parser = new UAParser();
const browser = parser.getBrowser();
export const isInAppBrowser = () => {
    var _a;
    return inAppBrowserNames.indexOf((_a = browser.name) !== null && _a !== void 0 ? _a : '') > -1;
};
