import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/const/routes';
import Header from '@/modules/Header';
import Home from '@/pages/Home/Home';
import Products from '@/pages/Products/Products';

function App() {
    return (
        <div className="flex flex-col min-h-screen text-gray-100">
            <Header />
            <main className="flex-1 bg-zinc-800">
                <Routes>
                    <Route path={routes.HOME.path} element={<Home />} />
                    <Route path={routes.PRODUCTS.path} element={<Products />} />
                    <Route path="*" element={<Navigate to={routes.HOME.path} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
