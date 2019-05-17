const ppr = require('puppeteer');
const { cyan, green, red } = require('chalk').default;
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };

const modes = {
    headless: () => ppr.launch(),
    remote: () => ppr.connect({ browserURL, defaultViewport })
};

const _getTestcaseResults = browser => async ({ resolver, description, selectors }) => {
    const selPromises = selectors.map(sel => {
        return page.waitForSelector(sel, { timeout: 3000 })
            .then(() => ({ err: false, sel }))
            .catch(err => ({ err, sel }));
    });
    const stateResults = await Promise.all(selPromises);

    return { description, stateResults };
};

module.exports = async ({ browserMode, tests }) => {
    const browser = await modes[browserMode]();
    const testIterators = tests.map(t => {
        const it = t(browser);
        return it.next();
        // return Array.from()
    });

    console.log(await Promise.all(testIterators));

    // const getTestcaseResults = _getTestcaseResults(browser);
    // const suiteResults = Promise.all(tests.map(getTestcaseResults));

    // return suiteResults;
}


// } Promise.all(tests.map(run(modes[browserMode]())))
//     .then(suiteResults => {
//         });
//         formattedResults.forEach(fr => {
//             console.log(fr.txt);
//             fr.errs.length && fr.errs.forEach(err => console.log(err))
//         });
//     })
//     .catch(console.log)


        // const formattedResults = suiteResults.map(sr => {
        //     const header = `${cyan(sr.description)} I should see:`;
        //     const units = sr.stateResults.map(r => {
        //         const txt = `* ${r.sel}`;
        //         return { txt: r.err ? red(txt) : green(txt), err: r.err };
        //     });
        //     const txt = `${header}\n${units.map(xs => xs.txt).join('\n')}`;
        //     const errs = units.map(u => u.err).filter(Boolean);
        //     return { txt, errs };