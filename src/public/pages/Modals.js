import { Modal, Row, Text, Button, Avatar, Container, Divider, Input, Dropdown } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

let UserData = {};

const getUserData = (user) => {
    UserData = user;
}

class ModalUpdate extends React.Component {

    constructor(users,visible,setVisible) {
        super();

        this.users = users;
        this.visible = visible;
        this.setVisible = setVisible;
        this.element = null;
        this.userData = {};
    }

    showModal(user={}) {
        this.setVisible(true);
        getUserData(user);
    }

    hideModal() {
        this.setVisible(false);
    }

    getFields = () => {
        let fields = document.querySelectorAll('input,textarea');
    
        return fields;
    }

    verifyData = (selected,setVisible,setUsers) => {
        let fields = this.getFields();
        let verify = true;
        let dropdown = selected.values().next();
    
        fields.forEach(inp => {
            if(inp.value.length != 0)
            {
                if(inp.name == 'age')
                {
                    this.userData[inp.name] = parseInt(inp.value);
                }
                else if(inp.name == 'phone')
                {
                    let value = inp.value;
                    let phone = value.substr(0,3) + '-' + value.substr(3,3) + '-' + value.substr(6,9);
                    this.userData[inp.name] = phone;
                }
                else
                {
                    this.userData[inp.name] = inp.value;
                }
            }
            else
            {
                verify = false;
                return false;
            }
        });
    
        if(dropdown.value === 'Active')
        {
            this.userData.status = 1;
        }
        else
        {
            this.userData.status = 2;
        }

        this.users.map((u,i) => {
            if(u.user == this.userData.user)
            {
                this.users[i] = this.userData;
            }
        });
    
        if(verify)
        {
            swal({
                title: 'User update',
                text: 'Done!',
                icon: 'success'
            }).then(click => {
                if(click)
                {
                    setVisible(false);
                    this.saveData(this.users,setUsers);
                }
            });
        }
        else
        {
            swal({
                title: 'Please complete require fields',
                text: '',
                icon: 'error'
            });
        }
    }

    saveData(data,setUsers) {
        fetch('http://localhost:8000/save-user',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(rs => rs.json()).then(rs => {
    
            if(rs.action != false)
            {
                this.getUsers(setUsers);
            }
            else
            {
                swal({
                    title: 'Sorry, cant save data',
                    text: 'please try again',
                    icon: 'error'
                });
            }
    
        });
    }

    getUsers(setUsers) {
        fetch('http://localhost:8000/get-users',{
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(rs => rs.json()).then(rs => {
            this.users = rs.data;
            setUsers(this.users);
        });
    }

    drawModal() {
        
        const [users,setUsers] = useState(this.users);
        const [userData,setUserData] = useState(this.userData);
        const [selected, setSelected] = useState(['Active']);
        const selectValue = React.useMemo(() => Array.from(selected).join(', ').replaceAll('_',''),[selected]); 
        const value = ['Active','Inactive'];

        this.userData = UserData;
        const status = this.userData.status != 1 ? 'Inactive' : 'Active';

        useEffect(() => {
            setSelected([status]);
        },[status]);

        return (
            <Modal
                blur
                preventClose
                aria-labelledby="modal-title"
                open={this.visible}
                width='600px'
            >
                <Modal.Header>
                    <Row justify="flex-start" align="center">
                        <Avatar 
                            text={ this.userData.user?.substring(0,2).toUpperCase() }
                            textColor={'white'}
                            src=""  color={'gradient'} 
                            bordered size={'xs'}
                            squared
                        /> 
                        &nbsp; 
                        <Text>Update Screen</Text>
                    </Row>
                </Modal.Header>
                <Divider/>
                <Modal.Body>
                    <Row justify="space-between">
                        <Avatar 
                            text={ this.userData.user?.substring(0,2).toUpperCase() }
                            textColor={'white'}
                            src=""  color={'gradient'} 
                            bordered
                            squared
                            size={'xl'}
                        />
                        <Container>
                            <div>
                                <label>User Name</label>
                                <input name="user" defaultValue={this.userData.user} style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                            <div>
                                <label>Full Name</label>
                                <input name="name" defaultValue={this.userData.name} style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                            <div>
                                <label>Email</label>
                                <input name="email" type={'email'} defaultValue={this.userData.email} style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                            <div>
                                <label>Age</label>
                                <input name="age" defaultValue={this.userData.age} type='number' style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                            <div>
                                <label>Birthday</label>
                                <input name="date" defaultValue={this.userData.date} type='date' style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                            <div>
                                <label>Status</label>
                                <Dropdown fluid>
                                    <Dropdown.Button flat>{selectValue}</Dropdown.Button>
                                    <Dropdown.Menu 
                                        aria-label="Static Actions"
                                        selectionMode="single"
                                        selectedKeys={selected}
                                        onSelectionChange={setSelected}
                                    >
                                        <Dropdown.Item key={value[0]}><i className="fa fa-user"></i> {value[0]}</Dropdown.Item>
                                        <Dropdown.Item key={value[1]}><i className="fa fa-user-o"></i> {value[1]}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <br />
                            <div>
                                <label>Description</label>
                                <textarea name="description" defaultValue={this.userData.description} style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }}></textarea>
                            </div>
                            <br />
                            <div>
                                <label>Phone</label>
                                <input name="phone" defaultValue={this.userData.phone?.replace(/-/g,'')} type='number' style={{
                                    width: '100%',
                                    fontSize: '1.6em',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderBottom: 'solid 1px lightgray'
                                }} />
                            </div>
                            <br />
                        </Container>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row justify="flex-end">
                        <Button flat auto color={'error'} onPress={() => this.hideModal()}>cancel &nbsp; <i className="fa fa-remove"></i> </Button>
                        &nbsp;
                        <Button auto color={'primary'} onPress={() => this.verifyData(selected,this.setVisible,setUsers) } >save &nbsp; <i className="fa fa-check"></i> </Button>
                    </Row>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default ModalUpdate