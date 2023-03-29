import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  userSmsAuthAction,
  userverificationNumber,
} from "../../../../modules/verificationNumberModule";

const ModalWrapper = styled.div<ModalWrapperProps>`
  display: ${(props) => (props.open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 50%;
  border-radius: 5px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VerifyNumberTitleDiv = styled.div`
  border-bottom: 1px solid red;
  text-align: center;
  width: 70%;

  p {
    font-weight: 900;
    font-size: large;
  }
`;

const VerifyNumberContentDiv = styled.div`
  width: 70%;
  padding-top: 1rem;
  padding-bottom: 1rem;

  display: flex;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 3rem;

    input {
      border: 1px solid #cdcdcd86;
      height: 2.5rem;
      width: 80%;
    }

    span {
      display: inline-block;
      margin-left: 0.5rem;
    }
  }

  button {
    width: 30%;
    margin-left: 2%;
    border: 1px solid #d23131;
    background-color: white;
    font-size: 1rem;
  }

  button:hover,
  :focus {
    width: 30%;
    margin-left: 2%;
    background-color: #d23131;
    color: white;
    font-size: 1rem;
  }
`;

const VerifyNumberButtonDiv = styled.div`
  width: 70%;
  height: 3rem;
  display: flex;
  justify-content: center;

  .closeButton {
    width: 20%;
    border: 1px solid #d23131;
    background-color: white;
    font-size: 1rem;
  }

  .closeButton:hover,
  :focus {
    width: 20%;
    background-color: #d23131;
    color: white;
    font-size: 1rem;
  }

  .verifyButton {
    width: 78%;
    margin-left: 2%;
    border: 1px solid #d23131;
    background-color: white;
    font-size: 1rem;
  }

  .verifyButton:hover,
  :focus {
    width: 78%;
    background-color: #d23131;
    color: white;
    font-size: 1rem;
  }
`;

// 타입지정
export interface SignUpUserPhoneNumberModalProps {
  open: boolean;
  onClose: () => void;
  phoneNumber: any;
  setIsValid: any;
  isValid: boolean;
}

export interface ModalWrapperProps {
  open: boolean;
  onClick: () => void;
}

const SignUpUserPhoneNumberModal: React.FC<SignUpUserPhoneNumberModalProps> = ({
  open,
  onClose,
  phoneNumber,
  setIsValid,
  isValid,
}) => {
  const selector = useSelector(
    (state: any) => state.verificationNumberReducer.certificatedNum
  );
  const isVerification = useSelector((state:any) => state.verificationNumberReducer)
  console.log(isVerification)
  const [inputValue, setInputValue] = useState("");
  const [countdown, setCountdown] = useState(180);
  const [countdownInterval, setCountdownInterval] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isButtonValid, setIsButtonValid] = useState(true);
  const dispatch = useDispatch();

  // 인증번호 발송버튼
  const handleSendVerifyRequest = (phoneNumber: string) => {
    dispatch(userverificationNumber(phoneNumber));

    if (isValid) return;
    setCountdown(180);
    clearInterval(countdownInterval!);

    // 카운트 다운 관련 코드
    setCountdownInterval(
      setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval!);
            setIsButtonValid(false);
            setIsValid(false);
            return 0;
          } else if (prevCountdown <= 0) {
            clearInterval(countdownInterval!);
            return prevCountdown;
          }
          return prevCountdown - 1;
        });
      }, 1000)
    );
  };

  // 그냥 닫을 때,
  const handleClose = () => {
    setInputValue("");
    setCountdown(180);
    setIsButtonValid(false);
    setIsValid(true);
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    onClose();
  };

  // 인증확인 버튼
  const handleVerifyCheck = ({ phoneNumber, inputValue }: any) => {
    const payload = { phoneNumber, inputValue };
    dispatch(userSmsAuthAction(payload));
    if (selector === inputValue || !isButtonValid) {
      setIsButtonValid(true);
      setIsValid(true);
      setInputValue("");
      onClose();
    } else {
      setIsButtonValid(false);
      setIsValid(false);
    }
  };

  // 시간 형식 바꾸기
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  //input값이 바껴
  const handleChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (selector === inputValue) {
      setIsButtonValid(true);
    } else if (selector !== inputValue && inputValue === "") {
      setIsButtonValid(false);
      setIsValid(false);
    } else {
      setIsValid(false);
    }
  }, [inputValue, selector, setIsButtonValid, setIsValid]);

  return (
    <ModalWrapper open={open} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <VerifyNumberTitleDiv>
          <p>인증번호</p>
        </VerifyNumberTitleDiv>
        <VerifyNumberContentDiv>
          <div>
            <input
              tabIndex={10}
              type="text"
              id="userverifynumber"
              autoComplete="off"
              placeholder="  인증번호를 입력해주세요"
              maxLength={6}
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value)
              }
            />
            <span>{formatTime(countdown)}</span>
          </div>
          <button
            tabIndex={9}
            onClick={() => handleSendVerifyRequest(phoneNumber)}
            disabled={isButtonValid}
          >
            발송
          </button>
        </VerifyNumberContentDiv>
        <VerifyNumberButtonDiv>
          <button tabIndex={12} className="closeButton" onClick={handleClose}>
            닫기
          </button>
          <button
            tabIndex={11}
            className="verifyButton"
            onClick={() => handleVerifyCheck({ phoneNumber, inputValue })}
            disabled={!isButtonValid}
          >
            인증확인
          </button>
        </VerifyNumberButtonDiv>
      </ModalContent>
    </ModalWrapper>
  );
};

export default SignUpUserPhoneNumberModal;
