import { DefaultPortModel } from '@projectstorm/react-diagrams';
import OptionLinkModel from './OptionLinkModel';
import EventNodeModel from '../EventNodeModel';

class OptionPortModel extends DefaultPortModel {
  constructor() {
    super({ in: false, name: EventNodeModel.OUT_PORT_NAME });
  }

  createLinkModel(): OptionLinkModel | null {
    return new OptionLinkModel();
  }
}

export default OptionPortModel;
