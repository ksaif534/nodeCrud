import React from 'react';
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails  from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import  Navbar  from './components/Navbar/Navbar';
import Auth  from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (!user) {
        return (
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={() => <Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/auth" exact element={<Auth />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/users/profile/:id" element={ <UserProfile /> } />
                        <Route path="/users/profile/:id/edit" element={ <EditProfile /> } />
                    </Routes>
                </Container>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={() => <Navigate to="/posts" />} />
                        <Route path="/posts" exact element={<Home />} />
                        <Route path="/posts/search" exact element={<Home />} />
                        <Route path="/auth" exact element={<Navigate to="/posts" />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/users/profile/:id" element={ <UserProfile /> } />
                        <Route path="/users/profile/:id/edit" element={ <EditProfile /> } />
                    </Routes>
                </Container>
            </BrowserRouter>
        );    
    }
}

export default App;