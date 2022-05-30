import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import MenuIcon from '@mui/icons-material/Menu';


export default function DrawerMenu() {
  const [state, setState] = React.useState({
    
    left: false,
   
    
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'Student Panel' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <Divider> <h5>Student Panel</h5></Divider>
      <List>
        {['Master Schedule', 'Register For A Course', "View My Schedule"].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> :<InboxIcon/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider> <h5>Student Records</h5></Divider>
      <List>
        {['View Degree Audit'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      
      <Divider> <h5>Account</h5></Divider>
      <List>
        {['Profile'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List>
        {['Logout'].map((text, index) => (
          <ListItem button key={text} onClick={handleClick}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const navigate = useNavigate()
  function handleClick(e){
    const text = e.target.innerHTML
    console.log(text)
    switch(text){
      case "Register For A Course":
        navigate('/register')
        break
      case "Master Schedule":
        navigate('/master-schedule')
        break
      case 'View Degree Audit':
        navigate('/degree-audit')
        break
      case 'View My Schedule':
        navigate('/student-schedule')
        break
      case 'Logout':
        window.sessionStorage.setItem('session', null)
        navigate('/login')
        break
      case 'Profile':
        navigate('/profile')
        break

    }

  }

  return (
    <div>
      {[<MenuIcon/>].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button id = 'menu-btn' onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor='left'
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className = 'drawer'
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

