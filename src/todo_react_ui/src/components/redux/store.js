import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import {todoSaga} from './todoSaga';
import { todoReducer } from './todoReducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todoReducer,
                            composeWithDevTools(applyMiddleware(sagaMiddleware))
                            );
sagaMiddleware.run(todoSaga);

export default store;