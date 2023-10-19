import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';

const initialState = {
  first_name: '',
  last_name: '',
  position: '',
  image: '',
  height: '',
  weight: '',
};

export default function PlayerForm({ playerObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (playerObj.firebaseKey) setFormInput(playerObj);
  }, [playerObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerObj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5">{playerObj.firebaseKey ? 'Update' : 'Add'} Player</h1>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Player First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter player first name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Player Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a last name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* POSITION INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Player Position" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter player position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter player image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* HEIGHT INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Player Height" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter player height"
          name="height"
          value={formInput.height}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* WEIGHT INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Player Weight" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter player weight"
          name="weight"
          value={formInput.weight}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{playerObj.firebaseKey ? 'Update' : 'Add'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  playerObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  playerObj: initialState,
};
