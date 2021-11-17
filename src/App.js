import { BrowserRouter } from 'react-router-dom';
import ProductsContext from './contexts/ProductsContext';
import AppRoutes from './routes';

function App() {
    return (
        <BrowserRouter>
            <ProductsContext>
                <AppRoutes />
            </ProductsContext>
        </BrowserRouter>
    );
}

export default App;
