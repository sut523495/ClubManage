import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import AppNavBarOrganization from '../../AppNavBarOrganization';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';

class DetailActivity extends Component {
  emptyItem = {
    
  };
  
  constructor(props) {
    super(props);
    this.state = {clubName: [],
                  budget: [],
                  setItem: this.emptyItem};
    this.handleChange = this.handleChange.bind(this);
    
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/clubs')
      .then(response => response.json())
      .then(data => this.setState({clubName: data}));

    fetch('http://localhost:8080/Budgets')
      .then(response => response.json())
      .then(data => this.setState({budget: data}));

  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const item = {...this.state.setItem};
    item[name] = value;
    this.setState({setItem: item});
    console.log(item);
  }
    render() {
    
      return <div>
      <AppNavbar/>
          <Container>
           <Form onSubmit={this.handleSubmit}>
           
           

           
            </Form>
          </Container>
      </div>
    }
  }
  export default DetailActivity;
