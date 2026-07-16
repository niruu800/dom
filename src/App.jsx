import "./App.css";
import { VideoProvider } from "./context/VideoContext.jsx";
import HomePage from "./layout/homePage.jsx";

function App() {
  return (
    <>
      <VideoProvider>
        {/* <h1 className="text-red-500">Hello Wordd</h1> */}
        <HomePage />
      </VideoProvider>
    </>
  );
}

export default App;
