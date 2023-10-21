import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';

export default function ShowTeam() {
  const [team, setTeam] = useState([]);
  const { user } = useAuth();

  const renderTeam = () => {
    getPlayers(user.uid).then(setTeam);
  };

  useEffect(() => {
    renderTeam();
  }, []);

  return (
    <div className="text-center my-4">
      <h1 id="header">Virginia Tech Hokies</h1>
      <div className="d-flex flex-wrap">
        {team.map((teams) => (
          <PlayerCard key={teams.firebaseKey} playerObj={teams} onUpdate={renderTeam} />
        ))}
      </div>
    </div>
  );
}
