import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom"
import SearchPage from "./Pages/SearchPg";
import WebFooter from "./Components/Footer";
import Navbar from "./Components/Navbar";
import LoginPg from "./Pages/LoginPg";
import RegisterPg from "./Pages/RegisterPg";
import { AuthProvider, useAuthSession } from "./Hooks/AuthContext";
import ProfilePg from "./Pages/ProfilePg";
import ExtraDetailsPg from "./Pages/ExtraDetailsPg";

// Layout component that includes the navbar and footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <WebFooter />
    </div>
  );
};

// Pages
const HomePage = () => <SearchPage />;
const JobDetailsPage = () => <div className="container mx-auto px-4 py-8">Job Details Page</div>;
const PostJobPage = () => <div className="container mx-auto px-4 py-8">Post a Job Page</div>;
const LoginPage = () => <LoginPg />;
const RegisterPage = () => <RegisterPg />;
const EmployerDashboardPage = () => <div className="container mx-auto px-4 py-8">Employer Dashboard</div>;
const ProfilePage = () => <ProfilePg />;
const UserDetailsPage = () => <ExtraDetailsPg />;
const NotFoundPage = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">The page you are looking for doesn't exist.</p>
    <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
      Go Home
    </Link>
  </div>
);

// Protected route wrapper component that uses the auth context
const ProtectedRoute = ({ children, requiredRole = null }: { children: React.ReactNode, requiredRole?: string | null }) => {
  const { isLoggedIn, user, isLoading } = useAuthSession();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.user_role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/jobs" element={<Layout><HomePage /></Layout>} />
          <Route path="/jobs/:id" element={<Layout><JobDetailsPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
          <Route path="/user-details" element={<Layout><UserDetailsPage /></Layout>} />
          <Route path="/employers" element={<Layout><div>Employers Page</div></Layout>} />
          <Route path="/find-talent" element={<Layout><div>Find Talent Page</div></Layout>} />
          <Route path="/faq" element={<Layout><div>FAQ Page</div></Layout>} />
          <Route path="/privacy-policy" element={<Layout><div>Privacy Policy Page</div></Layout>} />
          <Route path="/terms" element={<Layout><div>Terms of Service Page</div></Layout>} />
          
          {/* Protected routes */}
          <Route path="/post-job" element={
            <Layout>
              <ProtectedRoute requiredRole="employer">
                <PostJobPage />
              </ProtectedRoute>
            </Layout>
          } />
          <Route path="/dashboard" element={
            <Layout>
              <ProtectedRoute requiredRole="employer">
                <EmployerDashboardPage />
              </ProtectedRoute>
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;