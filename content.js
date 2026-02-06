function getProblemText() {
    const container = document.querySelector(
        '[data-track-load="description_content"]'
    );
    if (!container) return "";

    const elements = container.querySelectorAll("p, li");

    return Array.from(elements)
        .map(el => el.innerText.trim())
        .filter(Boolean)
        .join("\n\n");
}

function findPillRowByTopics() {
    const candidates = Array.from(document.querySelectorAll("div, span"))
        .filter(el => el.innerText?.trim() === "Topics");

    if (!candidates.length) return null;

    const topicsText = candidates[0];

    const pill = topicsText.closest(
        ".relative.inline-flex.items-center.justify-center"
    );
    if (!pill) return null;

    return pill.parentElement;
}

function createPill(id, text) {
    const pill = document.createElement("div");
    pill.id = id;
    pill.className =
        "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary " +
        "cursor-default transition-colors text-sd-secondary-foreground";

    pill.textContent = text;
    return pill;
}


function injectAnalysis(data) {
    const pillRow = findPillRowByTopics();
    if (!pillRow) return;

    let wrapper = document.getElementById("ollama-analysis-pills");

    // Create pills if not present
    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "ollama-analysis-pills";
        wrapper.className = "flex gap-1";

        wrapper.appendChild(
            createPill("ollama-time", `T.C: ${data.time_complexity}`)
        );
        wrapper.appendChild(
            createPill("ollama-space", `S.C: ${data.space_complexity}`)
        );

        pillRow.appendChild(wrapper);
        return;
    }

    // Update existing pills
    const timePill = document.getElementById("ollama-time");
    const spacePill = document.getElementById("ollama-space");
    const solveTimePill = document.getElementById("ollama-solve-time");

    if (timePill) {
        timePill.textContent = `T.C: ${data.time_complexity}`;
    }
    if (spacePill) {
        spacePill.textContent = `S.C: ${data.space_complexity}`;
    }
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_PROBLEM") {
        sendResponse({ text: getProblemText() });
    }

    if (req.type === "INJECT_ANALYSIS") {
        injectAnalysis(req.data);
    }
});
