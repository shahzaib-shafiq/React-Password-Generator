import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //use Ref
  const passwordRef = useRef(null);
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
    toast("Password Copied to Clipboard!");
    // passwordRef.current.select();
    // document.execCommand("copy");
  }, [password]);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let specialChar = "!@#$%^&*()_+";
    if (charAllowed) {
      str += specialChar;
    }
    if (numAllowed) {
      str += num;
    }

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg p-6 my-4 text-orange-500 bg-gray-700">
        <h4 className="text-white text-center text-lg font-semibold">
          Password Generator
        </h4>
        <div className="flex items-center gap-2 my-4 bg-gray-800 rounded-lg px-4 py-2">
          <input
            type="text"
            value={password}
            className="outline-none w-full bg-transparent text-orange-500"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard}>Copy</button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div className="flex flex-col gap-4 my-4 text-sm">
          <div className="flex flex-col">
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white text-center mt-1">
              Length: {length}
            </label>
          </div>
          <div className="flex flex-col items-center">
            <input
              type="checkbox"
              checked={numAllowed}
              className="cursor-pointer"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label className="text-white mt-1">Number Allowed</label>
          </div>
          <div className="flex flex-col items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              className="cursor-pointer"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label className="text-white mt-1">Special Char Allowed</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
