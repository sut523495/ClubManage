import React, { Component } from 'react'
import '../App.css';
import AppNavbar from '../AppNavbar';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from '@material-ui/core/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


export default class Member extends Component {

    emptyItem = {
        changwatId: '',
        aumphoeId: '',
        majorId: '',
        branchId: '',



        studentid: '',
        name: '',
        nickname: '',
        address: '',
        motto: '',
        birthday: '',
        tell: '',
        nameparent: '',
        tellparent: '',
        facebook: '',
        changwatname: '',
        branch: '',
        major: '',
        aumphoename: ''
    };


    constructor(props) {
        super(props);
        this.state = {
            changwat: [],
            aumphoe: [],
            major: [],
            branch: [],
            setItem: this.emptyItem,


        };
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }



    componentDidMount() {
        fetch('http://localhost:8080/api/changwats')
            .then(response => response.json())
            .then(data => this.setState({ changwat: data }));

        // fetch('http://localhost:8080/api/aumphoes')
        //     .then(response => response.json())
        //     .then(data => this.setState({ aumphoe: data }));

        fetch('http://localhost:8080/api/majors')
            .then(response => response.json())
            .then(data => this.setState({ major: data }));

        // fetch('http://localhost:8080/api/branchs')
        //     .then(response => response.json())
        //     .then(data => this.setState({ branch: data }));


    }
    handleChange(event) {
        const value = event.target.value;
        console.log(value)
        const name = event.target.name;
        console.log(name)
        const item = { ...this.state.setItem };
        item[name] = value;
        this.setState({ setItem: item });

        console.log(item.changwatId);
        console.log(item.majorId);

        if (item.changwatId != '') {
            fetch(`http://localhost:8080/api/findAumphoe/${item.changwatId}`)
                .then(response => response.json())
                .then(data => this.setState({ aumphoe: data }));
        }

        if (item.majorId != '') {
            fetch(`http://localhost:8080/api/findBranch/${item.majorId}`)
                .then(response => response.json())
                .then(data => this.setState({ branch: data }));
        }
    }


