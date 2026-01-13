export default function Message({ message }) {
  return (
    <div className={`message ${message.role}`}>
      <p>{message.content}</p>
    </div>
  );
}
