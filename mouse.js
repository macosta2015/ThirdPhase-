const puppeteer = require('puppeteer');

(async () => {
    try {
        // Launch the browser with custom viewport size
        const browser = await puppeteer.launch({
            defaultViewport: { width: 800, height: 800 }, // Initial size of the browser window
            headless: false, // Launch Chrome with visible browser window
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1' // Path to your user data directory
        });

        // Open a new page
        const page = await browser.newPage();

        // Navigate to Google
        await page.goto('https://google.com', { waitUntil: 'networkidle0' });

        // Press and hold at X:550, Y:109
        await page.mouse.move(550, 109);
        await page.mouse.down();

        console.log('Mouse pressed at X:550, Y:109');

        // Continuous move to X:222, Y:106 without releasing the mouse
        let interval = setInterval(async () => {
            await page.mouse.move(222, 106);
        }, 50); // Adjust the interval as needed

        console.log('Mouse moved to X:222, Y:106 (holding)...');

        // Keep the page open for further interaction or observation
        await new Promise(() => { });

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();


