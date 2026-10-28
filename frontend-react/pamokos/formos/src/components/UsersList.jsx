import updateData from "../services/update";
import { getOne } from "../services/get";
import { useState } from "react";

function UsersList({ users }) {
  const [errormsg, setErrorMsg] = useState("");
  const likesHandle = async (id) => {
    try {
      const { likes } = await getOne(id);
      await updateData(id, { likes: likes + 1 });
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      {users.lengt !== 0 && <h1>Users List</h1>}
      {errormsg && <p>{errormsg}</p>}
      {users.map((user) => (
        <div key={user.id} className="w-80 border p-2">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.likes}</p>
          <div className="flex gap-2">
            <button onClick={() => likesHandle(user.id)}>Like</button>
            <button onClick>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default UsersList;
