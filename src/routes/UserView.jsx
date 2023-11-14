import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import User from "../components/User/User";

const UserView = () => {
  const param = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUser = async () => {
      await axios
        .get(`http://localhost:3000/v1/comments/users/${param.id}`)
        .then((res) => {
          const user = res.data;
          setUser(user);

          setLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchUser();
  }, [param.id]);

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      )}
      {user && <User user={user} />}
    </div>
  );
};

export default UserView;
