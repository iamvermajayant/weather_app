import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import { ThemeProvider } from './context/theme-provider';
import Weatherdashboard from './pages/Weatherdashboard';
import CityPage from './pages/CityPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <Routes>
              <Route path='/' element={<Weatherdashboard />} />
              <Route path='/city/:cityName' element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
