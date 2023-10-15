import React from "react";

function Notification({ notifications }) {
  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img
            src={notification.image}
            alt="Notification"
            style={{
              marginRight: "10px",
              objectFit: "contain",
              maxHeight: "50px",
              maxWidth: "50px"
            }}
          />
          <div>
            <p style={{ marginBottom: "5px" }}>{notification.message}</p>
            <p style={{ fontSize: "12px", color: "gray" }}>{notification.receivedTime}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notification;