import React, { useEffect, useRef } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HelpIcon from "@mui/icons-material/Help";
import useSidebarStore from "../store/sidebarStore";
import useFilterStore from "../store/filterStore";
import useUsernameStore from "../store/userNameStore";
import { legend } from "../utils/intensityLegend";
import Logo from "../assets/lubak-logo.png";
import Image from "next/image";

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const filterStore = useFilterStore();
  const { currentUsername } = useUsernameStore();

  const handleIntensityChange = (event) => {
    filterStore.setIntensityFilter(parseInt(event.target.value));
  };

  const handleStatusChange = (event) => {
    if (event.target.checked) {
      filterStore.setStatusFilter(event.target.value);
    } else {
      filterStore.removeStatusFilter(event.target.value);
    }
  };

  const handleSubmissionChange = () => {
    filterStore.setSubmissionFilter(!filterStore.submissionFilter);
  };

  const handleClearFilters = () => {
    filterStore.setIntensityFilter(0);
    filterStore.resetStatusFilter();
    filterStore.resetSubmissionFilter();
  };

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      // setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col justify-between absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar 
        w-72 shrink-0 bg-[#001921] p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <div>
          {/* Sidebar header, mobile trigger */}
          <div className="flex justify-between mb-6  px-2 lg:hidden">
            <button
              ref={trigger}
              className="lg:hidden text-slate-100 flex justify-between items-center w-full px-2 mt-3"
              onClick={() => setSidebarOpen}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <div className="flex items-center gap-3">
                <Image src={Logo} alt="Lubak Tracker Logo" height={30}></Image>
                <h1 className="text-xl uppercase font-semibold ">
                  LUBAK TRACKER
                </h1>
              </div>
            </button>
          </div>
          {/* Sidebar Content */}

          <div className="lg:mt-4 text-slate-100 pl-2 pr-4">
            {/* Header Title */}
            <div className="hidden lg:flex items-center gap-3 ">
              <Image src={Logo} alt="Lubak Tracker Logo" height={35}></Image>
              <h1 className="text-xl uppercase font-semibold ">
                LUBAK TRACKER
              </h1>
            </div>

            {/* ADD PIN INSTRUCTIONS */}
            <div className="mt-8 w-full border rounded-md p-3 flex gap-2 items-start mb-4 lg:mb-0">
              <h3 className="text-sm">
                Double click on the map to report a new pothole.
              </h3>
            </div>
            {/* Filters  */}
            <form className="">
              <div className="flex flex-col">
                <div className="mt-2 lg:mt-8  pb-2 border-b">
                  <h2 className="text-lg uppercase font-semibold">Filter</h2>
                </div>
                {/* By Intensity */}
                <div className="flex flex-col mt-8 gap-3">
                  <label className=" text-sm font-semibold uppercase">
                    By Intensity
                  </label>
                  <select
                    onChange={handleIntensityChange}
                    className="px-3  py-1 rounded-md text-lg focus:border-none text-slate-800 cursor-pointer w-full "
                  >
                    <option value="0">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {/* By Status */}
                <div className="flex flex-col  mt-8 gap-3 ">
                  <label className=" text-sm font-semibold uppercase">
                    By Status
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fixed"
                      name="fixed"
                      value="true"
                      className="w-[25px] h-[25px] mr-4 outline-none border-none cursor-pointer"
                      onClick={(e) => {
                        handleStatusChange(e);
                      }}
                    />
                    <label htmlFor="fixed" className="text-lg cursor-pointer">
                      Fixed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="not-yet-fixed"
                      name="not-yet-fixed"
                      value="false"
                      className="w-[25px] h-[25px] mr-4 outline-none border-none cursor-pointer"
                      onClick={(e) => {
                        handleStatusChange(e);
                      }}
                    />
                    <label
                      htmlFor="not-yet-fixed"
                      className="text-lg cursor-pointer"
                    >
                      Not yet fixed
                    </label>
                  </div>
                </div>
                {/* By Submission */}
                <div className="flex flex-col mt-8 gap-3">
                  <label
                    className={`text-sm font-semibold uppercase ${
                      !currentUsername ? "text-gray-500" : ""
                    }`}
                  >
                    By Submission
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="your-reports"
                      name="your-reports"
                      className="w-[25px] h-[25px] mr-4 outline-none border-none cursor-pointer"
                      onClick={() => {
                        handleSubmissionChange();
                      }}
                      disabled={!currentUsername}
                    />
                    <label
                      htmlFor="your-reports"
                      className={`text-lg cursor-pointer ${
                        !currentUsername ? "text-gray-500" : ""
                      }`}
                    >
                      Your Reports
                    </label>
                  </div>
                </div>
                {/* Clear Button */}
                <button
                  className="bg-[#ca043b]  py-1 rounded-md text-white font-bold text-lg mt-8"
                  type="reset"
                  onClick={() => {
                    handleClearFilters();
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </form>
            {/* Legend */}
            <div className="flex flex-col">
              <div className="mt-8  pb-2 border-b">
                <h2 className="text-lg uppercase font-semibold">Legend</h2>
              </div>

              <div className="flex flex-col mt-4">
                {legend.map((item, index) => {
                  return (
                    <div className="flex gap-4 mb-2" key={index}>
                      <WarningIcon
                        style={{
                          color: item.color,
                          fontSize: 24,
                        }}
                      />
                      <h3>{item.label}</h3>
                    </div>
                  );
                })}
                <div className="flex gap-4 mb-2">
                  <CheckCircleIcon
                    style={{
                      color: "green",
                      fontSize: 24,
                    }}
                  />
                  <h3>Fixed</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
