import { useState, useEffect, useRef, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // ✅ useCallback for password generator
  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+{}[]<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  }, [length, includeNumbers, includeSymbols]);

  // ✅ useEffect → auto-generate when options change
  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols, generatePassword]);

  // ✅ Copy to clipboard
  const copyToClipboard = () => {
    passwordRef.current.select();
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <div
      style={{
         height: "100vh",  
        width: "100vw",  
        minHeight: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          width: "400px",
          textAlign: "center",
        }}
      >
        {/* Password display with copy */}
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px 0 0 8px",
              border: "none",
              fontSize: "16px",
            }}
          />
          <button
            onClick={copyToClipboard}
            style={{
              backgroundColor: "dodgerblue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
            }}
          >
            Copy
          </button>
        </div>

        {/* Options */}
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <label style={{ display: "block", margin: "10px 0" }}>
            Length: {length}
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>

          <label style={{ marginRight: "15px" }}>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
