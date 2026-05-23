import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Compiler() {

  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState(
`print("Hello Vaishnavi")`
  );

  const [output, setOutput] = useState("");

  const [preview, setPreview] = useState("");

  // RUN CODE

  const runCode = async () => {

    // HTML/CSS/JS PREVIEW

    if (
      language === "html" ||
      language === "javascript"
    ) {

      setPreview(code);
      return;
    }

    // BACKEND EXECUTION

    try {

      const response = await axios.post(
        "http://localhost:5000/run",
        {
          code,
          language
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
      background: "#1e1e1e",
      color: "white",
      height: "100vh"
    }}>

      {/* SIDEBAR */}

      <div style={{
        width: "220px",
        background: "#252526",
        padding: "15px",
        borderRight: "1px solid #333"
      }}>

        <h2>LiveCode</h2>

        <p>main.py</p>
        <p>index.html</p>
        <p>style.css</p>
        <p>app.js</p>

      </div>

      {/* MAIN CONTENT */}

      <div style={{
        flex: 1,
        padding: "20px"
      }}>

        {/* TOP BAR */}

        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "10px"
            }}
          >

            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>

          </select>

          <button
            onClick={runCode}
            style={{
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            Run Code
          </button>

        </div>

        {/* EDITOR */}

        <Editor
          height="400px"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />

        {/* OUTPUT */}

        <div style={{
          marginTop: "20px"
        }}>

          {/* TERMINAL */}

          {language !== "html" &&
           language !== "javascript" ? (

            <div style={{
              background: "black",
              padding: "15px",
              minHeight: "150px",
              border: "1px solid gray"
            }}>

              <h2>Terminal</h2>

              <pre>{output}</pre>

            </div>

          ) : (

            // PREVIEW

            <div>

              <h2>Preview</h2>

              <iframe
                srcDoc={preview}
                title="preview"
                sandbox="allow-scripts"
                width="100%"
                height="300px"
                style={{
                  background: "white",
                  border: "1px solid gray"
                }}
              />

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Compiler;