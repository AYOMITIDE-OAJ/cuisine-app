import SetMenuCard from "./set-menu-card";


const SetMenuGrid = ({ menus }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <SetMenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    );
  };

  
  export default SetMenuGrid