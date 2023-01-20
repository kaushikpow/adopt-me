import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  //details is the cache name and we are passing id as the parameter. If it is availbale in the cache, control will not
  //go to the fetchPet component.

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🔃</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.animal}</h1>
        <h2>
          {pet.animal} - {pet.breed}- {pet.city},{pet.state}
          <button onClick={() => setShowModal(true)}> Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1> Would you like to adopt {pet.name}</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details></Details>
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
