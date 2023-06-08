import '../style.css/admin.css';
import MenuVerticalAdmin from './MenuVerticalAdmin';


const AdminHome = () => {
  return (
    <div className="admin-home">
      <MenuVerticalAdmin />
      <div className="button-container">
        {/*  <button className="buttonList">List</button>
        <button className="buttonAdd/Delete">Add/Delete</button>
        <button className="buttonUpdate">Update</button> */}
      </div>
    </div>
  );
};

export default AdminHome;
