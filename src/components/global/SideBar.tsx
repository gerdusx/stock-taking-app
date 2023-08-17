
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Category, ChecklistRtl, FormatListBulleted, LocalShipping, MenuBook, People, Scale } from "@mui/icons-material";
import Link from "next/link";

interface IItem {
    title: any;
    to: any;
    icon: any;
    selected: any;
    setSelected: (selected: string) => void;
}

const Item = (item: IItem) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={item.selected === item.title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => item.setSelected(item.title)}
            icon={item.icon}
        >
            <Typography>{item.title}</Typography>
            <Link href={item.to} />
        </MenuItem>
    );
};

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    Stock Control
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Home"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 23px" }}
                        >
                            Stock
                        </Typography>
                        <Item
                            title="Stock Takes"
                            to="/team"
                            icon={<ChecklistRtl />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Stock received"
                            to="/contacts"
                            icon={<LocalShipping />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Setup
                        </Typography>
                        <Item
                            title="Stock Items"
                            to="/form"
                            icon={<FormatListBulleted />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Recipes"
                            to="/form"
                            icon={<MenuBook />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Categories"
                            to="/categories"
                            icon={<Category />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Units"
                            to="/faq"
                            icon={<Scale />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Users"
                            to="/faq"
                            icon={<People />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default SideBar;