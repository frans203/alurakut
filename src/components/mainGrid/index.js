import styled from "styled-components";
const MainGrid = styled.main`
  // display: grid;

  // grid-gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.6rem;
  margin-top: 3rem;

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  .welcomeArea {
    width: 100%;
  }
  .profileRelationsArea {
    width: 100%;
  }
  div {
    margin: 0.3rem;
  }
  .allBtn {
    display: none;
  }
  @media (min-width: 860px) {
    // display: grid;
    // grid-template-columns: 10rem 1fr 20rem;
    // grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    flex-direction: row;
    .welcomeArea {
      width: 120%;
    }
    .profileRelationsArea {
      width: 70%;
    }
  } ;
`;

export default MainGrid;
