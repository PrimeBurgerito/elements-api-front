import { GET, POST } from '@shared/api/request-template/requests';
import { IEvent } from '@type/Event';
import { AxiosResponse } from 'axios';

const EVENT_API_PATH = '/event';

export default class EventApi {
  public static get = async (id: string): Promise<IEvent> => {
    const response: AxiosResponse = await GET(`${EVENT_API_PATH}/${id}`);
    return await response ? response.data : null;
  };
  public static post = async (body: FormData): Promise<IEvent> => {
    const response: AxiosResponse = await POST(EVENT_API_PATH + '/new', body,
      {headers: {'Content-Type': undefined}});
    return await response ? response.data : null;
  };
}
