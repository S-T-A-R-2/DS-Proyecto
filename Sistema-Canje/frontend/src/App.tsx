import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/auth-context';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';

import ProtectedRoute from './context/ProtectedRoute';

import CreateInvoice from './pages/create-invoice-page';
import FindInvoicePage from "./pages/find-invoice-page";
import SeeInvoice from "./pages/see-invoice-page";
import MedicinePage from './pages/medicine-page';
import PointsPage from './pages/points-page';

import './App.css';


function App() {
  return (
    <div className="App bg-zinc-900">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/register" element = {<RegisterPage />} />
            <Route path="/login" element = {<LoginPage />} />


            <Route element={<ProtectedRoute />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/see-invoice" element = {<SeeInvoice/>}/>
              <Route path="/find-invoice" element = {<FindInvoicePage/>}/>
              <Route path="/medicine" element={<MedicinePage />} />
              <Route path="/createInvoice" element = {<CreateInvoice/>} />
              <Route path="/register-invoice" element = {<CreateInvoice/>} />
              <Route path="/benefit-info" element = {<PointsPage/>} />
            </Route>



            {/*<Route path="/searchBlog" element = {<SeachRepositoryPage/>}/>
            <Route path="/blog/:id" element = {<RepositoryPage/>}/>
            <Route path="/blog/:id/AddFilePage" element = {<AddFilesPage/>}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/newBlog" element = {<NewRepositoryPage />} />
              <Route path="/user-profile" element = {<UserProfilePage/>}/>
            </Route>*/}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
