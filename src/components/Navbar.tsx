import React, { FormEvent, FormEventHandler, MouseEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { Modal } from "../components/Modal";
import { Button, FormButton } from "../components/Buttons";

const DbLoginUrl = "http://localhost:5000/login";

function handleNavClick() {
  window.alert("Hi!");
}

interface RightNavbarProps {
  onLogin: Function,
};

interface LoginFormProps {
  onClose: Function,
  onLogin: Function,
};

export interface LoginData {
  email: string,
  password: string,
};

const ModalHeader = {
  text: "Login",
  className: "modal-login-header",
};

const ModalBody = {
  text: "",
  className: "modal-login-body",
};

const LeftNavbar = (props: {}) => {
  return (
    <nav>
      <button
        className="nav-hamburger"
        onClick={handleNavClick}
        title="Navigation"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div className="nav-items">
        <ul>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/about">About The Company</Link></li>
          <li><Link to="/special-order">Make A Very Special Order</Link></li>
        </ul>
      </div>
    </nav>
  );
};

function LoginForm({ onClose, onLogin }: LoginFormProps) {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (value: Partial<LoginData>) => {
    return setLoginData((prev) => {
      return { ...prev, ...value }
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let loginReturnVal;
    try {
      loginReturnVal = await onLogin(loginData);
      console.log(loginReturnVal);

      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="modal-login-fields">
        <div className="modal-login-text-content-container">
          <div className="modal-login-field-container">
            <label htmlFor="modal-login-email">
              Email Address
            </label>
            <input
              type="email"
              className="modal-login-email"
              id="modal-login-email"
              onChange={(e) => handleFormFieldChange({
                email: e.target.value
              })}
            />
          </div>
          <div className="modal-login-field-container">
            <label htmlFor="modal-login-password">
              Password
            </label>
            <input
              type="password"
              className="modal-login-password"
              id="modal-login-password"
              onChange={(e) => handleFormFieldChange({
                password: e.target.value
              })}
            />
          </div>
        </div>
      </div>
      <div className="modal-login-buttons">
        <FormButton
          type="submit"
          value="Login"
        />
        <Button
          onClick={() => onClose()}
          text="Cancel"
        />
      </div>
    </form>
  );
}

const RightNavbar = ({ onLogin, }: RightNavbarProps) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const toggleLoginModal = () => {
    setModalIsVisible(modalIsVisible ? false : true);
  };

  return (
    <>
      <Button
        onClick={toggleLoginModal}
        text="Login"
      />
      <div className="login-modal">
        <Modal
          isVisible={modalIsVisible}
          header={ModalHeader}
          body={ModalBody}
          onClose={toggleLoginModal}
          containerClassName="modal-login-container"
        >
          <LoginForm
            onClose={toggleLoginModal}
            onLogin={onLogin}
          />
        </Modal>
      </div>
    </>
  );
};

export { LeftNavbar, RightNavbar };
