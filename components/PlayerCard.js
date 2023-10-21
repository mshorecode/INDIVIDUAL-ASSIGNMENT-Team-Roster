/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { RiDeleteBinLine, RiEditBoxLine } from 'react-icons/ri';
import { deleteSinglePlayer } from '../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deletePlayer = () => {
    if (window.confirm(`Delete ${playerObj.first_name} ${playerObj.last_name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ margin: '40px' }}>
      <Card.Body id="title">
        <Card.Title id="name">{playerObj.first_name} {playerObj.last_name}</Card.Title>
        <Card.Title id="position">{playerObj.position}</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.last_name} />
      <Card.Body>
        <div id="player-stats">
          <div id="height">
            <p className="card-text bold">Height: {playerObj.height}</p>
          </div>
          <p className="card-text bold">Weight: {playerObj.weight} lbs.</p>
        </div>
        <div className="buttons">
          <div id="btnGroup1">
            <Link href={`/player/edit/${playerObj.firebaseKey}`} style={{ margin: '10px' }} passHref>
              <RiEditBoxLine />
            </Link>
          </div>
          <div id="btnGroup2">
            <RiDeleteBinLine onClick={deletePlayer} />
          </div>
        </div>
      </Card.Body>
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
