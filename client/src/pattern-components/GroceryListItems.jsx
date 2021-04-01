import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon,
  Button
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "./Header";
import GroceryValidatingForm from "./GroceryValidatingForm";
import "./patterns.scss";

const axios = require('axios');

class GroceryListItems extends Component {
  constructor(props) {
    super(props);
    const unitValues = ['lb', 'oz', 'dozen', 'gal'];

    const GetGroceryListUrl = '';
    const GetGroceryItemsInList = '';

    const data = [
      [
        { label: "GroceryItem", value: "Bread", type: "textinput" },
        { label: "GroceryQuantity", value: "3", type: "textinput" },
        { label: "GroceryUnit", value: ['package'], type: "dropdown" },
        { label: "AddedBy", value: "Jeff" },
        { label: "UpdatedBy", value: "Michael" },
      ],
      [
        { label: "GroceryItem", value: "Egg", type: "textinput" },
        { label: "GroceryQuantity", value: "2", type: "textinput" },
        { label: "GroceryUnit", value: ['dozen'], type: "dropdown" },
        { label: "AddedBy", value: "Jeff" },
        { label: "UpdatedBy", value: "Michael" },
      ],
      [
        { label: "GroceryItem", value: "Milk", type: "textinput" },
        { label: "GroceryQuantity", value: "1", type: "textinput" },
        { label: "GroceryUnit", value: ['gal'], type: "dropdown" },
        { label: "AddedBy", value: "Jeff" },
        { label: "UpdatedBy", value: "Michael" },
      ],
      [
        { label: "GroceryItem", value: "Milk", type: "textinput" },
        { label: "GroceryQuantity", value: "5", type: "textinput" },
        { label: "GroceryUnit", value: ['gal'], type: "dropdown" },
        { label: "AddedBy", value: "Jeff" },
        { label: "UpdatedBy", value: "Michael" },
      ],
    ];

    this.state = {
      selectedRow: 0,
      data,
      adding: false
    };
  }

  componentDidMount = () => {
    this.fetchItemsInGroceryList();
  }

  fetchGroceryList = () => {

  }

  fetchItemsInGroceryList = listName => {
    
    axios.get(/*`{GetGroceryListUrl}/listName`*/)
      .then(res => 
        // handle response
        this.setState({
          ...this.state.data,
          data: res.groceryLists.groceryItems
        }, console.log('fetchItemsInGroceryList api resoonse:', res))
      )
      .catch(err => console.log(`error getting items in ${listName} list`, err))
      .then(
        // always executed
      )
  }

  onRowClick = id => {
    this.setState({ selectedRow: id });
  };

  addList = () => {
    let data = this.state.data.slice();
    let selectedRow = this.state.data.length;
    data[selectedRow] = [
      { label: "GroceryItem", value: "", type: "textinput" },
      { label: "GroceryQuantity", value: "", type: "textinput" },
      { label: "GroceryUnit", value: ['lb', 'oz', 'dozen', 'gal'], type: "dropdown" },
      { label: "AddedBy", value: "", type: "textinput" },
      { label: "UpdatedBy", value: "", type: "textinput" },
    ];
    this.setState({ data, selectedRow, adding: true });
  };

  deleteRow = () => {
    let data = this.state.data.slice();
    if (data.length > 0) {
      data.splice(this.state.selectedRow, 1);
      this.setState({ data, selectedRow: 0 });
    }
  };

  updateRow = newData => {
    let data = this.state.data.slice();
    let selectedRow = this.state.selectedRow;
    data[selectedRow] = [
      { label: "GroceryItem", value: newData.groceryItem, type: "textinput" },
      { label: "GroceryQuantity", value: newData.groceryQuantity, type: "textinput" },
      { label: "GroceryUnit", value: [newData.groceryUnit], type: "dropdown" },
      { label: "AddedBy", value: newData.addedBy, type: "textinput" },
      { label: "UpdatedBy", value: newData.updatedBy, type: "textinput" },
    ];
    this.setState({ data });
  };

  toggleAdding = () => {
    const adding = this.state.adding;
    this.setState({ adding: !adding });
  };

  renderRow = (row, id) => {
    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            checked={this.state.selectedRow === id}
          />
          <StructuredListCell>
            <Icon
              className="bx--structured-list-svg"
              icon={iconCheckmarkSolid}
            />
          </StructuredListCell>
        </div>
        {Object.keys(row).map(col => {
          return (
            <StructuredListCell key={col} className="simple-list-row">
              {row[col]}
            </StructuredListCell>
          );
        })}
      </StructuredListRow>
    );
  };

  render() {
    const selectedRow = this.state.selectedRow;
    const data = this.state.data;
    const columns = data.length
      ? data[selectedRow].map(item => item.label)
      : [];
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return (
      <div className="bx--grid pattern-container">
        <Header
          title={`${mm + '/' + dd + '/' + yyyy}'s grocery list`}
          subtitle="This composite pattern is build from the Table List pattern and uses the Validating Form pattern for creating items, Update Form pattern for Update."
        />
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <StructuredListWrapper selection border>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head />
                  {columns.map(key => {
                    return (
                      <StructuredListCell head key={key}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </StructuredListCell>
                    );
                  })}
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {data.map((row, i) => {
                  const values = row.map(item => item.value);
                  return this.renderRow(values, i);
                })}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
        <div className="bx--row left-align">
          <div className="bx--col-xs-12">
            <Button className="add-delete-row-buttons" onClick={this.addList}>
              Add Item
            </Button>
            <Button className="add-delete-row-buttons" onClick={this.deleteRow}>
              Remove Item
            </Button>
          </div>
        </div>
        <br />
        <br />
        {data.length > 0 && (
          <div className="bx--row">
            <div className="bx--col-xs-12">
              <GroceryValidatingForm
                data={data[selectedRow]}
                updateRow={this.updateRow}
                adding={this.state.adding}
                toggleAdding={this.toggleAdding}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GroceryListItems;
