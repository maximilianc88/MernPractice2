import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Account.css";

const Account = () => {
  const auth = useContext(AuthContext);
  const [showConfirmDeleteUserModal, setShowConfirmDeleteUserModal] = useState(
    false
  );
  const [deletedUserID, setDeletedUserID] = useState();

  const { error, sendRequest, clearError } = useHttpClient();

  const showDeleteUserWarningHandler = () => {
    setDeletedUserID(auth.userId);
    setShowConfirmDeleteUserModal(true);
  };

  const cancelDeleteUserHandler = () => {
    setShowConfirmDeleteUserModal(false);
    setDeletedUserID();
  };

  const confirmDeleteUserHandler = async () => {
    console.log("Deleted user ID = " + deletedUserID);
    try {
      setShowConfirmDeleteUserModal(false);
      console.log("Deleting User Profile!");
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${deletedUserID}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setDeletedUserID();
    } catch (err) {};
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
            <Button danger onClick={confirmDeleteUserHandler}>
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
