// 必要的redux方法
import { createStore } from 'redux';

function todos(state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state.concat([ action.text ])
      default:
        return state
    }
}  

// 整合store
const store = createStore(
    todos, [ 'Use Redux' ]
);
// 导出
export default store;
