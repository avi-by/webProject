import React, { useState, useEffect }  from "react";
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LogButton from "./LoginButton";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from '@material-ui/icons/Home';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
const VolunteerItems = () => {
  let history = useHistory();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes


  if (authState.isAuthenticated && userInfo && !userInfo.user.admin) {
    return (
      <React.Fragment>



        <ListItem
          button
          key={"myjobs"}
          onClick={() => {history.push("/myjobs");}}>
          <ListItemIcon>
            <LocationOnIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"My Addresses"} />
        </ListItem>


        <ListItem
                  button
                  key={"chatMessages"}
                  onClick={() => {
                    history.push("/chatUser");
                  }}
                >
                  <ListItemIcon>
                    <ChatIcon />{" "}
                  </ListItemIcon>
                  <ListItemText primary={"Chat"} />
                </ListItem>

      </React.Fragment>
    );
  } else {
    return <div />;
  }
};


const AdminItems = () => {
  let history = useHistory();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then(info => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

    console.log(authState);
  console.log(userInfo);
  if (authState.isAuthenticated && userInfo && userInfo.user.admin) {
    return (
      <React.Fragment>
        <ListItem
          button
          key={"additem"}
          onClick={() => {history.push("/adduser");}}>
          <ListItemIcon>
            <AddIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Add Volunteer"} />
        </ListItem>

        <ListItem
          button
          key={"Placement"}
          onClick={() => {history.push("/placement");}}>
          <ListItemIcon>
            <PeopleIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Volunteer Placement"} />
        </ListItem>

        <ListItem
          button
          key={"userslist"}
          onClick={() => {history.push("/userlist");}}>
          <ListItemIcon>
            <PeopleIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Volunteer Managmanet"} />
        </ListItem>

        <ListItem
          button
          key={"jobs"}
          onClick={() => {history.push("/jobs");}}>
          <ListItemIcon>
            <LocationOnIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Current placment"} />
        </ListItem>

        <ListItem
          button
          key={"addAdress"}
          onClick={() => {
            history.push("/addAddress");
          }}
        >
          <ListItemIcon>
            <AddLocationIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Add Address"} />
        </ListItem>
        <ListItem
          button
          key={"listOfAddress"}
          onClick={() => {
            history.push("/listOfAddresses");
          }}
        >
          <ListItemIcon>
            <LocationOnIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"List of the addresses"} />
        </ListItem>

        <ListItem
          button
          key={"chatMessages"}
          onClick={() => {
            history.push("/chatUser");
          }}
        >
          <ListItemIcon>
            <ChatIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Chat"} />
        </ListItem>
      </React.Fragment>
    );
  } else {
    return <div />;
  }
};
export default function PersistentDrawerLeft() {
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Supplies Managmanet at the COVID
          </Typography>
          <LogButton />

          {/*  <Button color="inherit"  alignItems="right">Login</Button>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <List>
          <ListItem
            button
            key={"home"}
            onClick={() => {
              history.push("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />{" "}
            </ListItemIcon>
            <ListItemText primary={"homepage"} />
          </ListItem>

          <VolunteerItems />
          <AdminItems />
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
