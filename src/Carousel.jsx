// import { useState } from "react";
// const Carousel = ({ images }) => {
//   const [active, setActive] = useState(0);

//   function handleIndexClick(event) {
//     console.log(event.target.dataset.index);
//     setActive(parseInt(event.target.dataset.index));
//   }

//   throw new Error("Lol Error");
//   return (
//     <div className="carousel">
//       <img src={images[active]} alt="animal" />
//       <div className="carousel-smaller">
//         {images.map((photo, index) => (
//           //eslint-disable-next-line
//           <img
//             key={photo}
//             src={photo}
//             className={index === active ? "active" : ""}
//             alt="animal thumbnail"
//             onClick={handleIndexClick}
//             data-index={index}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;

// EQUIVALENT CLASS COMPONENT CODE BELOW

import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  //COMPULSORY TO WRITE THE HADLING EVENT AS ARROW FUNCTION

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
