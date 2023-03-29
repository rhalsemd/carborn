import styled from "@emotion/styled";
import Nav from "./../../Nav";

// CarStatus 이미지 import 해오기
import carousel1 from "../../../assets/carousel/CarStatus1.jpg";
import carousel2 from "../../../assets/carousel/CarStatus2.jpg";
import carousel4 from "../../../assets/carousel/CarStatus4.jpg";
import carousel5 from "../../../assets/carousel/CarStatus5.jpg";
import carousel7 from "../../../assets/carousel/CarStatus7.jpg";
import carousel8 from "../../../assets/carousel/CarStatus8.jpg";
import carousel9 from "../../../assets/carousel/CarStatus9.jpg";
import carousel10 from "../../../assets/carousel/CarStatus10.jpg";

// 캐러셀
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 스타일 시트를 import 해야함

// CarStatus 이미지 import 해오기
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const StyleMyCarInfoDetailDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyCarInfoDetailContainerDiv = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  width: 80%;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 3rem;
`;

const StyleMyCarInfoDetailTitleDiv = styled.div`
  width: 50%;
  height: 5rem;
  border-bottom: 2px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 2rem;
    font-weight: 900;
  }
`;

const StyleMyCarInfoCarousels = styled.div`
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

export type insuranceResultType = {
  setInspectorResult: React.SetStateAction<any[]>;
  inspectorResult: any;
};

const MyCarInfoDetail = () => {
  const param = useParams();
  const carId = param.carId;

  const location = useLocation();
  const detail = location.state;
  const [carouselImg, setCarouselImg] = useState<any[]>([]);

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

  // 이미지 모달 키우기
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    // 배열 받는다 치고
    setCarouselImg(detail.images);
  }, []);

  return (
    <StyleMyCarInfoDetailDiv>
      <Nav />
      <StyleMyCarInfoDetailContainerDiv>
        <StyleMyCarInfoDetailTitleDiv>
          <span>정비(검수) 상세 내역</span>
        </StyleMyCarInfoDetailTitleDiv>
        {/* 디테일 정보  */}
        <table>
          <thead>
            <tr>
              <th>차량모델</th>
              <th>제조사</th>
              <th>{`주행거리(km)`}</th>
              <th>차량번호</th>
              <th>{`연식(년)`}</th>
              <th>보험종류</th>
              <th>보험처리일자</th>
              <th>내역등록일자</th>
              <th>보험사명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.carModel}</td>
              <td>{detail.manufacturer}</td>
              <td>{detail.mileage}</td>
              <td>{detail.plateNumber}</td>
              <td>{detail.year}</td>
              <td>{detail.insuranceType}</td>
              <td>
                {detail.insuranceProcessedDate === null
                  ? "-"
                  : detail.insuranceProcessedDate}
              </td>
              <td>
                {detail.registrationDate === null
                  ? "-"
                  : detail.registrationDate}
              </td>
              <td>{detail.insuranceCompany}</td>
            </tr>
          </tbody>
        </table>
        {/* 검수 전 이미지, 검수 후 이미지, 견적서 이미지 */}
        <table>
          <thead>
            <tr>
              <th>견적서</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* 이미지 받아오기 images를 carImages로 수정하기 */}
                  <Carousel transitionTime={1000}>
                    {images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedImage(image);
                          setShowModal(true);
                        }}
                      >
                        <img src={image} alt={`${index}`} />
                        <p className="legend">{index + 1}. 내 차량 정보</p>
                      </div>
                    ))}
                  </Carousel>
                {showModal && (
                  <StyleMyCarInfoCarousels>
                    <div className="modal">
                      <div
                        className="modal-content"
                        onClick={() => setShowModal(false)}
                      >
                        <img src={selectedImage} alt="modal" />
                      </div>
                    </div>
                  </StyleMyCarInfoCarousels>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </StyleMyCarInfoDetailContainerDiv>
    </StyleMyCarInfoDetailDiv>
  );
};

export default MyCarInfoDetail;
