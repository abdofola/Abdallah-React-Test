import reactLogo from "./assets/react.svg";
import Counter from "./components/Counter";
import Login from "./components/Login";
import LogginSubmission from "./components/LogginSubmission";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Testing React</h1>
      <div className="card">
        <Counter />
        <hr />
        <LogginSubmission />
      </div>
    </div>
  );
}

export default App;
