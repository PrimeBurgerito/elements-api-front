import BaseApi from '@shared/api/BaseApi';
import { IImageContainerDto } from '@type/container';

export default class ImageContainerApi extends BaseApi<IImageContainerDto> {
  protected PATH: string = '/image-container';
}
