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

function createPill(text) {
    const pill = document.createElement("div");
    pill.className =
        "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary " +
        "cursor-default transition-colors text-sd-secondary-foreground";

    pill.textContent = text;
    return pill;
}

function injectAnalysis(data) {
    // Avoid duplicates
    if (document.getElementById("ollama-analysis-pills")) return;

    // Find the pill row (difficulty / topics / companies)
    const pillRow = document.querySelector(".flex.gap-1");
    console.log(pillRow)
    if (!pillRow) return;

    const wrapper = document.createElement("div");
    wrapper.id = "ollama-analysis-pills";
    wrapper.className = "flex gap-1";

    wrapper.appendChild(
        createPill(`⏱ ${data.time_complexity}`)
    );
    wrapper.appendChild(
        createPill(`💾 ${data.space_complexity}`)
    );
    wrapper.appendChild(
        createPill(`🧠 ${data.expected_solve_time} min`)
    );

    pillRow.appendChild(wrapper);
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_PROBLEM") {
        sendResponse({ text: getProblemText() });
    }

    if (req.type === "INJECT_ANALYSIS") {
        injectAnalysis(req.data);
    }
});
