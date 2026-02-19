import { Route, Routes } from "react-router-dom";
import HomeLayout from "./LayOut/HomeLayout";
import LandingPage from "./Pages/LandingPage";
import MainLayout from "./LayOut/MainLayout";
import StreamSelection from "./Pages/StreamSelection";
import SeniorStreanSelection from "./Pages/SeniorStreanSelection";
import QuizPage from "./Pages/QuizPage";
import Feedback from "./Pages/Feedback";
import CarreerPage from "./Pages/CarreerPage";
import LoginLayout from "./LayOut/LoginLayout";
import VerificationPage from "./Pages/VerificationPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthPage from "./Pages/AuthPage";
import LoginPage from "./Pages/LoginPage";
import ResetPage from "./Pages/ResetPage";
import Roadmap from "./Pages/Roadmap";
import ProfilePage from "./Pages/ProfilePage";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { bootstrapAuth } from "./servies/api";
import ProtectedRoute from "./LayOut/ProtectedRoute";
import { useAuthStore } from "./store/auth";
import Loading from "./Components/Loading";

function App() {
  const authInitialized = useAuthStore((s) => s.authInitialized);

  useEffect(() => {
    bootstrapAuth();
  }, []);

  if (!authInitialized) return <Loading />;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/stream" element={<StreamSelection />} />
          <Route path="/seniorstream" element={<SeniorStreanSelection />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/career" element={<CarreerPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<ProfilePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/roadmap/:id" element={<Roadmap />} />
          </Route>

          <Route path="/auth" element={<LoginLayout />}>
            <Route index element={<AuthPage />} />
            <Route path="verify" element={<VerificationPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="reset" element={<ResetPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
