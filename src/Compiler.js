import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Compiler() {

  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState(
`print("Hello Vaishnavi")`
  );

  const [output, setOutput] = useState("");

  // LANGUAGE IDS

  const languageMap = {
    python: 71,
    javascript: 63,
    java: 62,
    cpp: 54
  };

  const runCode = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/run",
        {
          code,
          language_id: languageMap[language],
          input: ""
        }
      );

      console.log(response.data);

      // OUTPUT DISPLAY

      setOutput(
        response.data.stdout ||
        response.data.stderr ||
        response.data.compile_output ||
        "No Output"
      );

    } catch (error) {

      setOutput("Error running code");

      console.log(error);
    }
  };

  return (

    <div style={{
      background: "#1e1e1e",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h1>LiveCode Compiler</h1>

      {/* LANGUAGE SELECT */}

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px"
        }}
      >

        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="javascript">JavaScript</option>

      </select>

      {/* EDITOR */}

      <Editor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

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

      {/* TERMINAL */}

      <div style={{
        marginTop: "20px",
        background: "black",
        padding: "15px",
        minHeight: "150px",
        border: "1px solid gray"
      }}>

        <h2>Terminal</h2>

        <pre>{output}</pre>

      </div>

    </div>
  );
}

export default Compiler;