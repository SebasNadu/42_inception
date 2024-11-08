import { useState, useRef, RefObject } from "react";
import galaxie from "./assets/galaxie.webp";
import { Input, Button } from "@nextui-org/react";
import { useAnimationFrame } from "framer-motion";
import "./App.css";

function useCubeAnimation(
  ref: RefObject<HTMLDivElement>,
  isActive: boolean,
): void {
  useAnimationFrame((t) => {
    if (isActive && ref.current) {
      const rotate = Math.sin(t / 10000) * 200;
      const y = (1 + Math.sin(t / 1000)) * -50;
      ref.current.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });
}

type HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

function App() {
  const ref_me = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useCubeAnimation(ref_me, isActive);

  const handleInputChange: HandleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    if (!inputValue.length) {
      setIsInvalid(true);
      return;
    } else setIsInvalid(false);
    setIsActive(true);
  };

  return (
    <>
      <div className="w-screen h-screen relative dark">
        {!isActive ? (
          <div className="absolute h-full w-full flex flex-col justify-center items-center">
            <h1>42 Inception</h1>
            <p>by johnavar</p>
            <div className="w-6/12 py-10 flex flex-col gap-4">
              <Input
                type="name"
                label="Please enter your name"
                isInvalid={isInvalid}
                onChange={handleInputChange}
              ></Input>
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={handleClick}
              >
                Click me!
              </Button>
            </div>
          </div>
        ) : (
          <div className="absolute h-full w-full flex flex-col justify-center items-center">
            <div className="z-50 m-2 text-center text-2xl text-ellipsis">
              <h1>
                Thank you <strong className="uppercase">{inputValue}</strong> to
                evaluate my project
              </h1>
              <h1>I hope you enjoy it!</h1>
            </div>
            <div className="">
              <div className="container">
                <div className="cube" ref={ref_me}>
                  <div className="side front" />
                  <div className="side left" />
                  <div className="side right" />
                  <div className="side top" />
                  <div className="side bottom" />
                  <div className="side back" />
                </div>
              </div>
            </div>
          </div>
        )}
        <img
          src={galaxie}
          alt="galaxie"
          className="w-full h-full object-cover"
        ></img>
      </div>
    </>
  );
}

export default App;
