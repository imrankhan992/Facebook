import { useRef, useState } from "react";
import { DynamicMenu } from "./DynamicMenu";
import { menuConfig } from "./menuConfig";
import useClickOutSide from "@/helpers/clickOutSide";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
export default function UserMenu({ setShowUserMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenuRef = useRef(null);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [menuHistory, setMenuHistory] = useState([]);
  const [currentLabel, setCurrentLabel] = useState([]);
  const [direction, setDirection] = useState("");

  useClickOutSide(userMenuRef, () => {
    setShowUserMenu(false);
  });

  const navigateTo = (menu, label, link) => {
    if (menuConfig[menu]) {
      setDirection("forward");
      setCurrentMenu(menu);

      setCurrentLabel([...currentLabel, label]);
      setMenuHistory([...menuHistory, currentMenu]);
    } else if (link) {
      window.location.href = link;
    }
  };

  const goBack = () => {
    setDirection("backward");
    const previousMenu = menuHistory.pop();
    const previousLabel = currentLabel.pop();
    setCurrentLabel([...currentLabel]);
    setMenuHistory([...menuHistory]);
    setCurrentMenu(previousMenu || "main");
  };

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch({
      type: "LOGOUT",
    });
    navigate({
      to: "/",
    });
  };
  return (
    <div
      className="absolute -left-48 min-w-[350px] rounded-lg bg-white border-shadow"
      ref={userMenuRef}
    >
      <div className="p-4">
        <DynamicMenu
        handleLogout={handleLogout}
          currentMenu={currentMenu}
          navigateTo={navigateTo}
          goBack={goBack}
          currentLabel={currentLabel}
          direction={direction}
        />
      </div>
    </div>
  );
}
