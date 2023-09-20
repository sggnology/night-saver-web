import React, {useState} from 'react';
import axios from "axios";

function VideoCamera() {
    const [source, setSource] = useState("");
    const [sourceFile, setSourceFile] = useState(null);
    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                setSourceFile(file);
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
            }
        }
    };

    const extractCarNumberFromImage = () => {
        const isConfirmed = window.confirm("이미지를 통해 차량 번호를 추출하시겠습니까?");

        if(isConfirmed) {
            const url = `${process.env.REACT_APP_API_URL}/api/v1/car-number`;
            const formData = new FormData();
            formData.append("carNumberImageFile", sourceFile);

            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }

            axios.post(url, formData, config)
                .then((res) => {
                    alert(res.data);
                }).catch((err) => {
                    console.error(err);
                    alert("요청 실패");
                });
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

            {source && <button onClick={extractCarNumberFromImage}>번호 추출</button>}
        </div>
    );
}

export default VideoCamera;