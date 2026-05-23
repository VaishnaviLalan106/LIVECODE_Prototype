import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Compiler() {

  // FILE SYSTEM

  const [files, setFiles] = useState({

    "main.py": {
      language: "python",
      code: `print("Hello Python")`
    },

    "script.js": {
      language: "javascript",
      code: `console.log("Hello JavaScript")`
    },

    "main.cpp": {
      language: "cpp",
      code:
`#include <iostream>
using namespace std;

int main() {
  cout << "Hello C++";
}`
    },

    "index.html": {
      language: "html",
      code:
`<h1>Hello LiveCode</h1>
<button onclick="showMessage()">
Click Me
</button>`
    },

    "style.css": {
      language: "css",
      code:
`body {
  font-family: Arial;
  padding: 20px;
}

h1 {
  color: blue;
}`
    },

    "web.js": {
      language: "javascript",
      code:
`function showMessage() {
  alert("Live Preview Working!");
}`
    }

  });

  // CURRENT FILE

  const [currentFile, setCurrentFile] =
  useState("index.html");

  // OUTPUT

  const [output, setOutput] = useState("");

  // PREVIEW

  const [srcDoc, setSrcDoc] = useState("");

  // CURRENT FILE DATA

  const currentLanguage =
  files[currentFile].language;

  const currentCode =
  files[currentFile].code;

  // UPDATE CODE

  const updateCode = (value) => {

    setFiles({
      ...files,

      [currentFile]: {
        ...files[currentFile],
        code: value
      }
    });
  };

  // LIVE PREVIEW

  useEffect(() => {

    const html =
      files["index.html"]?.code || "";

    const css =
      files["style.css"]?.code || "";

    const js =
      files["web.js"]?.code || "";

    const combined = `
      <html>

      <style>
      ${css}
      </style>

      <body>
      ${html}

      <script>
      ${js}
      </script>

      </body>

      </html>
    `;

    setSrcDoc(combined);

  }, [files]);

  // RUN BACKEND CODE

  const runCode = async () => {

    // ONLY BACKEND LANGUAGES

    if (
      currentLanguage === "html" ||
      currentLanguage === "css"
    ) {

      setOutput(
        "Live Preview Active → No Need To Run"
      );

      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/run",
        {
          code: currentCode,
          language: currentLanguage
        }
      );

      setOutput(
        response.data.output || "No Output"
      );

    } catch (error) {

      setOutput("Error running code");

      console.log(error);
    }
  };

  return (

    <div style={{
      display: "flex",
      height: "100vh",
      background: "#1e1e1e",
      color: "white"
    }}>

      {/* SIDEBAR */}

      <div style={{
        width: "220px",
        background: "#111",
        padding: "10px",
        borderRight: "1px solid #333"
      }}>

        <h2>Files</h2>

        {

          Object.keys(files).map((file) => (

            <div
              key={file}
              onClick={() => setCurrentFile(file)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderRadius: "5px",
                marginBottom: "5px",

                background:
                  currentFile === file
                  ? "#333"
                  : "transparent"
              }}
            >
              {file}
            </div>

          ))
        }

      </div>

      {/* CENTER */}

      <div style={{
        flex: 1,
        display: "flex"
      }}>

        {/* EDITOR AREA */}

        <div style={{
          width: "50%",
          padding: "10px",
          display: "flex",
          flexDirection: "column"
        }}>

          <h2>{currentFile}</h2>

          <Editor
            height="60%"
            language={currentLanguage}
            theme="vs-dark"
            value={currentCode}
            onChange={updateCode}
          />

          {/* RUN BUTTON */}

          <button
            onClick={runCode}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Run Code
          </button>

          {/* TERMINAL */}

          <div style={{
            marginTop: "20px",
            background: "black",
            padding: "15px",
            flex: 1,
            overflow: "auto"
          }}>

            <h3>Terminal</h3>

            <pre>{output}</pre>

          </div>

        </div>

        {/* LIVE PREVIEW */}

        <div style={{
          width: "50%",
          background: "white",
          borderLeft: "1px solid #333"
        }}>

          <div style={{
            background: "#222",
            color: "white",
            padding: "10px"
          }}>

            <h3>Live Preview</h3>

          </div>

          <iframe
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />

        </div>

      </div>

    </div>
  );
}

export default Compiler;