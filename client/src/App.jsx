import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

function App() {
  const [summary, setSummary] = useState("");
  const [summarized, setSummarized] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/summarize", { content: summary })
      .then((res) => {
        setSummarized(res.data);
        setIsLoading(false);
      });
  };
  return (
    <div className='container mx-auto'>
      <h1 className='text-4xl font-semibold'>Text summarizer</h1>
      <div className='m-6 flex justify-evenly'>
        <div className=''>
          <label>Input text:</label>
          <textarea
            onChange={(e) => setSummary(e.target.value)}
            className='border-2 p-3 w-full h-full rounded-xl'
            rows='15'
            cols='45'
          />
          <button
            onClick={handleSubmit}
            className='bg-blue-600 text-white p-2 pt-1 rounded-2xl mt-3'>
            {isLoading ? (
              <ReactLoading
                type='spin'
                color='white'
                height='45px'
                width='50px'
              />
            ) : (
              "Sumarize"
            )}
          </button>
        </div>
        <div className=''>
          <label>Output text:</label>
          <textarea
            value={summarized}
            className='border-2 p-3 w-full h-full rounded-xl'
            rows='15'
            cols='45'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
