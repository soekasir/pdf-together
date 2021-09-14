import { PdfContextProvider } from "./Controller/Context/PdfContextProvider";
import { AuthorContextProvider} from "./Controller/Context/AuthorContextProvider";
import { PdfTogetherRouter } from "./Controller/Env/Router";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Resources/style/style";






function App() {
  return (
    <AuthorContextProvider>
      <PdfContextProvider>
        <ThemeProvider theme={theme}>
          <PdfTogetherRouter/>
        </ThemeProvider>
      </PdfContextProvider>
    </AuthorContextProvider>
  );
}

export default App;