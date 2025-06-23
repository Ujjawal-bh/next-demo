
// to install styled component run the following command
// npm install --save styled-components
//import { createGlobalStyle } from 'styled-components';
//import { Inter, Lora, Source_Sans_3 ,Roboto_Slab} from 'next/font/google'
import { Inter, Roboto_Slab} from 'next/font/google'
 
// define your variable fonts
//const inter = Inter()
//const lora = Lora()
// define 2 weights of a non-variable font
//const sourceCodePro400 = Source_Sans_3({ weight: '400' })
//const sourceCodePro700 = Source_Sans_3({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
//const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })
 
//export { inter, lora, sourceCodePro400, sourceCodePro700, greatVibes }

// Load Google Fonts
const headingFont = Roboto_Slab({ subsets: ["latin"], weight: "700",   variable: '--font-roboto-slab',
    display: 'swap',
});

/* const bodyFont = Inter({ subsets: ["latin"], weight: "400",  variable: '--font-inter',
    display: 'swap',
});
 */

const bodyFont = Inter({ subsets: ["latin"], weight: "400",  variable: '--font-inter',

});

export { headingFont, bodyFont }