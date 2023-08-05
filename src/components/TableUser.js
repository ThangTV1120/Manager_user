// import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetAllUser } from '../services/UserService';
import ModelAddUser from './ModelAddNewUser';
import ModelEditUser from './ModelEditUser';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import { debounce } from 'lodash';
import ModelConfirm from './ModelConfirm'
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from 'react-toastify';
import Papa from "papaparse"
function TableUser(props) {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setToTalUsers] = useState(0);
    const [totalPage, setToTalPage] = useState(0);
    const [dataUser, setdataUser] = useState("");
    const [dataUserDelete, setdataUserDelete] = useState("");
    const [isShow, setShow] = useState(false);
    const [isShowEdit, setShowEdit] = useState(false);
    const [isShowDelete, setShowDelete] = useState(false);
    useEffect(() => {
        getUsers(1);
    }, [])
    const getUsers = async (page) => {
        let res = await fetAllUser(page);
        if (res && res.data) {
            setToTalUsers(res.total)
            setListUser(res.data);
            setToTalPage(res.total_pages)
        }
        // console.log(res);
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
        console.log(event);
    }
    const handleClose = () => {
        setShowEdit(false);
        setShowDelete(false);
        setShow(false);
    }
    const handlerAddUser = () => {
        setShow(true)
    }
    const handlerEditUser = (item) => {
        // console.log(item);
        setdataUser(item);
        setShowEdit(true)
    }
    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser]);
    }
    const handlerDeleteUser = (item) => {
        setdataUserDelete(item);
        setShowDelete(true)
    }
    const handlerDeleteUserModel = (user) => {

        //    let listuser=[...listUser];
        let listuser = _.cloneDeep(listUser);// dung thu vien lodash de fix loi cung bo nho
        listuser = listUser.filter(item => item.id !== user.id)
        setListUser(listuser);
    }
    const handleEditUserModel = (user) => {
        let idex = listUser.findIndex(item => item.id === user.id)
        //    let listuser=[...listUser];
        let listuser = _.cloneDeep(listUser);// dung thu vien lodash de fix loi cung bo nho
        listuser[idex].first_name = user.first_name;
        listuser[idex].email = user.email;
        listuser[idex].last_name = user.last_name;
        setListUser(listuser);
    }
    const [sortBy, setsortBy] = useState("asc");
    const [sortField, setsortField] = useState("id");
    const handleSort = (sortBy, sortField) => {
        setsortBy(sortBy);
        setsortField(sortField);
        let listuser = _.cloneDeep(listUser);
        listuser = _.orderBy(listuser, [sortField], [sortBy])
        setListUser(listuser);
    }
    const handleSearch = debounce((envent) => {
        let itemm = envent.target.value;
        if (itemm) {
            let listuser = _.cloneDeep(listUser);
            listuser = listuser.filter(item => item.email.includes(itemm))
            setListUser(listuser);
        }
        else {
            getUsers(1)
        }
    }, 500)
    const [dataExport, setdataExport] = useState([])
    const getUserExport = (envent, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(['Id', 'Email', 'First_name', "Last_name", "Avatar"])
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                arr[4] = item.avatar;
                result.push(arr);
            })
            setdataExport(result);
            done();
        }
    }
    const UserImport = (envent) => {
        if (envent.target && envent.target.files && envent.target.files[0]) {
            let file = envent.target.files[0];
            if (file.type !== "text/csv") {
                toast.error("Only accept csv file")
                return
            }
            //Parse local CSV file
            Papa.parse(file, {
                header: true,
                complete: function (result) {
                    let rawCSV = result.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV.length === 4) {
                            if (rawCSV[0][0] !== "email" || rawCSV[0][1] !== "first_name" || rawCSV[0][2] !== "last_name" || rawCSV[0][3] !== 'avatar') {
                                toast.error("Wrong format CSV file")
                            }
                            else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 4) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        obj.avatar = item[3];
                                        result.push(obj)
                                    }
                                })
                                setListUser(result);
                                console.log(result);
                            }
                        }
                        else {
                            toast.error("Wrong format CSV file")
                        }

                    }
                    else toast.error("Not found data on CSV file")
                    console.log(result.data)
                }
            })

        }

    }
    return (
        <>
            <div className='my-3 add-new d-sm-flex'>
                <span className=""><b>List</b></span>
                <div className='group-btn mt-sm-0 mt-2S'>
                    <label className='btn btn-warning' htmlFor="import">
                        <i className="fa-sharp fa-solid fa-file-import"></i>
                        Import
                    </label>
                    <input id='import' type="file" hidden
                        onChange={(event) => UserImport(event)}
                    />

                    <CSVLink
                        data={dataExport}
                        filename={"User.csv"}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={(envent, done) => { return getUserExport(envent, done) }}
                        target="_blank"
                    ><i className="fa-sharp fa-solid fa-file-arrow-down"></i>
                        Exprot
                    </CSVLink>
                    <button className='btn btn-success ' onClick={() => handlerAddUser()}>
                        <i className="fa-solid fa-plus mx-2 "></i>
                        Add new Users
                    </button>
                </div>
            </div>
            <div className='col-12 col-sm-4 my-3'>
                <input className='form-control' placeholder='Search user by email ...' onChange={(envent) => handleSearch(envent)} />
            </div>
            <div className='table-custom'>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down long" onClick={() => handleSort('desc', 'id')}></i>
                                    <i className="fa-solid fa-arrow-up long" onClick={() => handleSort('asc', 'id')}></i>
                                </span>
                            </th>
                            <th>Email</th>
                            <th className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down long" onClick={() => handleSort('desc', 'first_name')}></i>
                                    <i className="fa-solid fa-arrow-up long" onClick={() => handleSort('asc', 'first_name')}></i>
                                </span>
                            </th>
                            <th>Last Name</th>
                            <th>Avatar</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <img src={item.avatar} alt="" />
                                    </td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={() => handlerEditUser(item)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handlerDeleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< back"
                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModelAddUser
                show={isShow}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModelEditUser
                show={isShowEdit}
                dataUser={dataUser}
                handleEditUserModel={handleEditUserModel}
                handleClose={handleClose}
            />
            <ModelConfirm
                show={isShowDelete}
                dataUserDelete={dataUserDelete}
                handleClose={handleClose}
                handlerDeleteUserModel={handlerDeleteUserModel}
            />
        </>

    );
}

export default TableUser;