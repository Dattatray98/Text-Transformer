import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  const send = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vscode = (window as any).acquireVsCodeApi();

    vscode.postMessage({
      command: "chat",
      text: message
    });

    setMessage("");
  };

  return (
    <div className="border border-yellow-600 h-full w-full">
      <h2>datta listen</h2>

      <div className=" absolute bottom-0">

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={send} className=" border-2 border-red-800 ">Send</button>
      </div>
    </div>
  );
}