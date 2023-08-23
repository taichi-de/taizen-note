export const CategoryTabs = () => {
  const tabs = ["All", "Tutorial", "Trouble Shooting", "Others"];

  return (
    <ul className="grid grid-flow-col justify-stretch m-4 text-center rounded-sm">
      {tabs.map((tab, i) => (
        <li
          value="all"
          className={`${
            i === 0 && "text-main bg-third"
          } bg-gray/50 text-third hover:bg-third hover:text-main hover:pointer  mr-1 p-2 rounded-t-sm`}
          key={tab}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default CategoryTabs;
