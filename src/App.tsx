import "./App.css";
import { MyProvider } from "./context/Context";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <MyProvider>
        <Routes />
      </MyProvider>
    </div>
  );
}

export default App;
