import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
import SecureRoutes from "./utils/SecureRoutes";
import OpenRoutes from "./utils/OpenRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SecureRoutes />}>
          <Route path="/" element={<Room />}></Route>
          </Route>
          <Route element={<OpenRoutes />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-left"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "12px",
            fontFamily: "Poppins",
          },
        }}
      />
    </>
  );
}

export default App;
