import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "./shared/Icon";
export default function Header() {
  const navigate = useNavigate();

  const [activeIcon, setActiveIcon] = useState<string>("home");
  let iconsArr = ["home", "movies", "series", "bookmarked"];
  const handleClick = (iconName: string) => {
    navigate(iconName);
    setActiveIcon(iconName);
  };
  return (
    <div className='bg-[#161D2F] py-2 md:m-4 md:rounded-lg'>
      <header className='flex justify-around items-center'>
        <Icon
          iconType='logo'
          handleClick={() => handleClick("")}
          fillColor={activeIcon === "logo" ? "white" : "red"}
        />
        <div className='flex gap-5'>
          {iconsArr.map((icon) => (
            <Icon
              key={icon}
              iconType={icon}
              handleClick={() => handleClick(icon)}
              fillColor={activeIcon === icon ? "white" : "#5A698F"}
            />
          ))}
        </div>
        <Icon
          iconType='profilePic'
          handleClick={handleClick}
          fillColor={activeIcon === "icon" ? "white" : "none"}
        />
      </header>
    </div>
  );
}
