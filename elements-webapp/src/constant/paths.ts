const IS_PROD = process.env.node_env === 'production';
const AUTH_PORT = 8080;
const API_PORT = 7777;
const MEDIA_PORT = 80;
const BASE_PATH = 'http://localhost';
const PROD_PATH = 'http://elementsback-env.eba-pizv7jpm.eu-north-1.elasticbeanstalk.com';
export const BASE_URL = IS_PROD ? PROD_PATH : `${BASE_PATH}:${API_PORT}`;
export const AUTH_URL = IS_PROD ? `${PROD_PATH}/auth` : `${BASE_PATH}:${AUTH_PORT}`;
export const MEDIA_URL = IS_PROD ? `${PROD_PATH}/media` : `${BASE_PATH}:${MEDIA_PORT}`;
export const CHARACTER_TEMPLATE_PATH = '/character-template';
export const LOCATION_PATH = '/location';
export const OBJECTIVE_PATH = '/objective';
export const ATTRIBUTE_PATH = '/attribute';
export const PROPERTY_PATH = '/property';
export const EVENT_PATH = '/event';
export const KEY_CONTAINER_PATH = '/key-container';
export const IMAGE_CONTAINER_PATH = '/image-container';
