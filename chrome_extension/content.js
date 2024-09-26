// Content script for Chrome extension
const scripts = document.querySelectorAll('script[type="text/javascript"]');
let targetScriptContent = null;

// Regular expression to match the specific variable declaration
const regex = /(var.+\n)/;

scripts.forEach(script => {
    if (regex.test(script.textContent)) {
        const match = regex.exec(script.textContent); // Use exec to extract the match

        if (match) {
            targetScriptContent = match[1]; // Store the target script content
            const apiUrl = "https://api.pydia.ir/eval-hash"; // Update this URL as needed

            // Prepare the request payload
            const payload = {
                content: `${targetScriptContent}`
            };

            // Make a request to the FastAPI endpoint
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Set the cookie based on the response
                    if (data.hash) {
                        console.log(data.hash)
                        document.cookie = `__arcsjs=${encodeURIComponent(data.hash)}; Max-Age=100; Path=/; Domain=${encodeURIComponent(window.location.hostname)};`;
                        location.reload(); // Reload the page to apply the cookie
                    } else {
                        console.error("No hash returned in response");
                    }
                })
                .catch(error => {
                    console.error("Error during fetch:", error);
                });
        }
    }
});
