import React, {useState} from 'react';
import axios from "axios";

function VideoCamera() {
  const [source, setSource] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        setImageFile(file);
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  const guessCarNumberImage = () => {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/car-number`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data', // 요청 헤더를 multipart/form-data로 설정
      }
    }
    const formData = new FormData();
    formData.append("carNumberImageFile", imageFile);

    axios.post(url, formData, config)
      .then((response) => {
        alert(response)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div>
      {source && <img src={source} alt={"snap"} width='500' height='500'></img>}

      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
      />

      {source && <button onClick={guessCarNumberImage}>번호 추측</button>}
    </div>
  );
}

export default VideoCamera;