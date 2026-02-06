async function callWrapperServer(prompt) {
    const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt })
    });

    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "ANALYZE") {
        callWrapperServer(req.prompt)
            .then(output => sendResponse({ output }))
            .catch(err => sendResponse({ error: err.message }));
        return true; // keep message channel open
    }
});
