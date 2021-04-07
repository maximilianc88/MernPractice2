import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlantList from '../components/PlantList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlants = () => {
  const [loadedPlants, setLoadedPlants] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/plants/user/${userId}`
        );
        setLoadedPlants(responseData.plants);
      } catch (err) {}
    };
    fetchPlants();
  }, [sendRequest, userId]);

  const plantDeletedHandler = deletedPlantId => {
    setLoadedPlants(prevPlants =>
      prevPlants.filter(plant => plant.id !== deletedPlantId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlants && (
        <PlantList items={loadedPlants} onDeletePlant={plantDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlants;

