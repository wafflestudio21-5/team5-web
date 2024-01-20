import { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

interface InputProps {
  isvalid: boolean;
  type: string; // 여기서 실제로 사용하는 타입으로 변경하세요 (예: 'text', 'password' 등)
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Img = styled.img`
  &.back {
    width: 2rem;
    margin-left: 1rem;
  }
  &.X {
    width: 2rem;
    margin: 1rem 0 0 1rem;
  }
`;
const H2 = styled.h2`
  display: block;
  width: 90%;
  margin-left: 1.5rem;
`;
const Input = styled.input<InputProps>`
  display: block;
  width: 90%;
  height: 3rem;
  margin: 1rem auto;
  border-radius: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: 1px solid ${({ isvalid }) => (isvalid ? "gainsboro" : "red")};
  background-color: whitesmoke;
  &:focus {
    outline: none;
  }
`;
const Div = styled.div`
  &.text {
    width: 90%;
    margin: 0 1.5rem;
    font-size: 0.9rem;
  }
  &.notice {
    width: 90%;
    margin-top: -0.5rem;
    margin-left: 1.5rem;
    font-size: 0.7rem;
    color: red;
  }
  &.background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &.modal {
    position: absolute;
    width: 100%;
    height: 80%;
    bottom: 0;
    border-radius: 2rem 2rem 0 0;
    background-color: white;
  }
  &.grayBar {
    position: relative;
    margin: 0.5rem auto;
    background-color: gainsboro;
    width: 3rem;
    height: 0.3rem;
    border-radius: 0.2rem;
  }
`;
const Button = styled.button`
  &.next {
    display: block;
    margin: 1rem auto;
    width: 93%;
    height: 2.5rem;
    border-radius: 1.2rem;
    border: none;
    background-color: blue;
    color: white;
  }
  &.already {
    display: block;
    width: 90%;
    position: fixed;
    left: 5%;
    bottom: 1rem;
    border: none;
    background-color: white;
    color: blue;
  }
  &.X {
    border: none;
    background-color: transparent;
  }
`;
const Span = styled.span`
  color: blue;
`;
const A = styled.a`
  text-decoration: none;
  color: blue;
`;

export default function AskBirthday() {
  const { birthday, setBirthday } = useUserContext();
  const [isValid, setIsValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (birthday.getFullYear() < 2022) {
      navigate("/signUp/username");
      setIsValid(true);
    } else setIsValid(false);
  };
  return (
    <>
      <Link to="/signUp/save">
        <Img
          className="back"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
          alt="뒤로가기"
        />
      </Link>
      <H2>생년월일 입력</H2>
      <Div className="text">
        비즈니스, 반려동물 또는 기타 목적으로 이 계정을 만드는 경우에도 회원님의
        실제 생년월일을 사용하세요. 이 생년월일 정보는 회원님이 공유하지 않는 한
        다른 사람에게 공개되지 않습니다.{" "}
        <Span className="why" onClick={() => setIsModalOpen(true)}>
          왜 생년월일을 입력해야 하나요?
        </Span>
      </Div>
      <Input
        isvalid={isValid}
        type="date"
        value={birthday.toISOString().split("T")[0]}
        placeholder="생년월일"
        onChange={(e) => setBirthday(new Date(e.target.value))}
      />
      {!isValid && (
        <Div className="notice">
          잘못된 정보를 입력한 것 같습니다. 실제 생일을 입력해주세요.
        </Div>
      )}
      <Button className="next" onClick={handleClick}>
        다음
      </Button>
      <Button className="already" onClick={() => navigate("/")}>
        이미 계정이 있으신가요?
      </Button>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}

function Modal(props: { setIsModalOpen: (b: boolean) => void }) {
  const { setIsModalOpen } = props;
  const modalBackground = useRef<HTMLDivElement>(null);
  return (
    <Div
      className="background"
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          setIsModalOpen(false);
        }
      }}
    >
      <Div className="modal">
        <Div className="grayBar"></Div>
        <Button className="X" onClick={() => setIsModalOpen(false)}>
          <Img
            className="X"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///8AAABbW1teXl5YWFhPT09UVFRVVVXq6upOTk7BwcGRkZHu7u4dHR3e3t49PT2Xl5fIyMhkZGQKCgpPrCJfAAADp0lEQVR4nO2dCXqjMAyFQ7plsraZ+991SvncCcECA5Ijvbz/ADxsSZYMXjYbQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEkMdz3FUW3B1rqu23zTenQ61W7g6nVnC7r6R3vjSJzyqCn796l3MNva/mhmsFweut4Je93rnp8WouuO0L2lvx0hds3oz13u70LsZ6m31zj60VXwd61sPNdqDYbA3lXurKtQwVm+bDTG1owW/M1H445iTNYvE9q2ab+ndZTSPPybhoi3GdkRc1aaLQQGMv3ZwEWX1HvU8TiZO6Up+DoKs+3GQHmZaDstA9QiA22o4quah5GN6Wwfdopn7RgjWK/asorheLUgzWKfVzZY2yFe0VJsgn4hadWJRj0LrM/0Xu43eFp8sxWMmCLZa9bO0hhcj9vPY15M6zK/CzyD29zpUcxOD0q/xZ8VQnLtph4U52zr8I/f525KIdco8vs6KchCoPMv/RjUVXMZjQLK8eXqrl0et3dzGYkHt+3ot9+LRgi9z3c2pUuYEPjMGERg7T6SYz1juYlqubsTZpuEwTfeQmllhRtqCbBq6zgts00Wd5Aadd+pmxNBYDxGBiWTSti+DKLLFGkBhMzH9dq08hZsytTJzN6EuYV106L9XyzCngbD8rm1Eei4HSRJ/SmbrTGX0JZbYJlib6lMSXi58vy5m2T9gYTEzlOTc/X5YzXquEjsHEWCPCu2iH3ESZUA0cc1TZusGQh5s8rku1PPMcNZiLdsipf0iIRD+kPBbDxWCi1IpBLdhSFoshYzBRMqIGHEVvmY7FsDGYmHLU0C7aMd5EgAaOO2p4F+34K7fw0a+mA7wNx+MwcLJPwI+l8PkQvqaBr0vh5xbw80P4OT78dxr4b23w30vhv3nD/7cYb4TNbpuqwP8/hP8HDP8ff+1aDPexCL+eBn5NFPy6Nq21iW4LOPj1pfN3vgRbI6y7ztth0tBeq++ugFs6bIRJGvB7Zmz2PTmKRau9a25G1LWp230srs9qzveQwu8Dht/LrTVDcLsfH/5MBc2B3uVmS91+d5g0tL+YuZv1w58xBH9OlE1/O4pFq1dx46jwZ+5Z9rSLAg7+7Ev480vhz6CFP0e4zlnQshXNz4LGP88b/0z2eufqSyO29bn6gizO3Qj491vg31GCf8/ME9wVVPu+p2GPml8vB39n1xPcu4Z/d94T3H+4wb/D8gfwe0gJIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCBP4BAyMhUrpvY7EAAAAASUVORK5CYII="
            alt="X"
          />
        </Button>
        <H2>생일</H2>
        <Div className="text">
          생년월일을 입력하면 회원님에게 제공되는 기능 및 광고가 개선되면
          Instagram 커뮤니티를 안전하게 유지하는 데 도움이 됩니다. 입력한
          생년월일 정보는 개인 정보 계정 설정에서 확인할 수 있습니다.
          <A href="https://privacycenter.instagram.com/"> 더 알아보기</A>
        </Div>
      </Div>
    </Div>
  );
}
