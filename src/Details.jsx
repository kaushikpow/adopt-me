import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
const Details = () => {
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
          <button> Adopt {pet.name}</button>
          <p>{pet.description}</p>
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
