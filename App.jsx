import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = "";

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    // Prevent generating an empty password
    if (characters.length === 0) {
      setPassword("");
      return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyPassword = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  return (
    <div className="app">
      <div className="password-card">
        <h1>Password Generator</h1>

        <p className="subtitle">
          Create a strong and secure password
        </p>

        <div className="password-box">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password"
          />

          <button onClick={copyPassword} className="copy-btn">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="settings">
          <div className="setting-header">
            <label>Password Length</label>
            <span>{length}</span>
          </div>

          <input
            type="range"
            min="6"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="range"
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <span>Include Symbols (!@#$)</span>
          </label>
        </div>

        <button onClick={generatePassword} className="generate-btn">
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;