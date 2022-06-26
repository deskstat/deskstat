import styled, { keyframes, css } from 'styled-components';

import { PomodoroClockBG } from './PomodoroClockBG';
import { Text } from './Text';
import { getFormattedTime } from '../utils';

const animateHeart = keyframes`
   0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.9);
  }
`;

const Wrapper = styled.div<{ isAnimationOn: boolean }>`
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${({ isAnimationOn }) =>
    isAnimationOn &&
    css`
      animation: 0.5s ease-in 0s infinite alternate none running ${animateHeart};
    `};
`;

interface Props {
  bgBottomFill?: string;
  bgMiddleFill?: string;
  bgTopFill?: string;
  time?: number;
}

export const PomodoroClock = ({
  bgBottomFill,
  bgMiddleFill,
  bgTopFill,
  time = 0,
}: Props) => {
  const { hours, minutes, seconds } = getFormattedTime(time);
  return (
    <Wrapper isAnimationOn={time > 0}>
      <PomodoroClockBG
        bgBottomFill={bgBottomFill}
        bgMiddleFill={bgMiddleFill}
        bgTopFill={bgTopFill}
        isRotateOn={time > 0}
      />
      <span>
        <Text variant="h2">{`${hours}:${minutes}:${seconds}`}</Text>
      </span>
    </Wrapper>
  );
};