    async handleSubmit(event) {

        event.preventDefault();
        const { setItem } = this.state;
        console.log(setItem)
        await fetch(`http://localhost:8080/api/memberx/${setItem.changwatId}/${setItem.aumphoeId}/${setItem.majorId}/${setItem.branchId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setItem),
        });
        this.props.history.push('/shows');
    }




    render() {
        console.log(this.state.setItem)
        const { changwat, aumphoe, major, branch, setItem } = this.state;

        const changwatlist = changwat.map(ch => {
            return (
                <MenuItem value={ch.id}>{ch.changwat}</MenuItem>
            )
        });
        const aumphoelist = aumphoe.map(a => {
            return (
                <MenuItem value={a.id}>{a.aumphoe}</MenuItem>
            )
        });
        const majorlist = major.map(mj => {
            return (
                <MenuItem value={mj.id}>{mj.major}</MenuItem>
            )
        });

        const branchlist = branch.map(br => {
            return (
                <MenuItem value={br.id}>{br.branch}</MenuItem>
            )
        });

        console.log(majorlist)

        return (
            <div>

                <AppNavbar />
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <FormGroup className="col-md-3 mb-3">
                                <Label for="student">รหัสนักศึกษา</Label>
                                <Input type="text" name="studentid" id="studentid" value={setItem.studentid || ''}
                                    onChange={this.handleChange}
                                    autoComplete="studentid" placeholder="รหัสนักศึกษา" />
                            </FormGroup>
                            <FormGroup className="col-md-6 mb-3">
                                <Label for="name">ชื่อ-สกุล</Label>
                                <Input type="text" name="name" id="name" value={setItem.name || ''}
                                    onChange={this.handleChange}
                                    autoComplete="name" placeholder="ชื่อ-สกุล" />
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3" >
                                <Label for="nickname">ชื่อเล่น</Label>
                                <Input type="text" name="nickname" id="nickname" value={setItem.nickname || ''}
                                    onChange={this.handleChange}
                                    autoComplete="nickname" placeholder="ชื่อเล่น" />
                            </FormGroup>
                        </div>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="address">ที่อยู่</Label>
                                <Input type="text" name="address" id="address" value={setItem.address || ''}
                                    onChange={this.handleChange}
                                    autoComplete="address" placeholder="ที่อยู่" />
                            </FormGroup>

                            <FormGroup className="col-md-6 mb-3">
                                <InputLabel htmlFor="tag-helper">จังหวัด</InputLabel>
                                <Select
                                    value={this.state.setItem.changwatId}
                                    onChange={this.handleChange}
                                    style={{ width: '50%', textAlign: 'center' }}
                                    input={<OutlinedInput name="changwatId" />}
                                    onAnimationEnd={this.x}

                                >
                                    <MenuItem value="" ><em>None</em></MenuItem>
                                    {changwatlist}
                                </Select>
                            </FormGroup>

                            <FormGroup className="col-md-8 mb-3">
                                <InputLabel htmlFor="tag-helper">อำเภอ</InputLabel>
                                <Select placeholder="อำเภอ"
                                    value={this.state.setItem.aumphoeId}
                                    onChange={this.handleChange}
                                    style={{ width: '50%', textAlign: 'center' }}
                                    input={<OutlinedInput name="aumphoeId" />}


                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {aumphoelist}
                                </Select>
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="birthday">วดป เกิด</Label>
                                <form className={useStyles.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Birthday"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        className={useStyles.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                            readOnly: true,
                                        }}
                                        name="birthday"
                                        onChange={this.handleChange}

                                    />


                                </form>
                            </FormGroup>

                        </div>

                        <div className="row">

                            <FormGroup className="col-md-4 mb-3">
                                <Label for="tell">เบอร์ติดต่อ</Label>
                                <Input type="text" name="tell" id="tell" value={setItem.tell || ''}
                                    onChange={this.handleChange}
                                    autoComplete="tell" placeholder="เบอร์ติดต่อ" />
                            </FormGroup>

                            <FormGroup className="col-md-8 mb-3">
                                <InputLabel htmlFor="tag-helper">สำนักวิชา</InputLabel>
                                <Select placeholder="สำนักวิชา"
                                    value={this.state.setItem.majorId}
                                    onChange={this.handleChange}
                                    style={{ width: '50%', textAlign: 'center' }}
                                    input={<OutlinedInput name="majorId" />}

                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {majorlist}
                                </Select>
                            </FormGroup>


                        </div>
                        <FormGroup>
                            <InputLabel htmlFor="tag-helper">สาขาวิชา</InputLabel>
                            <Select placeholder="สาชาวิชา"
                                value={this.state.setItem.branchId}
                                onChange={this.handleChange}
                                style={{ width: '50%', textAlign: 'center' }}
                                input={<OutlinedInput name="branchId" />}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {branchlist}
                            </Select>
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-8 mb-3">
                                <Label for="nameparent">ชื่อผู้ปกครอง</Label>
                                <Input type="text" name="nameparent" id="nameparent" value={setItem.nameparent || ''}
                                    onChange={this.handleChange}
                                    autoComplete="nameparent" placeholder="ชื่อผู้ปกครอง" />
                            </FormGroup>
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="tellparent">เบอร์ผู้ปกครอง</Label>
                                <Input type="text" name="tellparent" id="tellparent" value={setItem.tellparent || ''}
                                    onChange={this.handleChange}
                                    autoComplete="tellparent" placeholder="เบอร์ผู้ปกครอง" />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Label for="motto">คติประจำใจ</Label>
                            <Input type="text" name="motto" id="motto" value={setItem.motto || ''}
                                onChange={this.handleChange}
                                autoComplete="motto" placeholder="คิตประจำใจ" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="facebook">Facebook</Label>
                            <Input type="text" name="facebook" id="facebook" value={setItem.facebook || ''}
                                onChange={this.handleChange}
                                autoComplete="facebook1" placeholder="facebook" />
                        </FormGroup>
                        <FormGroup>

                            <Button color="primary" type="submit">Save</Button>

                        </FormGroup>
                    </Form>

                </Container>
            </div>
        );
    }
}


