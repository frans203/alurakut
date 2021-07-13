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
    background-color:#D9E6F6;
    font-family: sans-serif
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
