import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

/* ================= USER SIDE ================= */

import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import Experience from "./components/LandingPage/Experience";
import ExpertTeam from "./components/LandingPage/ExpertTeam";
import PropertyPage from "./components/LandingPage/PropertyPage";
import WhyChoose from "./components/LandingPage/Whychoose";
import Footer from "./components/LandingPage/Footer";

import AboutPage from "./components/AboutPage/AboutPage";
import Contact from "./components/ContactPage/Contact";
import Properties from "./components/PropertiesPage/Properties";
import Menu from "./components/MenuPage/Menu";

import Login from "./components/Login/Login";
import SignIn from "./components/Login/Register";
import Verify from "./components/Login/Verify";


// user profile (frontend)
import UserProfile2 from "./Pages/User/UserProfile2";
import MyBookings from "./Pages/User/MyBookings";
import MySellProperties from "./Pages/User/MySellProperties";
import UserSettings from "./Pages/User/Settings";

import PropertyDetails from "./components/PropertiesPage/PropertyDetails";
import SellProperty from "./components/SellPage/SellProperty";
import BookingPage from "./components/PropertiesPage/BookingPage";
import BookingSuccess from "./components/PropertiesPage/BookingSuccess";
import BookAppointment from "./Pages/BookAppointment";
import RentalBookingPage from "./Pages/RentalBooking/RentalBookingPage";

import Agents from "./components/AgentPage/Agents";
import AgentDetails from "./Pages/AgentDetails";

import RentPage from "./components/RentPage/RentPage";
import RentDetails from "./components/RentPage/RentDetails";
import BookVisit from "./components/RentPage/BookVisit";

import Prerent from "./components/PerRentPage/Prerent";
import Prerentdetails from "./components/PerRentPage/Prerentdetails";

import PremiumServices from "./components/PremiumServices/PremiumServices";
import ExploreDesign from "./components/PremiumServices/ExploreDesign";
import PropertyFinancing from "./components/PremiumServices/PropertyFinancing";
import PropertyInspection from "./components/PremiumServices/PropertyInspection";
import LegalServices from "./components/PremiumServices/LegalServices";
import RelocationMoving from "./components/PremiumServices/Relocation&Moving";
import HomeMaintenance from "./components/PremiumServices/HomeMaintenance";

/* ================= ADMIN ================= */

import AdminLayout from "./Pages/Admin/Layout/AdminLayout";

import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AgentList from "./Pages/Admin/Agent/AgentList";
import AddAgent from "./Pages/Admin/Agent/AddAgent";
import EditAgent from "./Pages/Admin/Agent/EditAgent";


//import AddAgent from "./Pages/Admin/Agent/AddAgent";
//import EditAgent from "./Pages/Admin/Agent/EditAgent";
//import AddList from "./Pages/Admin/Agent/AddList";

import BookingDetails from "./Pages/Admin/Bookings/BookingDetails";
import BookingList from "./Pages/Admin/Bookings/BookingList";

import AddProperty from "./Pages/Admin/Properties/AddProperty";
import EditProperty from "./Pages/Admin/Properties/EditProperty";
import PropertyList from "./Pages/Admin/Properties/PropertyList";

import Reports from "./Pages/Admin/Reports/Reports";
import Reviews from "./Pages/Admin/Reviews/Reviews";
import Settings from "./Pages/Admin/Settings/Settings";

import UserList from "./Pages/Admin/Users/UserList";
import UserProfile from "./Pages/Admin/Users/UserProfile";
import AdminLogin from "./Pages/Admin/Dashboard/AdminLogin";

import ContactList from "./Pages/Admin/Contacts/ContactList";
import PremiumServiceList from "./Pages/Admin/PremiumServices/PremiumServiceList"; // ✅ Add this line
import AdminSalesList from "./Pages/Admin/Sales/AdminSalesList"; // ✅ Add this line
import RentalBookingsList from "./Pages/Admin/RentalBookings/RentalBookingsList"; // ✅ Add this line

/* ================= AGENT ================= */

// Layout
import AgentLayout from "./Page/Agent/Layout/AgentLayout";

// Dashboard View
import AgentDashboard from "./Page/Agent/Dashboard/Dashboard";

