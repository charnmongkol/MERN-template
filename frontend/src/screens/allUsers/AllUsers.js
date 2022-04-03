import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allUsersForAdmin, singleUser } from "../../redux/actions/userActions";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import UserModal from "../../components/Modal/UserModal";
import "./AllUsers.css";
import DashboardLayOut from "../../components/Layout/DashboardLayOut";

const AllUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.allUsers);
  const { loading, allUsers, error } = users;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleShow = async (id) => {
    // console.log(id);
    dispatch(singleUser(id));
    setShow(true);
  };

  useEffect(() => {
    dispatch(allUsersForAdmin());
    if (userInfo.isAdmin === false) {
      navigate("/");
    }
  }, [dispatch]);

  return (
    <DashboardLayOut title={"รายชื่อเอเจนท์"}>
      <Table bordered responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อบริษัท</th>
            <th>เลขที่ใบอนุญาติ</th>
            <th>วันหมดอายุ</th>
            <th>เบอร์โทร</th>
            <th>อีเมลล์</th>
            <th>รูปโลโก้</th>
            <th>Status Review</th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loading />}
          {allUsers &&
            allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.licenseNumber}</td>
                <td>{moment(user.licenseEnd).format("YYYY-MM-DD")}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.pic} className="img-thumbnail objectFit" />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShow(user._id)}
                  >
                    view
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <UserModal show={show} setShow={setShow} />
    </DashboardLayOut>
  );
};

export default AllUsers;
