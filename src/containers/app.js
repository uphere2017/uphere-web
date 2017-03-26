import { connect } from 'react-redux';
import {
  addTodo
} from '../actionCreators';
import {
  ADD_TODO
} from '../actionTypes';
import App from '../components/App';

const getTodoText = (todos) => {
  return todos.map((todo) => todo.text);
};

const mapStateToProps = (state) => {
  return {
    todos: getTodoText(state.todos)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (text) => {
      console.log('MapDispatchToProps:onClick:', text);
      dispatch(addTodo(text));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
