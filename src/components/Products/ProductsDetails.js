import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useProducts } from '../../contexts/ProductsContext';
import MySpinner from '../../shared/MySpinner';
import {
  ImageWithZoom,
  Slider,
  CarouselProvider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles((theme) => ({
  custom_container: {
    marginTop: '60px',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'left',
  },
}));

const ProductsDetails = () => {
  const { fetchOneProduct, productDetails } = useProducts();
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id);
  }, []);

  const classes = useStyles();
  return (
    <Grid container>
      {productDetails ? (
        <Grid container className={classes.custom_container}>
          <Grid item md={4}>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={3}
            >
              <Slider>
                <Slide index={0}>
                  <ImageWithZoom src={productDetails.image} />
                </Slide>
                <Slide index={1}>
                  <ImageWithZoom src={productDetails.image} />
                </Slide>
                <Slide index={2}>
                  <ImageWithZoom src={productDetails.image} />
                </Slide>
              </Slider>
              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
          </Grid>
          <Grid item md={6}>
            <Paper elevation={3} className={classes.paper}>
              <table>
                <tbody>
                  <tr>
                    <th>Title:</th>
                    <td>{productDetails.title}</td>
                  </tr>
                  <tr>
                    <th>Price:</th>
                    <td>{productDetails.price}</td>
                  </tr>

                  {productDetails.salePrice ? (
                    <tr>
                      <th>Sale Price:</th>
                      <td>{productDetails.salePrice}</td>
                    </tr>
                  ) : null}

                  <tr>
                    <th>Description:</th>
                    <td>{productDetails.description}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{productDetails.phone}</td>
                  </tr>
                  <tr>
                    <th>Author:</th>
                    <td>{productDetails.author}</td>
                  </tr>
                  <tr>
                    <th>Category:</th>
                    <td>{productDetails.category}</td>
                  </tr>
                  <tr>
                    <th>Count in Stock:</th>
                    <td>{productDetails.countInStock}</td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <MySpinner />
      )}
    </Grid>
  );
};

export default ProductsDetails;
