import { Modal, Input, Dropdown, Grid, Card, Text, Container, Button, Avatar, Row } from "@nextui-org/react"
import React, { useState, useEffect } from "react"
import ModalUpdate from "./Modals";
import { defineUrl } from "../routes/urls";

var _users = [];
var searchData = [];
const isDev = 'pro';

const verifyData = (selected,setVisible,setUsers) => {
    let fields = getFields();
    let verify = true;
    let data = {};
    let dropdown = selected.values().next();

    fields.forEach(inp => {
        if(inp.value.length != 0)
        {
            if(inp.name == 'age')
            {
                data[inp.name] = parseInt(inp.value);
            }
            else if(inp.name == 'phone')
            {
                let value = inp.value;
                let phone = value.substr(0,3) + '-' + value.substr(3,3) + '-' + value.substr(6,9);
                data[inp.name] = phone;
            }
            else
            {
                data[inp.name] = inp.value;
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
        data['status'] = 1;
    }
    else
    {
        data['status'] = 2;
    }

    if(verify)
    {
        swal({
            title: 'User add',
            text: 'Done!',
            icon: 'success'
        }).then(click => {
            if(click)
            {
                setVisible(false);
                _users.push(data);
                saveData(_users,setUsers);
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

const saveData = (data,setUsers) => {
    fetch(defineUrl(isDev) + 'save-user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(rs => rs.json()).then(rs => {

        if(rs.action != false)
        {
            getUsers(setUsers);
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

const getFields = () => {
    let fields = document.querySelectorAll('input');

    return fields;
}

const verifyLength = (e) => {
    if(e.target.value.length == 11)
    {
        let value = e.target.value;
        e.target.value = value.substr(0,value.length - 1);
    }
}

const getUsers = (setUsers) => {
    fetch(defineUrl(isDev) + 'get-users',{
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(rs => rs.json()).then(rs => {
        _users = rs.data;
        searchData = _users;
        setUsers(_users);
    });
}

const removeUser = (u,setUsers) => {
    swal({
        title: 'Do you want remove ' + u.user + '?',
        text: 'Are you realy wish remove this user?',
        icon: 'warning',
        buttons: ['no','yes']
    }).then(click => {
        if(click)
        {
            let data = _users.filter(f => f.user != u.user);

            saveData(data,setUsers);
        }
    });
}

const showInput = () => {
    let input = document.getElementById('input-search');
    let message = document.getElementById('welcome');

    let s_icon = document.getElementById('search-icon');
    let r_icon = document.getElementById('remove-icon');

    if(!input.classList.contains('show'))
    {
        input.style.display = 'block';
        message.style.display = 'none';

        s_icon.style.display = 'none';
        r_icon.style.display = 'block';

        input.classList.add('show');
    }
    else
    {
        input.style.display = 'none';
        message.style.display = 'block';

        s_icon.style.display = 'block';
        r_icon.style.display = 'none';

        input.classList.remove('show');
    }
}

const searchUsers = (evt,setUsers) => {
    let data = [];

    if(evt.target.value.length != 0)
    {
        data = searchData.filter(u => {
            let str = u.user + ' ' + u.name + ' ' + u.email;
            let value = str.match(new RegExp(evt.target.value,'i'));
    
            if(value != null)
            {
                return u;
            }
        });

        _users = data;
        setUsers(_users);
    }
    else
    {
        data = searchData.map(u => u);

        _users = data;
        setUsers(_users);
    }
    
}

const Home = () => {
    const [users, setUsers] = useState(_users);
    const [visible, setVisible] = useState(false);
    const [visible_upd, setVisible_upd] = useState(false);
    const [selected, setSelected] = useState(new Set(['Active']));

    const selectValue = React.useMemo(() => Array.from(selected).join(', ').replaceAll('_',''),[selected]); 
    const value = ['Active','Inactive'];

    const modalUpdate = new ModalUpdate(_users,visible_upd,setVisible_upd);

    useEffect(() => {
        getUsers(setUsers);
    },[]);

    return(
        <Grid.Container gap={2} justify="center">
            <Grid xs></Grid>
            <Grid xs={10}>
                <Container fluid>
                    <Row justify="space-between" align="center">
                        <Row>
                            <h1 id="welcome" style={{ margin: 0}}>Welcome to the Manager!</h1>
                           <div id="input-search" style={{ 
                                display: 'none', 
                                width: '80%',
                                margin: '0.87em 0'
                            }}>
                                <Input onInput={(e) => searchUsers(e,setUsers)} size="lg" clearable bordered placeholder="Search user" fullWidth />
                            </div> 
                        </Row>
                        <Row justify="flex-end" align="center" css={{ width: '150px' }}>
                            <Button auto onPress={(e) => showInput()} bordered rounded color={'default'}>
                                <i id="search-icon" className="fa fa-search"></i>
                                <i id="remove-icon" className="fa fa-remove" style={{
                                    display: 'none'
                                }}></i>
                            </Button>&nbsp;
                            <Button auto onPress={() => setVisible(true)}>add new user &nbsp; <i className="fa fa-plus"></i></Button>
                        </Row>
                    </Row>
                    <br />
                    <hr/>
                    <br />
                    <b><i className="fa fa-users"></i> Check the user list!</b>
                    <br />
                    <br />
                    <Container fluid justify="center" css={{
                        padding: 0,
                        display: 'flex'
                    }}>
                        { _users.length != 0 ? _users.map((u,i) =>
                        <Card key={'card-' + i} id={'card-' + i } variant="bordered" isHoverable css={{
                            width: '19em',
                            marginRight: '1em',
                            marginBottom: '1em' 
                        }}>
                            <Card.Header>
                                <Row justify="space-between">
                                    <Container css={{padding: 0}}>
                                        <Row>
                                            <Avatar 
                                            text={u.user.substring(0,2).toUpperCase()} 
                                            textColor={'white'}
                                            src="" color={'gradient'} 
                                            squared bordered size={'xs'} 
                                            /> &nbsp; {u.user}
                                        </Row>
                                    </Container>
                                    <Container css={{padding: 0}}>
                                        <Row justify="flex-end" align="center">
                                            <Text>Age {u.age}</Text>
                                            &nbsp;
                                            <i className={u.status != 1 ? "fa fa-times-circle" : "fa fa-check-circle"} 
                                            style={{color: u.status != 1 ? 'red' : 'green' }}></i>
                                        </Row>
                                    </Container>
                                </Row>
                            </Card.Header>
                            <Card.Divider />
                            <Card.Body>
                                <Avatar 
                                text={u.user.substring(0,2).toUpperCase()}
                                textColor={'white'}
                                src=""  color={'gradient'} 
                                bordered size={'xl'}
                                squared
                                css={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                                />
                                <br />
                                <Text size={20} weight={'bold'} align={'center'}>{u.name}</Text>
                                <Text size={14} align={'center'}>{u.email}</Text>
                                <br />
                                <Row justify="space-between">
                                    <Container css={{padding: 0}}>
                                        <Text size={13} weight={'bold'}>Phone</Text>
                                        <Text size={13}><i className="fa fa-phone"></i> {u.phone}</Text>
                                    </Container>
                                    <Container css={{padding: 0}}>
                                        <Text size={13} weight={'bold'}>Birthday</Text>
                                        <Text size={13}><i className="fa fa-calendar"></i> {u.date}</Text>
                                    </Container>
                                </Row>
                                <br />
                                {u.description}
                            </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Row justify={'flex-end'}>
                                    <Button auto flat color={'error'} onPress={() => removeUser(u,setUsers)}>remove &nbsp; <i className="fa fa-remove"></i></Button>
                                    &nbsp;
                                    <Button auto color={'gradient'} onPress={(e) => modalUpdate.showModal(u)}>update &nbsp; <i className="fa fa-pencil"></i></Button>
                                </Row>
                            </Card.Footer>
                        </Card>) : <div>
                            <Text size={18}>No data to show</Text>
                            <hr />
                        </div> }
                    </Container>
                    <br />
                    <br />
                    <div>
                        <Modal key={'modal'}
                            blur
                            aria-labelledby="modal-title"
                            open={visible}
                            preventClose
                        >
                            <Modal.Header>
                                <Text id="modal-title" size={18}>
                                    Add new user
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                <Input
                                    name="user"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    placeholder="User"
                                />
                                <Input
                                    name="name"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    placeholder="Full name"
                                />
                                <Input
                                    name="age"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    type={'number'}
                                    placeholder="Age"
                                />
                                <Input
                                    name="date"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    type={'date'}
                                    placeholder="Birthdate"
                                />
                                <Dropdown>
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
                                <Input
                                    name="description"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    type={'text'}
                                    placeholder="Description"
                                />
                                <Input
                                    name="country"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    type={'text'}
                                    placeholder="Country"
                                />
                                <Input
                                    name="phone"
                                    clearable
                                    bordered
                                    fullWidth
                                    color="primary"
                                    size="lg"
                                    type={'number'}
                                    placeholder="Phone"
                                    onChange={(e) => verifyLength(e)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button auto flat color="error" onPress={() => setVisible(false)}>
                                Close
                            </Button>
                            <Button auto onPress={() => verifyData(selected,setVisible,setUsers)}>
                                Sign in
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div>
                        { modalUpdate.drawModal() }
                    </div>
                </Container>
            </Grid>
            <Grid xs></Grid>
      </Grid.Container>
    )
}

export default Home