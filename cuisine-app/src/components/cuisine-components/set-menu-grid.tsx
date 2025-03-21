import SetMenuCard from "./set-menu-card";

const SetMenuGrid = ({ menus, guestNumber }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus && menus.map((menu) => <SetMenuCard key={menu.id} menu={menu} guestNumber={guestNumber} />)}
    </div>
  );
};

export default SetMenuGrid;
