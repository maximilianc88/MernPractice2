import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Account.css";

const Account = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmDeleteUserModal, setShowConfirmDeleteUserModal] = useState(
    false
  );

  const { error, sendRequest, clearError } = useHttpClient();

  const showDeleteUserWarningHandler = () => {
    setShowConfirmDeleteUserModal(true);
  };

  const cancelDeleteUserHandler = () => {
    setShowConfirmDeleteUserModal(false);
  };

  // In production, Cache & Cookies or local storage appears to be sometimes preventing the delete API call from running.
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
    } catch (err) {}
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
            <Button inverse onClick={cancelDeleteUserHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmAndDelete}>
              DELETE USER PROFILE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this user profile? Please note that it
          can't be undone therafter.
        </p>
      </Modal>
      <Card className="account_card">
        <h2>Delete Account:</h2>
        <Button danger type="submit" onClick={showDeleteUserWarningHandler}>
          CONFIRM
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Account;
