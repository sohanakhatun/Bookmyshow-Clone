import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/ProfileDashboard/Dashboard";
import Home from "./components/Home";
import { MovieProvider } from "./Context/MovieContext";
import MovieDetails from "./components/Movies/MovieDetails";
import Footer from "./components/Footer";
import LikedMovies from "./components/Movies/LikedMovies";
import MyMovies from "./components/Movies/MyMovies";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };

  const LoggedInRoute = ({ children }) => {
    const { user } = useAuth();
    return !user ? children : <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <Navbar />
          <Routes>
            <Route
              path="/login"
              element={
                <LoggedInRoute>
                  <Login />
                </LoggedInRoute>
              }
            />
            <Route
              path="/register"
              element={
                <LoggedInRoute>
                  <Register />
                </LoggedInRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/liked"
              element={
                <ProtectedRoute>
                  <LikedMovies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <MyMovies />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                success: "!bg-green-50 !text-green-900 !border-green-300",
                error: "!bg-red-50 !text-red-900 !border-red-300",
              },
            }}
          />
          <Footer />
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
