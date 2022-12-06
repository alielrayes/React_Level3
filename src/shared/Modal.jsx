


import React from 'react';



// closeModal => function to close the model
const Modal = ( {closeModal, children}   ) => {
  return (
    <div className="parent-of-model">
    <form className={`modal`}>
      <div
        onClick={() => {
          closeModal()
        }}
        className="close"
      >
        <i className="fa-solid fa-xmark"></i>
      </div>

      {children}
    </form>
  </div>
  );
}

export default Modal;










