import { GET, POST, PUT } from '@shared/api/request-template/requests';
import { IEvent, IEventDto, IImageToSceneMap } from '@type/Event';
import { AxiosResponse } from 'axios';
import { APPLICATION_JSON_OPTION } from '@shared/api/request-template/AxiosInstance';

const EVENT_API_PATH = '/event';

export type EventSave = {
  id?: string,
  dto: IEventDto,
  imageToSceneMap: IImageToSceneMap[],
  images: File[],
}

const SAVE_HEADER = { headers: { 'Content-Type': undefined } };
const FORM_DATA_FILES = 'files';
const FORM_DATA_IMAGE_TO_SCENE = 'imageToSceneMap';
const FORM_DATA_EVENT_DTO = 'eventDto';

export default class EventApi {
  public static get = async (id: string): Promise<IEvent> => {
    const response: AxiosResponse = await GET(`${EVENT_API_PATH}/${id}`);
    return await response ? response.data : null;
  };
  public static save = async (event: EventSave): Promise<IEvent> => {
    const formData = new FormData();
    formData.append(FORM_DATA_IMAGE_TO_SCENE, new Blob([JSON.stringify(event.imageToSceneMap)], APPLICATION_JSON_OPTION));
    formData.append(FORM_DATA_EVENT_DTO, new Blob([JSON.stringify(event.dto)], APPLICATION_JSON_OPTION));
    event.images.forEach(i => {
      formData.append(FORM_DATA_FILES, i);
    })

    const response: AxiosResponse = event.id
      ? await PUT(`${EVENT_API_PATH}/update/${event.id}`, formData, SAVE_HEADER)
      : await POST(EVENT_API_PATH + '/new', formData, SAVE_HEADER);

    return await response ? response.data : null;
  };
}
