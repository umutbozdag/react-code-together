import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
const endpoint = "localhost:4001";
const socket = socketIOClient(endpoint);

function App() {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    socket.on("message", message => {
      setMessage(message);
    });
  }, []);

  const handleOnChange = newValue => {
    console.log(newValue);
    socket.emit("message", newValue);
    // else if (e.target.name == "language-input")
    //   setLanguage(e.target.value);
  };
  return (
    <div className="App">
      <h3>hello world</h3>
      <input
        onChange={e => handleOnChange(e)}
        name="language-input"
        type="text"
        placeholder="Language"
      />

      <AceEditor
        mode="java"
        theme="github"
        name="code-area"
        onChange={handleOnChange}
        editorProps={{ $blockScrolling: true }}
        value={message}
        fontSize={18}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets
      />
      {/* <SyntaxHighlighter language={language} style={docco}>
        {message}
      </SyntaxHighlighter> */}
    </div>
  );
}

export default App;
