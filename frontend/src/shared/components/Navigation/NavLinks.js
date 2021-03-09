import React, { useContext, useState } from "react";

import { NavLink } from "react-router-dom";
import Button from "../FormElements/Button";
import Modal from "../UIElements/Modal";
import ErrorModal from "../UIElements/ErrorModal";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import "./NavLinks.css";

const NavLinks = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmDeleteUserModal, setShowConfirmDeleteUserModal] = useState(
    false
  );

  const showDeleteUserWarningHandler = () => {
    setShowConfirmDeleteUserModal(true);
  };

  const cancelDeleteUserHandler = () => {
    setShowConfirmDeleteUserModal(false);
  };

  const confirmDeleteUserHandler = async () => {
    setShowConfirmDeleteUserModal(false);
    console.log("Deleting User Profile!");
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${auth.userId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {};
  };

  const confirmAndDelete = () => {
    confirmDeleteUserHandler();
    auth.logout();
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmDeleteUserModal}
        onCancel={cancelDeleteUserHandler}
        header="Do you really want to delete this user account?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteUserHandler}>CANCEL</Button>
            <Button danger onClick={confirmAndDelete}>DELETE USER PROFILE</Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this user profile? Please note that it
          can't be undone therafter.
        </p>
      </Modal>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            ALL USERS
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>LOGOUT</button>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <Button danger onClick={showDeleteUserWarningHandler}>Delete User</Button>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
