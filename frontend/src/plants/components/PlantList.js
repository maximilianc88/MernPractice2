import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlantItem from './PlantItem';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';
// import plant from '../../../../backend-for-reals/models/plant';

const PlantList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No plants found. Maybe create one?</h2>
          <Button to="/plants/new">Share Plant</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(plant => (
        <PlantItem
          key={plant.id}
          id={plant.id}
          image={plant.image}
          title={plant.title}
          description={plant.description}
          creatorId={plant.creator}
          onDelete={props.onDeletePlant}
        />
      ))}
    </ul>
  );
};

export default PlantList;
