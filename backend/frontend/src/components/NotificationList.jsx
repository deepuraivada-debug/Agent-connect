
function NotificationList({ notifications }) {
  return (
    <section className="panel" id="notifications">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <div className="notification" key={notification.id}>
            <span>🔔</span>
            <p>
              {notification.message || "You have a new agent notification."}
            </p>
          </div>
        ))
      )}
    </section>
  );
}

export default NotificationList;
