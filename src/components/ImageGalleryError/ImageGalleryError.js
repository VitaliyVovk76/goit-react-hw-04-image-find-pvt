import PropTypes from "prop-types";
import errorImage from "../../images/error.jpg";

const ImageGalleryError = ({ message }) => {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="sadcat" />
      <p>{message}</p>
    </div>
  );
};

ImageGalleryError.propTypes = { message: PropTypes.string.isRequired };

export default ImageGalleryError;
