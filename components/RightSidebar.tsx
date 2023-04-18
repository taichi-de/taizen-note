const RightSidebar = () => {
  return (
    <div className="grid grid-rows-12 gap-4 py-4 px-8 leading-loose text-center text-sky-500 bg-gray-200 w-full h-full">
      <div className="row-span-4 p-4 text-gray-300 px-auto bg-cyan-600">
        <div className="w-20 h-20 mx-auto  bg-white border rounded-full" />
        <h2 className="mt-2">Profile Area</h2>
        <p>- coming soon -</p>
      </div>
      <div className="row-span-2 p-4 text-gray-300 px-auto bg-cyan-600">
        <h2 className="">Recommendation Area</h2>
        <p>- coming soon -</p>
      </div>
      <div className="row-span-6 p-4 text-gray-300 px-auto bg-cyan-600">
        <h2 className="">Archives Area</h2>
        <p>- coming soon -</p>
      </div>
    </div>
  );
};

export default RightSidebar;
