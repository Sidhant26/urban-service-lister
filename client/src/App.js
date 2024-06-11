import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MockLogin from "./pages/MockLogin";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Payment = lazy(() => import("./pages/Payment"));
function App() {
  const isLoggedIn = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  console.log("USER");
  console.log(email);
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <Routes>
          <Route path="/login" element={<MockLogin />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/shop" element={<Shop isLoggedIn={isLoggedIn} />} />
          <Route
            path="/shop/:id"
            element={<Product isLoggedIn={isLoggedIn} />}
          />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route
            path="/payment"
            element={<Payment isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <Footer isLoggedIn={isLoggedIn} />
      </Router>
    </Suspense>
  );
}

export default App;
