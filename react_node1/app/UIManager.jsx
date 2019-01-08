import React from 'react';
import axios from 'axios';

import Header from './Header';
import List from './List';
import ItemForm from './ItemForm';

class UIManager extends React.Component {

    constructor() {
        super();

        // debugger;
        this.state = {
            search_term: '',
            list: [],
            form_fields: {
                id: '',
                title: '',
                artist: '',
                album: ''
            },
            form_mode: 'CREATE'
        }
    }

    componentWillMount() {
        axios.get('/list').then((response) => {
            //debugger;
            this.setState({
                list: response.data
            });
        });
    }

    // data API - CRUD methods
    createItem() {
        // get Item data from state
        var item = this.state.form_fields;

        axios.post("/list", item).then((response) => {
            // debugger;
            // apply response data to state
            this.setState({
                list: response.data.list,
                form_fields: {
                    id: '',
                    title: '',
                    artist: '',
                    album: ''
                }
            });
        }).catch(function (error) {
            console.error(error.response.data);
        });
    }

    deleteItem(item_id) {
        // debugger;
        axios.delete(`/list/${item_id}`).then(response => {
            // apply response data to state
            this.setState({
                list: response.data.list
            });
        });
    }

    editItem(item_id) {
        console.log("[UIManager]: edit ", item_id );
         // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...this.state.list];
        // filter list copy, by excluding item to delete
        var filtered_list = current_list_items.filter(function(item) {
            return item.id === item_id;
        });
        
         // filter returns an array, but there should only be one matching item with given ID
        var item_to_edit = filtered_list[0];
         // set mode of ItemForm
        this.setState({
            form_mode: 'EDIT',
            form_fields: item_to_edit
        })
         // show ItemForm
        this.showForm();
    }

    saveUpdatedItem() {
        // debugger;

        // get Item data from state
        var item = this.state.form_fields;
        axios.put(`/list/${item.id}`, item).then(response => {
            // apply response data to state
            this.setState({
                list: response.data.list,
                form_mode: 'CREATE',
                form_fields: {
                    id: '',
                    title: '',
                    artist: '',
                    album: ''
                }
            });
        });

        // hideForm
        this.hideForm();
    }

    // end of CRUD methods

    searchList(event) {
        var search_term = event.target.value;
        // console.log(search_term);

        this.setState({
            search_term: search_term
        });
    }

    onChangeFormInput(event) {
        // console.log("input changed");

        // copy values, not reference
        var current_list_fields = Object.assign({}, this.state.form_fields);     
        // e.g. current_list_fields['artist'] = 'Artist1'
        current_list_fields[event.target.name] = event.target.value;
        // apply new value to state
        this.setState({
            form_fields: current_list_fields
        });
    }

    showForm() {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
    }

    hideForm() {
        var modal = document.querySelector('.modal');
        modal.style.display = "none";
    }

    onAddItem() {
        this.setState({
            form_mode: 'CREATE',
            form_fields: {
                id: '',
                title: '',
                artist: '',
                album: ''
            }
        });
        this.showForm();
    }

    render() {
        if (!this.state.list.length) {
            return (<div>Loading...</div>);
        }

        // debugger;        
        var list = this.state.list;
        var search_term = this.state.search_term;
        var filtered_list;

        if (!search_term) {
            filtered_list = list;
        } else {
            filtered_list = list.filter(function (item) {
                return item.title.toLowerCase().includes(search_term.toLowerCase());
            });
        }

        return(
            <div>
                <Header />
                <div className="options">
                    <input type="text" 
                           placeholder="Filter..." 
                           onChange={ (event) => {
                                        // debugger;
                                        this.searchList(event);
                                       } 
                                    } />
                    <span className="add" onClick={() => this.onAddItem()}>[➕]</span>
                </div>
                <List list={filtered_list} 
                      deleteItem={(item_id) => this.deleteItem(item_id) }
                      editItem={(item_id) => this.editItem(item_id) } />
                <ItemForm item={this.state.form_fields}
                          onChangeFormInput={(event) => this.onChangeFormInput(event) } 
                          createItem={() => this.createItem()}
                          saveUpdatedItem={item => this.saveUpdatedItem(item)}
                          mode={this.state.form_mode} />
            </div>
        );
    }
}

export default UIManager;
