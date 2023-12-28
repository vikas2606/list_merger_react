import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './components/pages/Home';
import { extendTheme } from "@chakra-ui/react";
import GlobalStyles from './components/GlobalStyles';

// Create a custom theme if needed
const theme = extendTheme({
  
  // Your custom theme configuration goes here
  components: {
    
    Button: {
      baseStyle: {
        bg: "blue.500", // Blue color
        color: "white", // Text color
      },
      _hover: {
        bg: "blue.600", // Hover color
      },
    },
  },
  
});


function App() {
  return (
   <ChakraProvider theme={theme}>  
   <GlobalStyles/>
    <Home/>
   </ChakraProvider>
  );
}

export default App;
