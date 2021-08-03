import { createGlobalStyle } from "styled-components";

import Lausanne300 from "./fonts/TWKLausanne-300.woff";
import Lausanne3002 from "./fonts/TWKLausanne-300.woff2";
import Lausanne300i from "./fonts/TWKLausanne-300Italic.woff";
import Lausanne3002i from "./fonts/TWKLausanne-300Italic.woff2";
import CourierPrime from "./fonts/CourierPrime-Regular.ttf";
import Lausanne6502 from "./fonts/TWKLausanne-650.woff2";
import Lausanne650 from "./fonts/TWKLausanne-650.woff";

export default createGlobalStyle`
    @font-face {
        font-family: 'Lausanne300';
            src: local('Lausanne300'), local('Lausanne300'),
            url(${Lausanne3002}) format('woff2'),
            url(${Lausanne300}) format('woff');
    }
    @font-face {
        font-family: 'Lausanne300-Italic';
            src: local('Lausanne300-Italic'), local('Lausanne300-Italic'),
            url(${Lausanne3002i}) format('woff2'),
            url(${Lausanne300i}) format('woff');
    }

    @font-face {
        font-family: 'Lausanne650';
            src: local('Lausanne650'), local('Lausanne850'),
            url(${Lausanne6502}) format('woff2'),
            url(${Lausanne650}) format('woff');
    }

        @font-face {
            font-family: 'CourierPrime';
            src: local('CourierPrime'),        
            url(${CourierPrime}) format('ttf');

        }

    html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p,
  text {
      font-family: 'Lausanne300';
      margin: 0;
      box-sizing: border-box;   
  }
 
`;

export const themeVars = {};
