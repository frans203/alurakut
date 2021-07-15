import styled from "styled-components";
import Box from "../Box";

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    // display: grid;
    // grid-gap: 8px;
    // grid-template-columns: 1fr 1fr 1fr;
    display: flex;
    align-items: flex-start;

    flex-wrap: wrap;
    list-style: none;
    width: 100%;
  }

  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    width: 6rem;
    height: 7rem;
    // min-height: 8rem;
    // max-height: 8rem;
    margin: 0.3rem;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    span {
      color: #ffffff;
      font-size: 0.9rem;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;

      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;
