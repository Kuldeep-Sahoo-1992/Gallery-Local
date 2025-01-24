import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getAllImages, getSingleImage } from '../../redux/reducers/gallerySlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional for blur effect
import "./Home.css"
export const Home = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllImages());
  }, []);

  const { images, categories } = useSelector((state) => state.gallery);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  const handleChangeCat = (id) => {
    setSelectedCategory(id); // Set the selected category
    dispatch(getSingleImage(id));
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const extractImageName = (fullName) => {
    const match = fullName.match(/-(.*)/);
    return match ? match[1] : fullName;
  };
  function extractAndFormatDate(fileName) {
    const [timestamp] = fileName.split("-");
    const date = new Date(parseInt(timestamp, 10));

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return { formattedDate, formattedTime };
  }
  const effects = [
    'invert(1)',
    'grayscale(1)',
    'sepia(1)',
    'contrast(2)',
    'brightness(1.5)',
    'hue-rotate(90deg)',
    'saturate(2)',
    'opacity(0.5)',
    // 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5))',
    'contrast(0.5)',
    // 'blur(10px)',
    'brightness(0.5)',
    'saturate(0.5)',
    'hue-rotate(180deg)',
    'sepia(0.5)',
    'grayscale(0.5)',
    'invert(0.5)',
    // 'brightness(2)',
  ];

  const [toggle, setToggle] = useState("stop")
  const [effect, setEffect] = useState('none');
  let randomEffect = "t"
  useEffect(() => {
    let interval;
    if (toggle === "start") {
      interval = setInterval(() => {
        randomEffect = effects[Math.floor(Math.random() * effects.length)];
        setEffect(randomEffect);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [toggle]);



  const applyEffect = (type) => {
    setEffect(type);
  };

  const h = () => {
    setSelectedCategory(null)
    dispatch(getAllImages())
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center my-4  justify-content-center align-items-start flex-column ${selectedCategory === null ? 'btn-danger' : 'btn-primary'}">
          <div className=" d-flex" style={{ flexWrap: "wrap" }}>
            <div className="d-flex  overflow-auto ">
              <button className={`btn btn-primary mx-1 my-2 ${selectedCategory === null ? 'btn-danger' : 'btn-primary'}`} onClick={() => h()}>All</button>

              {categories && categories.map((item, i) => (
                <button key={i} className={`btn btn-info mx-2 my-2 py-0 ${selectedCategory === item._id ? 'btn-danger' : 'btn-info'} `}
                  onClick={() => handleChangeCat(item._id)}

                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div
            className="gallery-grid mt-4"
            style={{
              display: 'flex',
              justifyContent: "center",
              flexWrap: "wrap",
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '5px',
            }}
          >
            {Array.isArray(images) && images.map((item) => {
              const isVideo = /\.(mp4|webm|ogg)$/i.test(item.name); // Check if the file is a video

              return (
                <div
                  key={item._id}
                  className="gallery-item "
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => openModal(item)}
                >
                  {isVideo ? (
                    <video
                      src={`https://gallery-local.onrender.com//${item.name}`}
                      controls
                      style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'contain',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onContextMenu={(e) => e.preventDefault()} // Prevent default context menu
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="image-container">

                      <LazyLoadImage
                        src={`https://gallery-local.onrender.com//${item.name}`}
                        alt="Gallery"
                        effect="blur" // Adds a blur effect while loading
                        style={{
                          width: '300px',
                          height: '300px',
                          objectFit: 'cover', // Ensures the image doesn't stretch
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        className='zoom-image'
                        onContextMenu={async (e) => {
                          e.preventDefault(); // Prevent the default context menu

                          const userConfirmed = window.confirm("Do you want to download this image?");
                          if (userConfirmed) {
                            try {
                              // Fetch the image as a blob
                              const response = await fetch(`https://gallery-local.onrender.com//${item.name}`);
                              const blob = await response.blob();

                              // Create a temporary link for downloading the blob
                              const link = document.createElement('a');
                              link.href = URL.createObjectURL(blob);
                              link.download = item.name; // Set the file name
                              document.body.appendChild(link);
                              link.click(); // Trigger the download
                              document.body.removeChild(link); // Clean up the link
                            } catch (error) {
                              console.error("Failed to download the image:", error);
                            }
                          }
                        }}
                      />
                    </div>

                  )}
                  <div className="d-flex gap-.5 w-75 ms-3">
                    {/* <h6 className="text-truncate" style={{ maxWidth: '200px', overflow: 'hidden' }} title={item.name}>
          {extractImageName(item.name)}
        </h6> */}
                    <p className="text-muted small mb-0 pl-2">
                      {extractAndFormatDate(item.name).formattedDate}
                    </p>
                    <p className="text-muted small mb-0 ms-3">
                      {extractAndFormatDate(item.name).formattedTime}
                    </p>
                  </div>
                </div>
              );
            })}



          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {selectedImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
          }}
          onClick={closeModal} // Close modal when clicking on the backdrop
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div
              className="modal-content"
              style={{
                background: "radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
              }}
            >
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                {/\.(mp4|webm|ogg)$/i.test(selectedImage.name) ? ( // Check if the file is a video
                  <video
                    src={`https://gallery-local.onrender.com//${selectedImage.name}`}
                    controls
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "80vh",
                      objectFit: "contain",
                      filter: effect, // Apply the selected effect
                      transition: "filter 0.3s ease-in-out", // Smooth transition
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={`https://gallery-local.onrender.com//${selectedImage.name}`}
                    alt="Selected"
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "80vh",
                      objectFit: "contain",
                      filter: effect, // Apply the selected effect
                      transition: "filter 0.3s ease-in-out", // Smooth transition
                    }}
                  />
                )}
                <h1>{randomEffect}</h1>
                <h4>{extractImageName(selectedImage.name)}</h4>
                <div className="d-flex gap-.5 w-75 ms-3 justify-between">
                  <p className="text-muted small mb-0 pl-2">
                    {extractAndFormatDate(selectedImage.name).formattedDate}
                  </p>
                  <p className="text-muted small mb-0 ms-3">
                    {extractAndFormatDate(selectedImage.name).formattedTime}
                  </p>
                </div>
                <div className="mt-3">
                  <h5>Image Effects</h5>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("none")}
                    >
                      Normal
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("invert(1)")}
                    >
                      Invert
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("grayscale(1)")}
                    >
                      Grayscale
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("sepia(1)")}
                    >
                      Sepia
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("contrast(2)")}
                    >
                      High Contrast
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("blur(5px)")}
                    >
                      Blur
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("brightness(1.5)")}
                    >
                      Brightness
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => applyEffect("hue-rotate(90deg)")}
                    >
                      Hue Rotate
                    </button>
                  </div>
                </div>
              </div>
              <button
                className={`btn  w-25 m-auto mb-2 bg-${toggle === "start" ? "danger" : "success"
                  }`}
                onClick={() => setToggle(toggle === "start" ? "stop" : "start")}
              >
                {toggle === "start" ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
