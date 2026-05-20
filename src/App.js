import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {

  const [code, setCode] = useState("<h1>Hello LiveCode</h1>");
  const [output, setOutput] = useState("");

  const runCode = () => {

    // HTML Preview
    setOutput(code);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#1e1e1e",
      color: "white"
    }}>

      {/* LEFT SIDE */}
      <div style={{
        width: "70%",
        padding: "10px"
      }}>

        <h2>LiveCode Editor</h2>

        <Editor
          height="80vh"
          defaultLanguage="html"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />

        <button
          onClick={runCode}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Run Code
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div style={{
        width: "30%",
        padding: "10px",
        borderLeft: "1px solid gray"
      }}>

        <h2>Preview</h2>

        <iframe
          title="preview"
          srcDoc={output}
          style={{
            width: "100%",
            height: "80vh",
            background: "white"
          }}
        />

      </div>

    </div>
  );
}

export default App;