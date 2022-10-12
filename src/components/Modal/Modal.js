import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onToggleModal, imgModal }) => {
  useEffect(() => {
    window.addEventListener("keydown", onEscKeyDown);
    return () => clearEscKeyDown();
  });

  function onBackdropClick(evt) {
    if (evt.target === evt.currentTarget) {
      onToggleModal();
    }
  }

  function onEscKeyDown(evt) {
    if (evt.code === "Escape") {
      onToggleModal();
    }
  }

  function clearEscKeyDown() {
    window.removeEventListener("keydown", onEscKeyDown);
  }

  return createPortal(
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={s.content}>
        <img src={imgModal.img} alt={imgModal.alt} className={s.modalImage} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  imgModal: PropTypes.object.isRequired,
};

export default Modal;
