chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});
// chrome.action.onClicked.addListener((tab) => {
//     // Execute the content script in the active tab
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['content.js']
//     });
// });
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.targetScriptContent) {
//         const targetScriptContent = request.targetScriptContent;
//         // Prepare your script execution
//         const scriptContent = `
//             ${targetScriptContent}
//             document.cookie = '__arcsjs=' + encodeURIComponent(hash) + '; Max-Age=100; Path=/; Domain=' + encodeURIComponent(window.location.hostname) + '';
//             location.reload();
//         `;

//         // You may want to evaluate this script in the context of a different environment,
//         // or find another way to execute it that complies with CSP
//         console.log("Script content prepared:", scriptContent);
//         // Here you could evaluate the script in a context that allows it


//         // Create a Blob from the script content
//         const blob = new Blob([scriptContent], { type: 'application/javascript' });
//         const blobUrl = URL.createObjectURL(blob);

//         // Create a new script element and set its src to the Blob URL
//         const newScript = document.createElement('script');
//         newScript.src = blobUrl;
//         newScript.onload = function () {
//             // Clean up the Blob URL after the script is loaded
//             URL.revokeObjectURL(blobUrl);
//         };
//         console.log(newScript)
//         document.body.appendChild(newScript);
//     }
// });





// function injectScript() {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         console.log(tabs)
//         if (tabs.length > 0) {
//             const activeTab = tabs[0];
//             const activeTabId = activeTab.id;
//             const activeTabUrl = activeTab.url;
//             console.log(activeTabUrl)
//             // Only inject the script if the URL is valid and not a chrome:// URL
//             if (activeTabUrl && !activeTabUrl.startsWith('chrome://')) {
//                 console.log('man')
//                 // Inject the script using the scripting API
//                 chrome.scripting.executeScript({
//                     target: { tabId: activeTabId },
//                     func: executeAndSetCookie,  // Function to execute in the tab
//                     args: [activeTabUrl],  // Pass the URL as an argument for cookie domain setting
//                 });
//             } else {
//                 console.error("Cannot inject script into chrome:// URLs or other restricted URLs.");
//             }
//         }
//     });
// }

// // This function will be injected and run within the page's context
// function executeAndSetCookie(currentUrl) {
//     const scripts = document.querySelectorAll('script[type="text/javascript"]');
//     let targetScript = null;

//     // Regular expression to match "var" followed by any content until the next line
//     const regex = /(var.+\n)/;

//     scripts.forEach(script => {
//         if (regex.test(script.textContent)) {
//             targetScript = script;
//         }
//     });
//     if (targetScript) {
//         // Create a new <script> element to run the target script immediately
//         const newScript = document.createElement('script');
//         newScript.type = 'text/javascript';

//         // Generate the hash function to be executed
//         const func = "(function() {return hash})();";
//         const scriptContent = `
//             ${targetScript.textContent}
//             var hash = E(E(_0x2d84('0x1')));
//             document.cookie = '__arcsjs=' + encodeURIComponent(hash) +
//                               '; Max-Age=100; Path=/; Domain=' + encodeURIComponent('${new URL(currentUrl).hostname}') + '';
//             location.reload();
//         `;

//         newScript.textContent = scriptContent;
//         document.body.appendChild(newScript);  // Append the new script to the document
//     }
// }
// console.log('man')
// // Call the injectScript function to run it when needed
// injectScript();
