import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.scss";

const routes = [
  { path: "/", label: "Hiển thị dữ liệu 1" },
  { path: "/", label: "Hiển thị dữ liệu 2" },
  { path: "/", label: "Hiển thị dữ liệu 3" },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar__logo"></div>
      <ul className="sidebar__menu">
        {routes.map((route, index) => (
          <li
            key={index}
            className={`sidebar__menu-item ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <Link
              to={route.path}
              className={`sidebar__menu-link ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
