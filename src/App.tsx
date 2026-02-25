import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Layout from "./layout/Layout";
import Users from "@/pages/Users";
import UserDetail from "./pages/UserDetail";
import Complaints from "@/pages/Complaints";
import ComplaintDetail from "./pages/ComplaintDetail";
import Posts from "@/pages/Posts";
import PostDetail from "./pages/PostDetail";
import Ads from "@/pages/Ads";
import Messaging from "@/pages/Messaging";
import Settings from "./pages/Settings";
import LoginPage from "./pages/Login";
import UploadMedia from "./pages/UploadMedia";
import DeleteAccount from "./pages/DeleteAccount";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FinancialSocialNetwork from "./pages/Home2";
import LandingPage from "./pages/LandingPage";
// import NotFound from "@/pages/not-found";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<ComplaintDetail />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="ads" element={<Ads />} />
          <Route path="settings" element={<Settings />} />
          <Route path="upload-media" element={<UploadMedia />} />
          {/* <Route path="/messaging" element={<Messaging />} /> */}
          {/* <Route path="/users" component={Users} />
        <Route path="/complaints" component={Complaints} />
        <Route path="/posts" component={Posts} />
        <Route path="/ads" component={Ads} />
        <Route path="/messaging" component={Messaging} />
         {/* <Route component={NotFound} />
         */}
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    // <Provider store={store}>
    //   <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
    //   </QueryClientProvider>
    // </Provider>
  );
}

export default App;
