/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useMutation } from "react-query";

const buttonStyle = css`
  .back {
    border: 0;
    width: 27.5%;
    margin-right: 2.5%;
    height: 5vh;
    background-color: lightgray;
    cursor: pointer;
    font-weight: 900;
  }
  .apply {
    border: 0;
    width: 67.5%;
    margin-left: 2.5%;
    height: 5vh;
    background-color: #d23131;
    color: white;
    cursor: pointer;
    font-weight: 900;
  }
`;

function PurchaseApplicationBtn({ id }: { id?: string }) {
  const API = `https://carborn.site/api/user/car/buy/${id}`;

  const { mutate } = useMutation(
    () => {
      return axios({
        method: "post",
        url: API,
      });
    },
    {
      onError: (error: Error) => {
        console.error(error.message);
      },
    }
  );

  const goToBuy = () => {
    mutate();
  };

  return (
    <div css={buttonStyle}>
      <button className="back">뒤로가기</button>
      <button className="apply" onClick={goToBuy}>
        구매신청
      </button>
    </div>
  );
}

export default PurchaseApplicationBtn;
