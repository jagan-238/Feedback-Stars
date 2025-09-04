import FeedbackStars from "./components/FeedbackStars";
import "./App.css";
function App() {
  const handleRatingChange = (rating) => {
    console.log("Selected rating:", rating);
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Rate Our Service</h1>
      <FeedbackStars numberOfStars={5} onRatingChange={handleRatingChange} />
    </div>
  );
}

export default App;
