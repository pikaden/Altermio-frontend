import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css';
import ProductCarouselImage from './Images/ItemCarouselImage';

const ProductCarousel = (props) => {
  // TODO: change default image url
  const defaultImageUrl = 'https://bocdn.ecotree.green/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg?d=960x540';

  return (
    <div className="product__carousel__container">
      <div className="product__carousel">
        {props.item.images.length === 0 &&
          <Carousel variant="dark" interval={4000}>
            <Carousel.Item>
              <div className="carousel__image__container">
                <img className="carousel__image" src={defaultImageUrl} alt="item" />
              </div>
            </Carousel.Item>
          </Carousel>
        }
        {props.item.images.length !== 0 &&
          <Carousel variant="dark" interval={4000}>
            {props.item.images.map(imageId => (
              <Carousel.Item>
                <ProductCarouselImage image={imageId} />
              </Carousel.Item>
            ))}
          </Carousel>
        }
      </div>
    </div>
  );
}

export default ProductCarousel;