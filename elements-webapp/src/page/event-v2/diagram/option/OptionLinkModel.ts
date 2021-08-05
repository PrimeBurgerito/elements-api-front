import { DefaultLinkModel } from '@projectstorm/react-diagrams-defaults';
import { IOption, SceneType } from '@type/Event';

class OptionLinkModel extends DefaultLinkModel {
  private _option: IOption = {
    text: '',
  };

  constructor() {
    super({ type: SceneType.OPTION, width: 5 });
  }

  public get sceneOption(): IOption {
    return this._option;
  }
}

export default OptionLinkModel;
