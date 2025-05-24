import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Maintenance = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn(
      "Maintenance Notice: User accessed route during tool maintenance:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-extrabold text-yellow-600 mb-4">🛠️ Maintenance in Progress</h1>
        <p className="text-lg text-gray-800 mb-6">
          Some of our tools are currently under maintenance to provide you with a smoother and faster experience.
        </p>
        <div className="bg-white shadow-md rounded-xl p-4 border border-yellow-200 mb-4">
          <p className="text-gray-700 text-sm mb-1">The following tools are temporarily unavailable:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Crosshair Generator</li>
            <li>Server.cfg Generator</li>
            <li>HLDS Autoexec Builder</li>
            <li>FPS Boost Config Generator</li>
            <li>Training CFG Generator</li>
            <li>Jumpthrow Bind Tool</li>
            <li>Net Graph Position Tool</li>
            <li>Regedit & CMD Tweaks</li>
          </ul>
        </div>
        <p className="text-gray-700 mb-6">
          We sincerely apologize for the inconvenience. Please check back later or use the tools that are currently active.
        </p>
        <a
          href="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default Maintenance;
