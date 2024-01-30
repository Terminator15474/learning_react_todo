import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

var contextIndex = -1;

function ContextMenu(props) {
    return (
        <div className='contextMenu'>
            <button className='contextMenuButton' onClick={props.app.deleteToDo()}>Delete</button>
            <button className='contextMenuButton'>Edit</button>
        </div>
    );
}

function ToDoItem(props) {
    return (
        <div className='todo'
        onContextMenu={(e) => {
            e.preventDefault();
            let menu = document.getElementsByClassName("contextMenu")[0];
            menu.style.display = "block";
            menu.style.left = e.clientX + "px";
            menu.style.top = e.clientY + "px";
            contextIndex = props.key;
        }}
        onClick={() => {
            let menu = document.getElementsByClassName("contextMenu")[0];
            menu.style.display = "none";
        }}
        >
            <p>{props.text}</p>
            <input type="checkbox" className='finished' />
        </div>
    );
}

let index = -1;
function createItem(props) {
    if(props === null || props === undefined || props === "") return
    index++;
    return (
        <ToDoItem text={props} key={index}></ToDoItem>
    );
}

function mapItems(items) {
    return items.map(createItem);
}

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            items: Array(0),
        };
        document.getElementsByTagName("html")[0].onClick=() => {
            let menu = document.getElementsByClassName("contextMenu")[0];
            menu.style.display = "none";
        };
    };

    addNewToDO(text) {
        if (text === null || text === "" || text === undefined)
            return;
        let items = this.state.items.slice();
        items.push(text);
        this.setState({
            items: items,
        });
    }

    deleteToDo(index) {
        let items = this.state.items.slice();
        // remove item at index
        items.splice(index, 1);
        this.setState({
            items: items,
        });
    }

    showPopup() {
        document.getElementsByClassName("popup")[0].style.display = "block";
        let button = document.getElementsByClassName("submit")[0];
        let input = document.getElementsByClassName("inputField")[0];
        input.focus();
        button.addEventListener("click",  () => {
            document.getElementsByClassName("popup")[0].style.display = "none";
            var text = input.value;
            input.value = "";
            this.addNewToDO(text)
        });
    }

    
    render() {
        return (
            <div
                onClick={() => {
                    let menu = document.getElementsByClassName("contextMenu")[0];
                    menu.style.display = "none";
                }}
            >
                <span className='top-bar'
                        onClick={() => {
                            let menu = document.getElementsByClassName("contextMenu")[0];
                            menu.style.display = "none";
                        }}
                >
                    <h1 className='title'>ToDo</h1>
                    <button className='addToDo' onClick={() => this.showPopup()}>Add Entry</button>
                </span>
                <div className='popup'>
                    <h3>What do you want to do?</h3>
                    <input type="text" className='inputField' />
                    <button className='submit'>Fertig</button>
                </div>
                <div className='todoItemWrapper'>
                    {
                        mapItems(this.state.items)
                    }
                </div>
                <ContextMenu app={this} />
            </div>
        );
    }
}

// -----------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.onClick=() => {
    let menu = document.getElementsByClassName("contextMenu")[0];
    menu.style.display = "none";
};

root.render(<App />);