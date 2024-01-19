import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";


const Img = styled.img`
  width: 2rem;
  margin-left: 1rem;
`;
const H2 = styled.h2`
  display: block;
  width: 90%;
  margin-left: 1.5rem;
`;
const Input = styled.input`
  display: block;
  width: 90%;
  height: 3rem;
  margin: 1rem auto;
  padding-left: 0.5rem;
  border-radius: 1rem;
  border: 1px solid gainsboro;
  background-color: whitesmoke;
  &:focus {
    outline: none;
  }
`;
const Div = styled.div`
  &.notice {
    width: 94%;
    margin-left: 1.5rem;
  }
  &.text {
    width: 90%;
    margin: 0 1.5rem;
    font-size: 0.9rem;
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
`;

export default function SignUp() {
  const { name, setName } = useUserContext();
  const navigate = useNavigate();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  return (
    <>
      <Link to="/">
        <Img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
          alt="뒤로가기"
        />
      </Link>
      <H2>이름 입력</H2>
      <Div className="text">
        친구들이 회원님을 찾을 수 있도록 이름을 추가하세요.
      </Div>
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="성명"
        onChange={handleChange}
      />
      <Button className="next" onClick={() => navigate("password/")}>
        다음
      </Button>
      <Button className="already" onClick={() => navigate("/")}>
        이미 계정이 있으신가요?
      </Button>
    </>
  );
}
