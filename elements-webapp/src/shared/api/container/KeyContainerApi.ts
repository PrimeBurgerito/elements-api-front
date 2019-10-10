import BaseApi from '@shared/api/BaseApi';
import { IKeyContainerDto } from '@type/container';

export default class KeyContainerApi extends BaseApi<IKeyContainerDto> {
  protected PATH: string = '/key-container';
}
