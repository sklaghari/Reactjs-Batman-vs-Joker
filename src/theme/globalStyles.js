import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../../public/images/background.jpg'
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Roboto;
    background-image: url(${backgroundImage});
    background-attachment:fixed;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    }
`;
export default GlobalStyle;