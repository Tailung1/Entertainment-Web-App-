import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Icon from "./Icon";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeIcon, setActiveIcon] = useState<string>(
    location.pathname.split("/")[1]
  );
  let iconsArr = ["home", "movies", "series", "bookmarked"];
  const handleClick = (iconName: string) => {
    navigate(iconName);
    setActiveIcon(iconName);
  };

  return (
    <div className=' md:p-4 lg:p-6   '>
      <div className='bg-[#161D2F] py-2  md:rounded-lg lg:p-3 lg:py-7 '>
        <header className='flex justify-around items-center lg:flex-col lg:justify-between lg:h-[600px] '>
          <Icon
            iconType='logo'
            handleClick={() => handleClick("")}
            fillColor={activeIcon === "logo" ? "white" : "red"}
          />
          <div className='flex gap-5 lg:flex-col'>
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
    </div>
  );
}