// Property Management
import PropertyListAgent from "./Page/Agent/Properties/PropertyList";
import AddPropertyAgent from "./Page/Agent/Properties/AddProperty";
import EditPropertyAgent from "./Page/Agent/Properties/EditProperty";

// Client Management
import ClientListAgent from "./Page/Agent/Clients/ClientList";
import AddClientAgent from "./Page/Agent/Clients/AddClient";
import EditClientAgent from "./Page/Agent/Clients/EditClient";

// Profile Management
import ProfileAgent from "./Page/Agent/Profile/Profile";

import Feedback from "./components/LandingPage/Feedback";
import AgentLogin from "./Page/Agent/Dashboard/AgentLogin";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Experience />
              <ExpertTeam />
              <PropertyPage />
              <WhyChoose />
              <Feedback />
            </>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/menu" element={<Menu />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignIn />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<UserProfile2 />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-sell-properties" element={<MySellProperties />} />
        <Route path="/settings" element={<UserSettings />} />

        {/* Property */}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/book-appointment/:propertyId" element={<BookAppointment />} />
        <Route path="/book-rental-appointment/:propertyId" element={<RentalBookingPage />} />
        <Route path="/sellproperty" element={<SellProperty />} />
        <Route path="/bookingsuccess/:id" element={<BookingSuccess />} />
        {/* Agents */}
        <Route path="/agent" element={<Agents />} />
        <Route path="/agent-details/:agentId" element={<AgentDetails />} />

        {/* Rent */}
        <Route path="/rentpage" element={<RentPage />} />
        <Route path="/rent/:id" element={<RentDetails />} />
        <Route path="/bookvisit/:id" element={<BookVisit />} />
        {/* Pre Rent */}
        <Route path="/prerent" element={<Prerent />} />
        <Route path="/prerentdetails/:id" element={<Prerentdetails />} />

        {/* Premium */}
        <Route path="/premiumservices" element={<PremiumServices />} />
        <Route path="/explore-design" element={<ExploreDesign />} />
        <Route path="/financing" element={<PropertyFinancing />} />
        <Route path="/inspection" element={<PropertyInspection />} />
        <Route path="/legal" element={<LegalServices />} />
        <Route path="/moving" element={<RelocationMoving />} />
        <Route path="/maintenance" element={<HomeMaintenance />} />

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="adminlogin" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />

          {/* Agent */}
          <Route path="agent" element={<AgentList />} />
          <Route path="agent/add" element={<AddAgent />} />
          <Route path="agent/edit/:id" element={<EditAgent />} />

          {/* Contacts */}
          <Route path="contactlist" element={<ContactList />} />

          {/* Properties */}
          <Route path="properties" element={<PropertyList />} />
          <Route path="properties/add" element={<AddProperty />} />
          <Route path="properties/edit/:id" element={<EditProperty />} />

          {/* Bookings */}
          <Route path="bookings" element={<BookingList />} />
          <Route path="bookings/:id" element={<BookingDetails />} />

          {/* Users */}
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserProfile />} />

          {/* Reviews */}
          <Route path="reviews" element={<Reviews />} />

          {/* Reports */}
          <Route path="reports" element={<Reports />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />

          {/* Package Bookings API Routes */}
          <Route path="premium-services" element={<PremiumServiceList />} />
          <Route path="sales" element={<AdminSalesList />} />
          <Route path="rental-bookings" element={<RentalBookingsList />} />

        </Route>

        {/* ================= AGENT ROUTES ================= */}

        <Route path="/agentlogin" element={<AgentLogin />} />

        <Route path="/agentdashboard" element={<AgentLayout />}>
          {/* Default Dashboard (Index Route) */}
          <Route index element={<AgentDashboard />} />

          {/* Properties Section */}
          <Route path="properties" element={<PropertyListAgent />} />
          <Route path="properties/add" element={<AddPropertyAgent />} />
          <Route path="properties/edit/:id" element={<EditPropertyAgent />} />

          {/* Clients Section */}
          <Route path="clients" element={<ClientListAgent />} />
          <Route path="clients/add" element={<AddClientAgent />} />
          <Route path="clients/edit/:id" element={<EditClientAgent />} />

          {/* Profile & Settings */}
          <Route path="profile" element={<ProfileAgent />} />
        </Route>


      </Routes>

      <Footer />
    </>
  );
}

export default App;
