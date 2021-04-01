import React, { Component } from "react";
import {
  TextInput,
  Form,
  DropdownV2,
  Button,
  Tile
} from "carbon-components-react";
import Header from "./Header";
import "./patterns.scss";

let checkFlag = true;

class GroceryValidatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToSave: {},
      showDescription: props.showDescription || false
    };
    if (this.props.data) {
      let dataToLoad = this.convertData(this.props.data);
      this.state = {
        ...this.state,
        groceryItem: dataToLoad.GroceryItem,
        groceryQuantity: dataToLoad.GroceryQuantity,
        groceryUnit: dataToLoad.GroceryUnit[0],
        addedBy: dataToLoad.addedBy,
        updatedBy: dataToLoad.updatedBy,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      let dataToLoad = this.convertData(nextProps.data);
      if (dataToLoad.Name === "Enter data below") {
        dataToLoad.Name = "";
      }
      this.setState({
        groceryItem: dataToLoad.GroceryItem,
        groceryQuantity: dataToLoad.GroceryQuantity,
        groceryUnit: dataToLoad.GroceryUnit[0],
        addedBy: dataToLoad.addedBy,
        updatedBy: dataToLoad.updatedBy,
      });
    }
  }

  convertData = inputData => {
    let output = {};
    inputData.forEach(dataRow => {
      output[dataRow.label] = dataRow.value;
    });
    return output;
  };

  saveData = event => {
    const target = event.target;
    let fieldName = target.name;
    let fieldValue = target.value;
    if (!fieldValue) {
      this.setState({ [fieldName]: fieldValue, [fieldName + "Invalid"]: true });
    } else {
      this.setState({
        [fieldName]: fieldValue,
        [fieldName + "Invalid"]: false
      });
    }
  };

  saveDataDropdown1 = ({ selectedItem }) => {
    this.setState({ groceryUnit: selectedItem, /*groceryUnitInvalid: false*/ });
  };

//   saveDataDropdown2 = ({ selectedItem }) => {
//     this.setState({ country: selectedItem, countryInvalid: false });
//   };

  checkForm = () => {
    checkFlag = true;
    if (!this.state.groceryItem) {
      this.setState({ groceryItemInvalid: true });
      checkFlag = false;
    }
    if (!this.state.groceryQuantity) {
      this.setState({ groceryQuantityInvalid: true });
      checkFlag = false;
    }
    if (!this.state.groceryUnit) {
      this.setState({ groceryUnitInvalid: true });
      checkFlag = false;
    }
    if (!this.state.addedBy) {
      this.setState({ addedByInvalid: true });
      checkFlag = false;
    }
      if (!this.state.updatedBy) {
      this.setState({ updatedByInvalid: true });
      checkFlag = false;
    }
    return checkFlag;
  };

  saveForm = event => {
    event.preventDefault();
    if (this.checkForm()) {
      let dataToSave = {
        groceryItem: this.state.groceryItem,
        groceryQuantity: this.state.groceryQuantity,
        groceryUnit: this.state.groceryUnit,
        addedBy: this.state.addedBy,
        updatedBy: this.state.updatedBy,
      };
      if (typeof this.props.updateRow === "function") {
        this.props.updateRow(dataToSave);
      } else {
        this.setState({ dataToSave });
      }
      if (this.props.adding) {
        this.props.toggleAdding();
      }
    }
  };

  render() {
    const showDescription = this.state.showDescription;
    return (
      <div className="bx--grid pattern-container">
        {showDescription && (
          <Header
            title="Validating Form"
            subtitle="Presents a model object as a data input form and interacts with a validation service for validation."
          />
        )}
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <Tile>
              <Form>
                <TextInput
                  id="groceryItem"
                  name="groceryItem"
                  value={this.state.groceryItem || ""}
                  onChange={this.saveData}
                  labelText="Grocery Item"
                  maxLength="100"
                  invalid={this.state.groceryItemInvalid}
                  invalidText="Please enter a grocery item.."
                />
                <br />
                <br />
                <TextInput
                  id="groceryQuantity"
                  name="groceryQuantity"
                  value={this.state.groceryQuantity || ""}
                  onChange={this.saveData}
                  labelText="Grocery Quantity"
                  maxLength="200"
                  invalid={this.state.groceryQuantityInvalid}
                  invalidText="Please enter the quantity.."
                />
                <br />
                <br />
                <p className="bx--label left-align">Unit</p>
                <DropdownV2
                  id="groceryUnit"
                  label="Select the unit"
                  ariaLabel="Select the unit"
                  items={[
                    'lb', 
                    'oz', 
                    'dozen', 
                    'gal',
                  ]}
                  selectedItem={this.state.groceryUnit}
                  onChange={this.saveDataDropdown1}
                />
                {this.state.groceryUnitInvalid && (
                  <p className="dropdown-invalid">Please select the unit</p>
                )}
                <br />
                <br />
                <TextInput
                  id="addedBy"
                  name="addedBy"
                  value={this.state.addedBy || ""}
                  onChange={this.saveData}
                  labelText="Added By"
                  maxLength="200"
                  invalid={this.state.addedByInvalid}
                  invalidText="Added by.."
                />
                <br />
                <br />
                <TextInput
                  id="updatedBy"
                  name="updatedBy"
                  value={this.state.updatedBy || ""}
                  onChange={this.saveData}
                  labelText="Updated By"
                  maxLength="200"
                  invalid={this.state.updatedByInvalid}
                  invalidText="Updated by.."
                />
                <br />
                <br />
                <div className="left-align">
                  {showDescription && (
                    <Button onClick={this.saveForm}>Submit</Button>
                  )}
                  {!showDescription && (
                    <Button onClick={this.saveForm}>
                      {this.props.adding ? "Add" : "Update"}
                    </Button>
                  )}
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
        {Object.keys(this.state.dataToSave).length > 0 && (
          <div className="bx--row">
            <div className="bx--col-xs-12 left-align">
              <Tile>
                {Object.keys(this.state.dataToSave).map(item => (
                  <p>
                    &nbsp;&nbsp;
                    <strong>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </strong>{" "}
                    {this.state.dataToSave[item]}
                  </p>
                ))}
              </Tile>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default GroceryValidatingForm;
