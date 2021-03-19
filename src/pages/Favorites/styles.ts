import styled from 'styled-components';

export const Movies = styled.div`
  margin-top: 80px;
  max-width: 700px;
`;

export const Movie = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;

  display: flex;
  align-items: center;
  transition: transform 0.2s;

  & + div {
    margin-top: 16px;
  }

  &:hover {
    transform: translateX(10px);
  }

  img {
    width: 120px;
  }

  div {
    margin: 0 16px;
    flex: 1;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }

  button {
    border: 0;
    background: transparent;

    svg {
      margin-left: auto;
      color: #3939a2;
      fill: #3939a2;
    }
  }
`;
