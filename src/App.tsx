import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Layout from "./layout/Layout";
import Users from "@/pages/Users";
import Complaints from "@/pages/Complaints";
import Posts from "@/pages/Posts";
import Ads from "@/pages/Ads";
import Messaging from "@/pages/Messaging";
import Settings from "./pages/Settings";
import LoginPage from "./pages/Login";
// import NotFound from "@/pages/not-found";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/messaging" element={<Messaging />} /> */}
          {/* <Route path="/users" component={Users} />
        <Route path="/complaints" component={Complaints} />
        <Route path="/posts" component={Posts} />
        <Route path="/ads" component={Ads} />
        <Route path="/messaging" component={Messaging} />
        <Route component={NotFound} /> */}
        </Route>
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
