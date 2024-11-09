import React, { ReactNode, createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useModalState = () => {
  return useContext(ModalContext);
};

interface ModalProviderProps {
    children: ReactNode;
  }
  
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};


