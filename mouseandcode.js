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

        // Capture mouse movements and log coordinates
        await page.evaluate(() => {
            document.addEventListener('mousemove', (event) => {
                console.log(`Mouse coordinates: X = ${event.clientX}, Y = ${event.clientY}`);
            });
        });

        // Keep the page open for further interaction or observation
        console.log('Move the mouse over the page to see the coordinates...');

        // Prevent the script from exiting
        await new Promise(() => { });

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
