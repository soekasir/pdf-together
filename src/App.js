import { PdfContextProvider } from "./Controller/Context/PdfContextProvider";
import { AuthorContextProvider} from "./Controller/Context/AuthorContextProvider";
import { PdfTogetherRouter } from "./Controller/Env/Router";

function App() {
  return (
    <AuthorContextProvider>
      <PdfContextProvider>
          <PdfTogetherRouter/>
      </PdfContextProvider>
    </AuthorContextProvider>
  );
}

export default App;