import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router';
import { useProducts } from '../../contexts/ProductsContext';
import MySpinner from '../../shared/MySpinner';
import ProductsList from '../Products/ProductsList';
import './content.css';

const Content = () => {
    const { fetchProducts, loading, error, products } = useProducts();

    const [page, setPage] = useState(0);

    const productPerPage = 6;

    const location = useLocation();

    const pageCount = Math.ceil(products.length / productPerPage);

    const pageVisited = page * productPerPage;

    const paginateProducts = products.slice(pageVisited, pageVisited + productPerPage);

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    useEffect(() => {
        fetchProducts();
    }, [location.search]);

    return (
        <Grid item md={9}>
            {loading && <MySpinner size={50} />}
            {!loading && error && <h2>{error}</h2>}
            {!loading && products.length > 0 && (
                <>
                    <ProductsList products={paginateProducts} />
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName="pagination"
                        previousLinkClassName="previousBtn"
                        nextLinkClassName="nextBtn"
                        activeClassName="activeBtn"
                        disabledClassName="disabledBtn"
                    />
                </>
            )}
        </Grid>
    );
};

export default Content;
