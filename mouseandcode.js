const puppeteer = require('puppeteer');
require('dotenv').config(); // Load environment variables from .env file

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            defaultViewport: { width: 800, height: 800 }, // Initial size of the browser window
            headless: false, // Launch Chrome with visible browser window
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1' // Path to your user data directory
        });

        console.log('Opening new page...');
        const newPage = await browser.newPage();

        console.log('Navigating to the URL...');
        await newPage.goto('https://cad.onshape.com/documents?resourceType=resourcecompanyowner&nodeId=65efc5e06e5bec02f57742fe', { waitUntil: 'networkidle0', timeout: 0 });

        console.log('Filling out form fields...');
        await newPage.type('input[name="email"].form-control', process.env.EMAIL);
        await newPage.type('input[name="password"].form-control', process.env.PASSWORD);
        console.log(await newPage.$eval('input[name="email"].form-control', input => input.getBoundingClientRect())); // Output x and y coordinates
        console.log(await newPage.$eval('input[name="password"].form-control', input => input.getBoundingClientRect())); // Output x and y coordinates

        console.log('Clicking on the submit button...');
        await newPage.click('button.btn.btn-primary.os-signin-button');
        console.log(await newPage.$eval('button.btn.btn-primary.os-signin-button', button => button.getBoundingClientRect())); // Output x and y coordinates

        console.log('Waiting for 10 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 10000));

        console.log('Scrolling to the element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                console.log(thirdButton.getBoundingClientRect()); // Output x and y coordinates
            } else {
                console.error('Third button not found.');
            }
        });

        console.log('Waiting for 2 seconds after scrolling...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Clicking on the third element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.click();
            } else {
                console.error('Third button not found.');
            }
        });

        console.log('Waiting for 2 seconds after selecting the "Created By Me"...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Clicking on the "Scale Sketch Example - Copy" element...');
        await newPage.evaluate(() => {
            const documentNameElement = document.querySelector('span[aria-label="Document name: Scale Sketch Example - Copy"][ng-bind-html="document.resultHighlight"]');
            if (documentNameElement) {
                documentNameElement.click();
            } else {
                console.error('Element with text "Scale Sketch Example - Copy" not found.');
            }
        });

        console.log('Waiting for 10 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Scrolling to the element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        console.log('Waiting for 2 seconds after scrolling...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Clicking on the fifth element...');
        await newPage.evaluate(() => {
            const fifthButton = document.querySelectorAll('.os-list-item-name')[5];
            if (fifthButton) {
                fifthButton.click();
            } else {
                console.error('Fifth button not found.');
            }
        });

        console.log('Right Click...');
        await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });

        console.log('Waiting for 10 seconds after Right Click...');
        await new Promise(resolve => setTimeout(resolve, 10000));

        console.log('Scrolling to the bottom of the page...');
        await newPage.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        console.log('Waiting for the "Edit" options to appear...');
        await newPage.waitForSelector('.context-menu-item-span', { visible: true });

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Getting all "Edit" options...');
        const editOptions = await newPage.evaluate(() => {
            const menuItems = document.querySelectorAll('.context-menu-item-span');
            return Array.from(menuItems).map(item => item.textContent.trim());
        });

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Edit options:', editOptions);

        console.log('Clicking on the second "Edit" option...');
        const desiredEditOption = 'Edit…'; // Text of the desired option
        const desiredEditOptionIndex = editOptions.indexOf(desiredEditOption);
        if (desiredEditOptionIndex !== -1) {
            const editOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredEditOptionIndex);

            if (editOptionElement) {
                await editOptionElement.click();
            } else {
                console.error(`${desiredEditOption} option element not found.`);
            }
        } else {
            console.error(`${desiredEditOption} option not found.`);
        }

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Clicking on the "Search tools" button...');
        await newPage.click('button.command-search-trigger');

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 50000));

        console.log('Typing "transform" into the search input field...');
        await newPage.type('.os-search-box-input', 'transform');

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 50000));

        console.log('Pressing "Enter" to perform the search...');
        await newPage.keyboard.press('Enter');

        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        //The following is broken
        console.log('Waiting for the canvas element to be clickable...');
        await newPage.waitForSelector('#canvas');

        console.log('Clicking on the canvas element...');
        await newPage.click('#canvas');


        console.log('Waiting for 5 seconds after navigation...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Taking a screenshot...');
        await newPage.screenshot({ path: 'form_submission.png' });

        // Capture mouse movements and log coordinates
        await newPage.evaluate(() => {
            document.addEventListener('mousemove', (event) => {
                console.log(`Mouse coordinates: X = ${event.clientX}, Y = ${event.clientY}`);
            });
        });

        // Keep the page open for further interaction or observation
        console.log('Move the mouse over the page to see the coordinates...');

        // Prevent the script from exiting
        await new Promise(() => { });

        console.log('Script completed successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

