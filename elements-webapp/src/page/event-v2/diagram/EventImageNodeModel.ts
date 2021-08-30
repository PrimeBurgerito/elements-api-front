import { DefaultPortModel } from '@projectstorm/react-diagrams';
import { SceneType } from '@type/Event';
import EventNodeModel from './EventNodeModel';

export default abstract class EventImageNodeModel<IP extends DefaultPortModel = DefaultPortModel, OP extends DefaultPortModel = DefaultPortModel>
  extends EventNodeModel<IP, OP> {
  private _image?: File;

  protected constructor(type: SceneType, label: string, public first = false) {
    super(type, label, first);
  }

  public set image(file: File) {
    this._image = file;
  }

  public get image(): File {
    return this._image;
  }
}
