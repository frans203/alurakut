import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AlurakutStyles } from "../src/components/lib/AlurakutCommons";
const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;

  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  
    font-family: sans-serif;
    overflow-x: hidden;
    background: rgb(0,122,213);
    background: linear-gradient(45deg, rgba(0,122,213,1) 0%, rgba(231,229,229,1) 100%);
    background-size: 400% 400%;
    animation: animate 2s ease-in-out infinite alternate;
  } 
  @keyframes animate {
    0%{
     background-position: 0% 0%;
    }
    0%{
      background-position: 25% 50%;
     }
    50%{
      background-position: 50% 75%;
    }
    100%{
      background-position: 100% 100%;
    }
  }
  
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  } 
  // @media (max-width: 900px){
  //   body{
  //     background-color:red;
  //   }
  // }

  img {
    max-width: 100%;
    height: auto;
    display:block;
  }

  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: "red",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
