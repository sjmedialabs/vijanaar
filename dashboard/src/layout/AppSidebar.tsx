import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  TableIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

type CompanyDetails = {
  sectionOne: {
    headerLogoUrl: string;
    footerLogoUrl: string;
    favIconUrl: string;
    //companyName: string;
    phone1: string;
    phone2: string;
    email1: string;
    email2: string;
  };
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "HomePage",
    subItems: [{ name: "Banner", path: "/", pro: false },
      { name: "Career Accelerator", path: "/home/section2", pro: false },
      { name: "Courses", path: "/home/section3", pro: false },
      { name: "About", path: "/home/section4", pro: false },
      { name: "Highlight", path: "/home/section5", pro: false },
      { name: "Testimonials", path: "/home/section6", pro: false },
      { name: "Certification", path: "/home/section7", pro: false },
      { name: "Statistics", path: "/home/section8", pro: false },
      { name: "Alumni", path: "/home/section9", pro: false },
    ],
  },
  {
    name: "AboutPage",
    icon: <ListIcon />,
    subItems: [{ name: "Banner", path: "/about/section1", pro: false },
      { name: "About us", path: "/about/section2", pro: false },
      { name: "Why Choose us", path: "/about/section3", pro: false },
      { name: "Mission & Vission", path: "/about/section5", pro: false },
    ],
  },
    {
    name: "Training Program",
    icon: <ListIcon />,
    subItems: [{ name: "Banner", path: "/trainingPrograms", pro: false },
    { name: "New Program", path: "/addNewProgram", pro: false },
    ],
  },
  {
    name: "Training Details",
    icon: <TableIcon />,
    subItems: [{ name: "Banner", path: "/courses/section1", pro: false },
      { name: "Features", path: "/courses/section2", pro: false },
      { name: "Overview", path: "/courses/section3", pro: false },
      { name: "Curriculum", path: "/courses/section4", pro: false },
       { name: "Trainning Options", path: "/courses/section5", pro: false },
        { name: "Advantages", path: "/courses/section6", pro: false },
        { name: "Language & Tools", path: "/courses/section7", pro: false },
         { name: "Video & Enroll", path: "/courses/section8", pro: false },
           { name: "Job Opportunities", path: "/courses/section9", pro: false },
        { name: "Key Highlights", path: "/courses/section10", pro: false },
    ],
  },
   {
    name: "Testimonial Page",
    icon: <TableIcon />,
    subItems: [{ name: "Banner", path: "/testimonial/section1", pro: false },
        { name: "Testimonial", path: "/testimonial/section2", pro: false },
    ],
  },

       {
    name: "Placement Page",
    icon: <TableIcon />,
    subItems: [{ name: "Banner", path: "/placements/section1", pro: false },
      { name: "partners", path: "/placements/section2", pro: false },
       { name: "Success Stories", path: "/placements/section3", pro: false },
    ],
  },
         {
    name: "ContactPage",
    icon: <TableIcon />,
    subItems: [{ name: "Banner", path: "/contact/section1", pro: false },
      { name: "Contact Detail", path: "/contact/section2", pro: false },
    ],
  },
        {
    name: "Company Details Page",
    icon: <TableIcon />,
    subItems: [{ name: "Company Details", path: "/company-details", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE}/companydetails`);
        setCompanyDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      }
    };

    fetchCompanyDetails();
  }, []);
  
useEffect(() => {
  let submenuMatched = false;

  navItems.forEach((nav, index) => {
    if (nav.subItems) {
      nav.subItems.forEach((subItem) => {
        if (isActive(subItem.path)) {
          setOpenSubmenu({
            type: "main",
            index,
          });
          submenuMatched = true;
        }
      });
    }
  });

  if (!submenuMatched) {
    setOpenSubmenu(null);
  }
}, [location, isActive]);


  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
           <div className="flex w-full items-center company-details">
  <img
    className="dark:hidden"
    src={companyDetails?.sectionOne.favIconUrl}
    alt="Logo"
    width={200}
    height={30}
  />
 {/** <h1 className="ml-2 text-3xl font-bold">{companyDetails?.sectionOne.companyName}</h1>*/}
</div>
            </>
          ) : (
            <img
              src={companyDetails?.sectionOne.favIconUrl}
              alt="Logo"
              width={42}
              height={42}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
