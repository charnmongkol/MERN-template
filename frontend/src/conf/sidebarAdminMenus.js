import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
const sidebarNavItems = [
  {
    display: "โปรแกรมทัวร์",
    icon: <ListAltIcon />,
    to: "/myposts",
    cName: "nav-text",
    section: "started",
  },
  {
    display: "เอเจนซี่",
    icon: <GroupIcon />,
    to: "/all-users",
    cName: "nav-text",
    section: "calendar",
  },
  {
    display: "คำสั่งจอง",
    icon: <ReceiptIcon />,
    to: "/admin/allbills",
    cName: "nav-text",
    section: "user",
  },
];
