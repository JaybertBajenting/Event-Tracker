import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/About Us";
import { ModalProvider } from "./context/Modal";
import { AuthProvider, useAuth } from "./context/Auth";
import { ActiveComponentProvider } from "./context/ActiveComponent";
import Dashboard from "./pages/Dashboard";
import ContactUs from "./pages/Contact Us";
import { PrivacyPolicy } from "./pages/Privacy Policy";
import { TermsAndCondition } from "./pages/Terms and Conditions";
import DiscoverEvents from "./pages/Discover Events";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <ActiveComponentProvider>
      <ModalProvider>
        <AuthProvider>
          <Content />
        </AuthProvider>
      </ModalProvider>
    </ActiveComponentProvider>
  );
}

function Content() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/Dashboard" /> : <Homepage />}
      />
      <Route
        path="/AboutUs"
        element={isLoggedIn ? <Navigate to="/Dashboard" /> : <AboutUs />}
      />
      <Route
        path="/DiscoverEvents"
        element={isLoggedIn ? <Navigate to="/Dashboard" /> : <DiscoverEvents/>}
      />
      <Route
        path="/Dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path="/ContactUs" element={<ContactUs />} />

      <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

      <Route path="/TermsAndCondition" element={<TermsAndCondition />} />
      
      <Route path="/Calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
