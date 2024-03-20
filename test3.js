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

        // Click and hold at X:210, Y:247
        await page.mouse.move(210, 247);
        await page.mouse.down();

        console.log('Mouse clicked and held at X:210, Y:247');

        // Move to X:546, Y:247 without releasing the mouse button
        await page.mouse.move(546, 247);

        console.log('Mouse moved to X:546, Y:247 (holding)...');

        // Keep the page open for further interaction or observation
        await new Promise(() => { });

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
