import React from "react";
import LubakMap from "../components/Map";
import Sidebar from "../components/Sidebar";
import Head from "next/head";
import useLoadingStore from "../store/loadingStore";


const index = () => {
  const { isFetchingPins } = useLoadingStore();
  return (
    <>
      <Head>
        <title>Lubak Tracker</title>
        <meta name="description" content="Pothole Tracker App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <main>
              <div className="w-[100%] max-w-9xl mx-auto">
                <LubakMap />
              </div>
            </main>
          </div>
        </div>
   
    </>
  );
};

export default index;
