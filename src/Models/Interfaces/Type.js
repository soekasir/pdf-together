"use strict";
exports.__esModule = true;
exports.Validation = void 0;
var Validation;
(function (Validation) {
    /*_______________________________________________________
    * Enums
    *_____________________________________________________*/
    var Mode;
    (function (Mode) {
        Mode["Img"] = "Img";
        Mode["Chat"] = "Chat";
        Mode["Annotation"] = "Annotation";
        Mode["Draw"] = "Draw";
    })(Mode = Validation.Mode || (Validation.Mode = {}));
    var LayerDisplay;
    (function (LayerDisplay) {
        LayerDisplay["pin"] = "pin";
        LayerDisplay["form"] = "form";
        LayerDisplay["show"] = "show";
        LayerDisplay["add"] = "add";
        LayerDisplay["hidden"] = "hidden";
    })(LayerDisplay = Validation.LayerDisplay || (Validation.LayerDisplay = {}));
    var FilterAnnotation;
    (function (FilterAnnotation) {
        FilterAnnotation["All"] = "all";
        FilterAnnotation["Latest"] = "latest";
        FilterAnnotation["MyComment"] = "mycomment";
        FilterAnnotation["NotMyComment"] = "notmycomment";
        FilterAnnotation["Solved"] = "solved";
        FilterAnnotation["Unsolved"] = "unsolved";
        FilterAnnotation["CurrentPage"] = "currentpage";
    })(FilterAnnotation = Validation.FilterAnnotation || (Validation.FilterAnnotation = {}));
    var Content = /** @class */ (function () {
        function Content(content) {
            this.content = content;
        }
        return Content;
    }());
})(Validation = exports.Validation || (exports.Validation = {}));
