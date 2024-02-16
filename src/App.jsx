import { useEffect, useRef, useState } from "react";
import camera from "./assets/camera.svg";
import deleted from "./assets/delete.svg";

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((strem) => {
        let video = videoRef.current;
        video.srcObject = strem;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const takePhoto = () => {
    const width = 464;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };
  const deletePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };
  function cencelClick() {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="container">
      <button
        className="btn btn-secondary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Take a picture
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={cencelClick}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="App">
            <div className="camera">
              <video ref={videoRef}></video>
            </div>
            <div className={`result ${hasPhoto ? "hasPhoto" : ""}`}>
              <canvas ref={photoRef}></canvas>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center mt-4">
            <button onClick={takePhoto} className="btn">
              <img src={camera} alt="camera" />
            </button>
            <button onClick={deletePhoto} className="btn">
              <img src={deleted} alt="delete" />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default App;
