import React, {useState} from 'react';
import SelectForArray from "../select/SelectForArray";
import axiosInstance from "../../../config/api/AxiosInstance";
import Loading from "../loading/Loading";

function PhotoCamera() {
  const [carNumberGuessLoading, setCarNumberGuessLoading] = useState(false);

  const [source, setSource] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [carNumberGuessStatus, setCarNumberGuessStatus] = useState(false); // [true, false
  const [carNumberGuessResult, setCarNumberGuessResult] = useState([]);

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
    const path = `/api/v1/car-number`;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // 요청 헤더를 multipart/form-data로 설정
        'Cache-Control': 'no-cache',
      }
    }
    const formData = new FormData();
    formData.append("carNumberImageFile", imageFile);

    try {
      setCarNumberGuessStatus(false);
      setCarNumberGuessLoading(true);
      setCarNumberGuessResult([]);

      axiosInstance.post(path, formData, config)
        .then((response) => {
          setCarNumberGuessStatus(true);
          setCarNumberGuessLoading(false);
          setCarNumberGuessResult(response.data.carPlateCandidates);
        });
    } catch (error) {
      setCarNumberGuessStatus(true);
      setCarNumberGuessLoading(false);
      setCarNumberGuessResult([]);
      alert(error);
    }
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
      {
        carNumberGuessResult.length !== 0 ? <SelectForArray options={carNumberGuessResult}/> :
        carNumberGuessStatus ? <h5>차량 번호판 추측에 실패하였습니다.</h5> : <></>
      }

      <Loading isLoading={carNumberGuessLoading}/>
    </div>
  );
}

export default PhotoCamera;