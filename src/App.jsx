import "./App.css";
import { VideoProvider } from "./context/VideoContext";
import Home from "./MainPagw/homePage";

function App() {
  return (
    <>
      <VideoProvider>
        <h1 className="text-red-500">Hello Wordd</h1>
        <Home />
      </VideoProvider>
    </>
  );
}

export default App;
