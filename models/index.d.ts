import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerEarthquake = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Earthquake, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly magnitude: number;
  readonly location: string;
  readonly time: string;
  readonly reportedBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEarthquake = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Earthquake, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly magnitude: number;
  readonly location: string;
  readonly time: string;
  readonly reportedBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Earthquake = LazyLoading extends LazyLoadingDisabled ? EagerEarthquake : LazyEarthquake

export declare const Earthquake: (new (init: ModelInit<Earthquake>) => Earthquake) & {
  copyOf(source: Earthquake, mutator: (draft: MutableModel<Earthquake>) => MutableModel<Earthquake> | void): Earthquake;
}

type EagerEarthquakeAlert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EarthquakeAlert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tweetId: string;
  readonly text: string;
  readonly date: string;
  readonly location?: string | null;
  readonly magnitude?: number | null;
  readonly source?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEarthquakeAlert = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EarthquakeAlert, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tweetId: string;
  readonly text: string;
  readonly date: string;
  readonly location?: string | null;
  readonly magnitude?: number | null;
  readonly source?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EarthquakeAlert = LazyLoading extends LazyLoadingDisabled ? EagerEarthquakeAlert : LazyEarthquakeAlert

export declare const EarthquakeAlert: (new (init: ModelInit<EarthquakeAlert>) => EarthquakeAlert) & {
  copyOf(source: EarthquakeAlert, mutator: (draft: MutableModel<EarthquakeAlert>) => MutableModel<EarthquakeAlert> | void): EarthquakeAlert;
}