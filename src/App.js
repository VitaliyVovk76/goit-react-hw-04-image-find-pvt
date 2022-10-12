import React, { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import API from "./servises/images-api";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Container from "./components/Container";
import Loader from "./components/Loader";
import ImageGalleryError from "./components/ImageGalleryError";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imgModal, setImgModal] = useState(null);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    setStatus(Status.PENDING);
    API.fechAxiosImg(searchQuery, page)
      .then((hits) => {
        if (hits.length === 0) {
          setError({ message: `No pictures with the name ${searchQuery}` });
          setStatus(Status.REJECTED);
          return;
        }
        setImages((state) => [...state, ...hits]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError({ message: "ERROR" });
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  const hendleFormSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const pageImcrement = () => setPage((state) => state + 1);

  const toggleModal = () => setShowModal((state) => !state);

  const settingImgModal = (img, alt) => setImgModal({ img: img, alt: alt });

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

  return (
    <Container>
      <Searchbar onSubmit={hendleFormSubmit} />
      {(status === Status.PENDING || status === Status.RESOLVED) && (
        <>
          <ImageGallery
            onToggleModal={toggleModal}
            onSetImgModal={settingImgModal}
            imgList={images}
          />
          {status === Status.PENDING && <Loader />}
          {status === Status.RESOLVED && (
            <>
              <Button
                type="bunnon"
                onClick={pageImcrement}
                text="Load more..."
              />
              {showModal && (
                <Modal onToggleModal={toggleModal} imgModal={imgModal} />
              )}
            </>
          )}
        </>
      )}
      {status === Status.REJECTED && (
        <ImageGalleryError message={error.message} />
      )}
    </Container>
  );
};

export default App;
