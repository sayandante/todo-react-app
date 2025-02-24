import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TodosListGroups } from '../../../stores/appStore';
import { observer } from 'mobx-react-lite';
import styled from '@mui/styled-engine';

import { Grid, Typography, IconButton, Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import { device } from "../../../utils/helpers/device";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }

/*  */

const Header: React.FC<React.PropsWithChildren<unknown>> = observer(() => {
  // const [divVariant, setDivVariant] = useState<"active" | "inactive" | "">(
  //   "active"
  // );
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const controls = useAnimation();
  // const y = useMotionValue(0);
  // useEffect(() => {
  //   controls.start("active");
  // });
  // const variants = {
  //   active: {
  //     y: [y.get()],
  //   },
  //   inactive: {
  //     y: [y.get(), y.get() - 90, y.get(), y.get() - 50, y.get()],
  //     transition: { duration: 2.5 },
  //   },
  //   back: {
  //     transition: { duration: 2.5 },
  //   },
  // };

  // const imageVariants = {
  //   visible: { opacity: 1 },
  //   hidden: { opacity: 0 },
  // };const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const clearCompletedTodos = () => {
    const localData = JSON.parse(localStorage.getItem('todosLists') || '') as TodosListGroups;
    Object.keys(localData).map((todoCategory) => {
      localData[todoCategory as keyof typeof localData] = localData[todoCategory as keyof typeof localData].filter((todo) => !todo.isComplete);
      return null;
    });

    localStorage.setItem('todosLists', JSON.stringify(localData));
    window.location.reload();
  };

  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };
  const list = () => (
    <div style={{ width: '15.5rem' }} role="presentation" onClick={() => setMenuOpen(false)} onKeyDown={() => setMenuOpen(false)}>
      <List>
        <ListItem onClick={() => navigate('/', { replace: true })} button key={'Home'}>
          {/* <Link to=".."> */}
          <ListItemIcon>
            <HomeTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
          {/* </Link> */}
        </ListItem>

        <ListItem onClick={clearCompletedTodos} button key={'clearCache'}>
          <ListItemIcon>
            <DeleteForeverTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={'Clear Completed Todos'} />
        </ListItem>
        <ListItem onClick={clearCache} button key={'clearCache2'}>
          <ListItemIcon>
            <DeleteForeverTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary={'Clear All Cache'} />
        </ListItem>
        <Divider />
        <ListItem button key={'tip'}>
          <ListItemText>
            Currently i use caching to store todos, later on this is gonna be stored per user account. For now, when you no longer need your COMPLETED
            todos, press Clear Cache to delete them and make the app faster.
            <Divider />
            If you experience bugs, clearing ALL the cache can solve the issues.
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    //  <Grid container direction={"column"} xs={12}>
    //   <div>
    //     <motion.img src={LeftImage} style={{ size: 1 }} />
    //   </div>
    //   <div>
    //     <motion.img src={RightImage} />
    //   </div>
    // </Grid>
    <Grid container direction="row" style={{ paddingBottom: '1rem' }}>
      {' '}
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              color='secondary'
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <StyledNavBar position="static">
        <Toolbar>
          <Grid container item xs={11} alignItems={'center'}>
            <IconButton
              edge="start"
              // className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={menuOpen} onClose={() => setMenuOpen(false)}>
              {list()}
            </Drawer>
            <Typography variant="h6" className={''}>
              Welcome to my app :)
            </Typography>
          </Grid>
          {true && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                // open
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Nothing to see here yet!</MenuItem>
                <MenuItem onClick={handleClose}>Nothing to see here yet!</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </StyledNavBar>
    </Grid>
  );
});
export default Header;

const StyledNavBar = styled(AppBar)`
  background: linear-gradient(120deg, rgba(142, 228, 175, 1) 0%, rgba(5, 56, 107, 1) 100%);
`;

// const StyledTitle = styled(Typography)``;
// const StyledImage = styled(motion.img)`
//   width: 50%;
//   height: 50%;
// `;
