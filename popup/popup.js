const btn = document.getElementById("analyze");
const output = document.getElementById("output");

function buildPrompt(problemText) {
    return [
        "You are a LeetCode problem analysis assistant.",
        "",
        "Return ONLY valid JSON.",
        "Do NOT include markdown.",
        "Do NOT include explanations.",
        "Do NOT include extra text.",
        "",
        "The JSON must have exactly these keys:",
        "time_complexity",
        "space_complexity",
        "",
        "Rules:",
        "time_complexity: Big-O of the optimal solution (e.g. O(n), O(n log n))",
        "space_complexity: Big-O of the optimal solution",
        "",
        "Problem:",
        problemText.trim()
    ].join("\n");
}


function extractJSON(text) {
    if (!text) return null;
    return text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
}

btn.onclick = async () => {
    output.textContent = "Thinking...";

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    try {

        const problem = await chrome.tabs.sendMessage(tab.id, {
            type: "GET_PROBLEM"
        });

        if (!problem?.text) {
            output.textContent = "Could not read problem text.";
            return;
        }


        const prompt = buildPrompt(problem.text);

        const res = await chrome.runtime.sendMessage({
            type: "ANALYZE",
            prompt
        });

        if (!res?.output) {
            output.textContent = "No response from analysis engine.";
            return;
        }


        let data;
        try {
            const cleaned = extractJSON(res.output);
            data = JSON.parse(cleaned);
        } catch {
            output.textContent = "Model returned invalid JSON.";
            console.error("Raw model output:", res.output);
            return;
        }

        output.innerHTML = `
      <div class="pill">Time: ${data.time_complexity}</div>
      <div class="pill">Space: ${data.space_complexity}</div>
      <div class="pill">Solve Time: ${data.expected_solve_time} min</div>
    `;

        chrome.tabs.sendMessage(tab.id, {
            type: "INJECT_ANALYSIS",
            data
        });

    } catch (err) {
        output.textContent =
            "Open a LeetCode problem page and refresh it, then try again.";
        console.error(err);
    }
};
