import React from 'react';
import './App.css';
import Welcome from './pages/Welcome';
import Post from './pages/Post';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { AppContextProvider } from './context/AppContext';

//React Router app, returning the routes for the imported pages
//Using react router dom to route the pages

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/post' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;