import { WindowProvider } from "../context/windowContext";
import { OpenWindowProvider } from "../context/openWindowContext";
import LandingPage from "../pages/landing/landing";
import ScreenSizeError from "components/organisms/screen-size-error/screen-size-error";

function App() {
  return (
  <>
  <WindowProvider>
  <OpenWindowProvider>
  <ScreenSizeError />
  <LandingPage />
  </OpenWindowProvider>
  </WindowProvider>

  </>
  );
}

export default App;
