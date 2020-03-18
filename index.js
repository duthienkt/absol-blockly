
import Core from "./js/svg/Core";
import  "./js/svg/Entry";
import  "./js/svg/Active";
import  "./js/svg/Expression";
import { makeBlockPath } from "./js/svg/Block";
import { makeExpressionPath } from "./js/svg/Expression";
import  "./js/svg/ComboBox";
import  "./js/svg/TextInput";

var ABlockly ={
    core : Core,
    _ : Core._,
    $ : Core.$,
    makeBlockPath: makeBlockPath,
    makeExpressionPath: makeExpressionPath
};


export default ABlockly; 

