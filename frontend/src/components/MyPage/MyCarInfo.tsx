import axios from "axios";
import { API_URL } from "./../../lib/loginApi";
import { useState, useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 스타일 시트를 import 해야함

import Nav from './../Nav';
import MyCarDataComponent from './TableComponent/MyCarDataComponent';

// CarStatus 이미지 import 해오기
import carousel1 from '../../assets/carouselTest/CarStatus1.jpg';
import carousel2 from '../../assets/carouselTest/CarStatus2.jpg';
import carousel4 from '../../assets/carouselTest/CarStatus4.jpg';
import carousel5 from '../../assets/carouselTest/CarStatus5.jpg';
import carousel7 from '../../assets/carouselTest/CarStatus7.jpg';
import carousel8 from '../../assets/carouselTest/CarStatus8.jpg';
import carousel9 from '../../assets/carouselTest/CarStatus9.jpg';
import carousel10 from '../../assets/carouselTest/CarStatus10.jpg';
import styled from '@emotion/styled';

// 캐러셀 CSS

const StyleMyCarInfo = styled.div`

  .carousel-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide img {
    width: 50%;
    object-fit: contain;
  }

  .modal {
  position: fixed;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
}

.modal-content {
  width: 100%;
  height: 100%;

  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;
  }
}

.carousel-root {
  width: 50%;
  margin-top: 2rem !important;
  margin-left: 2rem !important;
}
`;

const StyleMyCarInfoContainer = styled.div`
  display: flex;
  align-items: center;
`

const MyCarInfo = () => {
  const imageUrl = `${API_URL}/imgurl`;
  // const [imageUrls, setImageUrls] = useState<string>(imageUrl);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // 서버에서 이미지 가져와서 처리하기
  // const getImage = async (url: string) => {
  //   try {
  //     const response = await axios.get(url, {
  //       responseType: "arraybuffer",
  //     });
  //     const blob = new Blob([response.data], {
  //       type: response.headers["content-type"],
  //     });
  //     const imageUrl = URL.createObjectURL(blob);
  //     return imageUrl;
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // };

  // const [images, setImages] = useState<string[]>([]);
  // 특정 이미지의 경로를 모두 가져온다.
  // useEffect(() => {
  //   const getImages = async () => {
  //     const imageList: string[] = [];
  //     for (let i = 0; i < imageUrls.length; i++) {
  //       if (imageUrls[i]) {
  //         const imageUrl: string | undefined = await getImage(imageUrls[i]);
  //         if (imageUrl) {
  //           imageList.push(imageUrl);
  //         }
  //       }
  //     }
  //     setImages(imageList);
  //   };
  //   getImages();
  // }, [imageUrls]);

  const [images, setImages] = useState<any[]>([
    carousel1,
    carousel2,
    carousel4,
    carousel5,
    carousel7,
    carousel8,
    carousel9,
    carousel10,
  ]);

  return (
    <StyleMyCarInfo>
      <Nav/>
      <StyleMyCarInfoContainer>
        <Carousel transitionTime={1000}>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(image);
                setShowModal(true);
              }}
            >
              <img
                src={image}
                alt={`${index}`}
              />
              <p className="legend">{index + 1}. 내 차량 정보</p>
            </div>
          ))}
        </Carousel>
        {showModal && (
          <div className="modal" >
            <div className="modal-content" onClick={() => setShowModal(false)}>
              <img src={selectedImage} alt="modal" />
            </div>
          </div>
        )}
        <MyCarDataComponent/>
      </StyleMyCarInfoContainer>
    </StyleMyCarInfo>
  );
};

export default MyCarInfo;
