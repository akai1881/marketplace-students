import { Grid, Paper, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/ProductsContext';
import Spinner from '../../components/Spinner';
import { ImageWithZoom, Slider, CarouselProvider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const useStyles = makeStyles(theme => ({
  paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      textAlign: 'center'
  }
}))

const ProductDetails = (props) => {
  const { getProductsDetails, productDetails } = useContext(productsContext);
  const classes = useStyles();

  useEffect(() => {
    getProductsDetails(props.match.params.id)
  }, [])
  
  return (
    <Grid container>
      {productDetails ? (
        <Grid container>
          <Grid item md={3}>
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

          <Grid item md={9}>
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
                    <th>Count in stock:</th>
                    <td>{productDetails.countInStock}</td>
                  </tr>
                  <tr>
                    <th>Author:</th>
                    <td>{productDetails.author}</td>
                  </tr>
                  <tr>
                    <th>Phone number:</th>
                    <td>{productDetails.phone}</td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      ) : (
          <Spinner />
        )}

    </Grid>
  );
};

export default ProductDetails;