import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const ALBUM_URL = '/mock/11/bear/album/list';

export interface IProgram {
  id: string;
  title: string;
  playVolume: string;
  duration: string;
  data: string;
}

interface IAuthor {
  name: string;
  avatar: string;
}

export interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnaiUrl: string;
  introduction: string;
  author: IAuthor;
  list: IProgram[];
}
export interface AlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  effects: {
    fetchAlbum: Effect;
  };
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
}

const initialState: IAlbumModelState = {
  id: '',
  thumbnaiUrl: '',
  title: '',
  summary: '',
  list: [],
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
};

const AlbumModel: AlbumModel = {
  namespace: 'album',
  state: initialState,
  effects: {
    *fetchAlbum({payload}, {call, put}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      console.log('fetchAlbum', data);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default AlbumModel;
