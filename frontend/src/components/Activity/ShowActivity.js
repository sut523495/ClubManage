import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'date-fns';
import Table from '@material-ui/core/Table';
import {auth} from '../../firebase';

class ShowActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {activity: [],
                  currentUser:null};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.email
        })
      }else{
        window.location = '/login';
      }
    })

    fetch('http://localhost:8080/activityAllUserAllClub')
      .then(response => response.json())
      .then(data => this.setState({activity: data}))
      .catch((error) => {
        console.log("Error"+ error);
    });

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
      const {activity} = this.state;
      const activityList = activity.map(activity => {
        return (
          <tr>
            <td align="center">{activity.club.clubName}</td>
            <td align="center">{activity.dateStart}</td>
            <td align="center">{activity.dateEnd}</td>
            <td align="center">{activity.activityName}</td>
            <td align="center">
              <Button style={{ background: '#000066',width: '40px' }} 
                  tag={Link} to={"/DetailActivity/"+activity.activityId}>
                ดู
              </Button>
            </td>
          </tr>
        )
      });
  
      return <div>
      <AppNavbar/>
          <Container>
           <Form onSubmit={this.handleSubmit}>
           <div>
           <Table className="mt-4" >
              <thead>
              <tr style={{ background: '#000066',color: '#FFFFFF' }} align="center">
                <th width="20%">ชมรม</th>
                <th width="20%">วันที่เริ่ม</th>
                <th width="20%">วันที่สิ้นสุด</th>
                <th width="20%" >กิจกรรม</th>
                <th width="10%"> รายละเอียด</th>
              </tr>
              </thead>
              <tbody>
                {activityList}
              </tbody>
            </Table>
           </div>

           
            </Form>
          </Container>
      </div>
    }
  }
  export default ShowActivity;
