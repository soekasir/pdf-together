import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { SelectPdf } from '../../Views/Component/SelectPdf/SelectPdf';
import PdfTogether from '../../Views/Page/PdfTogether/PdfTogether';
import { ThemeProvider } from "@material-ui/core";
import { theme } from '../../Resources/style/style';

export const PdfTogetherRouter=()=>{
  return(
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <SelectPdf></SelectPdf>
        </Route>
        <Route exact path={'/pdf-together'}>
        <ThemeProvider theme={theme}>
            <PdfTogether/>
        </ThemeProvider>
        </Route>
      </Switch>
    </Router>
  )
}