import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/auth-context';
import MainPage from './pages/main-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import CreateInvoice from './pages/create-invoice-page';
import './App.css';


function App() {
  return (
    <div className="App bg-zinc-900">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<MainPage />} />
            <Route path="/register" element = {<RegisterPage />} />
            <Route path="/login" element = {<LoginPage />} />
            <Route path="/createInvoice" element = {<CreateInvoice/>} />
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