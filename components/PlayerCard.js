import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deletePlayer = () => {
    if (window.confirm(`Delete ${playerObj.first_name} ${playerObj.last_name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{playerObj.first_name} {playerObj.last_name}</Card.Title>
        <Card.Title>{playerObj.position}</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.last_name} />
      <Card.Body>
        <p className="card-text bold">Height: {playerObj.height}</p>
        <p className="card-text bold">Weight: {playerObj.weight} lbs.</p>
      </Card.Body>
      <Card.Footer>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deletePlayer} className="m-2">
          DELETE
        </Button>
      </Card.Footer>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.number,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
