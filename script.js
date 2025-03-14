// Initialize CodeMirror
window.onload = function () {
    // Initialize CodeMirror editor
    const editor = CodeMirror(document.getElementById("codeMirrorEditor"), {
        mode: "text/x-c++src", // Syntax highlighting for C++
        lineNumbers: true,
        theme: "midnight",
        value: "// Start coding here...\n",
    });
    editor.setSize("100%", "100%");

    
    const runButton = document.getElementById("runCode");
    const inputArea = document.getElementById("inputArea");
    const outputBox = document.getElementById("outputBox");


    runButton.addEventListener("click", async function () {
     
        const code = editor.getValue();
        const input = inputArea.value;

        outputBox.textContent = "Running your code... Please wait.";

        try {
   
            const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                    "X-RapidAPI-Key": "54a5f81e92msh814ee5116fc99b4p15d878jsn777f45810758" 
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: 54, 
                    stdin: input
                })
            });

        
            const result = await response.json();

           
            if (result.stderr) {
                outputBox.textContent = `Error:\n${result.stderr}`;
            } else if (result.compile_output) {
                outputBox.textContent = `Compilation Error:\n${result.compile_output}`;
            } else {
                outputBox.textContent = result.stdout || "No output.";
            }
        } catch (error) {
          
            outputBox.textContent = "An error occurred while executing the code.";
            console.error("Error:", error);
        }
    });
};
