const ppr = require('puppeteer');
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };

const opt = {
    connect: {
        browserURL,
        defaultViewport,
    },
    preview: {
        defaultViewport,
        headless: false,
        devtools: true,
        args: ['--start-maximized'],
    },
};

/** @param {BrowserMode} mode */
module.exports = mode => {
    /** @type {Promise<Browser>} */
    let browser;

    if (mode === 'remote') {
        browser = ppr.connect(opt.connect);
    } else if (mode === 'preview') {
        browser = ppr.launch(opt.preview);
    } else {
        browser = ppr.launch();
    }

    return browser;
};
