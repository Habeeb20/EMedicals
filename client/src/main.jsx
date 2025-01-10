import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./components/Doctor/context/AuthContext.jsx";
import { SocketContextProvider } from "./components/Doctor/context/SocketContext.jsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
      <Provider store={store}>
         <App />
      </Provider>
      
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
