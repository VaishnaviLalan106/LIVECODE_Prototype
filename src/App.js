import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {

  const [html, setHtml] = useState("<h1>Hello LiveCode</h1>");
  const [css, setCss] = useState("h1 { color: blue; }");
  const [js, setJs] = useState("console.log('Hello')");
  const [srcDoc, setSrcDoc] = useState("");

  const runCode = () => {

    const combinedCode = `
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

    setSrcDoc(combinedCode);
  };

  return (
    <div style={{
      background: "#1e1e1e",
      color: "white",
      minHeight: "100vh",
      padding: "10px"
    }}>

      <h1>LiveCode</h1>

      {/* EDITORS */}

      <div style={{ display: "flex", gap: "10px" }}>

        <div style={{ width: "33%" }}>
          <h3>HTML</h3>

          <Editor
            height="200px"
            defaultLanguage="html"
            theme="vs-dark"
            value={html}
            onChange={(value) => setHtml(value)}
          />
        </div>

        <div style={{ width: "33%" }}>
          <h3>CSS</h3>

          <Editor
            height="200px"
            defaultLanguage="css"
            theme="vs-dark"
            value={css}
            onChange={(value) => setCss(value)}
          />
        </div>

        <div style={{ width: "33%" }}>
          <h3>JavaScript</h3>

          <Editor
            height="200px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={js}
            onChange={(value) => setJs(value)}
          />
        </div>

      </div>

      {/* RUN BUTTON */}

      <button
        onClick={runCode}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Run Code
      </button>

      {/* PREVIEW */}

      <div style={{ marginTop: "20px" }}>

        <h2>Preview</h2>

        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="400px"
          style={{
            background: "white",
            border: "1px solid gray"
          }}
        />

      </div>

    </div>
  );
}

export default App;