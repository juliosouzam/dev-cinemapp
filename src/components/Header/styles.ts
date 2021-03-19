import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #4a4a4e;
    transition: color 0.2s ease;

    img {
      width: 40px;
      height: 40px;
    }

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;
