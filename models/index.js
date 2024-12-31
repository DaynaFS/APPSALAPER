// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, Earthquake, EarthquakeAlert } = initSchema(schema);

export {
  Todo,
  Earthquake,
  EarthquakeAlert
};