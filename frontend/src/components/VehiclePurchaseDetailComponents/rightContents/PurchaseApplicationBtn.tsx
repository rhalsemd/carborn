/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useAPI } from "../../../hooks/useAPI";

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

const dialog = css`
  box-shadow: 0 14px 28px rgba(255, 0, 0, 0.25),
    0 10px 10px rgba(255, 0, 0, 0.22);
  border: 0;
  text-align: center;
  border-radius: 10px;
  padding: 20px 50px 10px 50px;
  width: 20%;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .userInfoBox {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 4%;
    width: 60%;
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 10vh;
    }
  }
`;

const closeBtn = css`
  width: 20%;
  height: 4vh;
  border: 2px solid black;
  background-color: white;
  color: black;
  border-radius: 10px;
  font-weight: 900;
  top: 90%;
  margin-left: 85%;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

interface DataType {
  accountId: string;
  accountName: string;
  accountPhoneNo: string;
  id: string;
}

const SIZE: number = 5;

function PurchaseApplicationBtn({ id }: { id?: string }) {
  const [page, setPage] = useState<number>(1);
  const modalRef = useRef<HTMLDialogElement>(null);

  const API = `https://carborn.site/api/user/car/buy/${id}`;
  const USER_LIST_API = `https://carborn.site/api/user/car/sale/sell/${id}/${page}/${SIZE}`;
  const getApplyUserList = useAPI("get", USER_LIST_API);

  const { data } = useQuery<any, AxiosError>(
    "get-apply-user-list",
    () => getApplyUserList,
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      cacheTime: 0,
      staleTime: 0,
      select: (data) => {
        return data.data.message.content;
      },
    }
  );

  console.log(data);

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

  const showModal = () => {
    modalRef?.current?.showModal();
  };

  return (
    <div css={buttonStyle}>
      <button className="back">뒤로가기</button>
      <button className="apply" onClick={goToBuy}>
        구매신청
      </button>
      <button className="apply" onClick={showModal}>
        신청자 목록
      </button>
      <dialog ref={modalRef} css={dialog}>
        <div css={{ display: "flex", justifyContent: "center" }}>
          {data?.map((userInfo: DataType) => {
            return (
              <div className="userInfoBox">
                <div className="text">
                  <div css={{ color: "#696465" }}>
                    {userInfo.accountPhoneNo}
                  </div>
                  <div
                    css={{
                      fontSize: "1.5rem",
                      color: "white",
                      marginBottom: "5%",
                    }}
                  >
                    {userInfo.accountName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form method="dialog">
          <button value="close" css={closeBtn}>
            Close
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default PurchaseApplicationBtn;
