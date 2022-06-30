import { constants } from "../constants";

function Bem(block: string): (element?: string, modifier?: string) => string {
  const blockCls = `${constants.cssPrefix}-${block}`;

  function BemGenerator(element?: string, modifier?: string) {
    const elementName = element ? constants.cssElementDelimiter + element : "";
    const modifierName = modifier
      ? constants.cssModifierDelimiter + modifier
      : "";

    return blockCls + elementName + modifierName;
  }

  return BemGenerator;
}

export default Bem;
