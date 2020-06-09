import React from 'react';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import Item from './Item';
import todoData from './todoData'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todoData
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    console.log("Changed", id)
    this.setState(prevState => {
      const newTodos = prevState.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
      return {
        todos: newTodos
      }
    })
  }

  render() {
    const todoItems = this.state.todos.map(item => <Item key={item.id} item={item} handleChange={this.handleChange}/>)
    return (
      <div className="App">
        <Header />
        <div>
          {todoItems}
        </div>        
        <Footer />
      </div>
    );
  }

}

export default App;
