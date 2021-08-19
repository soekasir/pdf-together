import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { SelectPdf } from '../../Views/Component/SelectPdf/SelectPdf';
import PdfTogether from '../../Views/Page/PdfTogether/PdfTogether';







export const PdfTogetherRouter=()=>{
  return(
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <SelectPdf></SelectPdf>
        </Route>
        <Route exact path={'/pdf-together'}>
            <PdfTogether/>
        </Route>
      </Switch>
    </Router>
  )
}